import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Exchange code for Whop access token
    const tokenResponse = await fetch('https://api.whop.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Deno.env.get("WHOP_APP_ID") ?? "",
        client_secret: Deno.env.get("WHOP_API_KEY") ?? "",
        code: code,
        redirect_uri: `${req.headers.get("origin")}/whop/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    
    // Get user info from Whop
    const userResponse = await fetch('https://api.whop.com/api/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const whopUser = await userResponse.json();
    
    // Create or update user in Supabase
    const { data: user, error: userError } = await supabaseClient.auth.admin.createUser({
      email: whopUser.email,
      user_metadata: {
        whop_user_id: whopUser.id,
        username: whopUser.username,
        avatar_url: whopUser.profile_pic_url,
        whop_access_token: tokenData.access_token,
        whop_refresh_token: tokenData.refresh_token,
      },
      email_confirm: true,
    });

    if (userError && !userError.message.includes('already exists')) {
      throw userError;
    }

    // If user already exists, update their metadata
    if (userError?.message.includes('already exists')) {
      const { data: existingUser } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('whop_user_id', whopUser.id)
        .single();
        
      if (existingUser) {
        await supabaseClient.auth.admin.updateUserById(existingUser.id, {
          user_metadata: {
            whop_user_id: whopUser.id,
            username: whopUser.username,
            avatar_url: whopUser.profile_pic_url,
            whop_access_token: tokenData.access_token,
            whop_refresh_token: tokenData.refresh_token,
          },
        });
      }
    }

    // Generate Supabase session token
    const { data: session, error: sessionError } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: whopUser.email,
    });

    if (sessionError) {
      throw sessionError;
    }

    return new Response(JSON.stringify({
      success: true,
      user: whopUser,
      supabase_session: session,
      whop_tokens: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Whop auth error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Authentication failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});