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
    const { action, data } = await req.json();
    
    console.log('Whop API action:', action, data);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Get user's Whop access token from metadata
    const whopAccessToken = user.user_metadata?.whop_access_token;
    if (!whopAccessToken) {
      throw new Error("Whop access token not found");
    }

    let result;

    switch (action) {
      case 'getUserInfo':
        result = await getUserInfo(whopAccessToken);
        break;
      
      case 'getUserSubscriptions':
        result = await getUserSubscriptions(whopAccessToken);
        break;
      
      case 'createPayment':
        result = await createPayment(whopAccessToken, data);
        break;
      
      case 'getUserCommunities':
        result = await getUserCommunities(whopAccessToken);
        break;
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Whop API error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'API call failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

async function getUserInfo(accessToken: string) {
  const response = await fetch('https://api.whop.com/api/v2/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return await response.json();
}

async function getUserSubscriptions(accessToken: string) {
  const response = await fetch('https://api.whop.com/api/v2/me/memberships', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user subscriptions');
  }

  return await response.json();
}

async function createPayment(accessToken: string, paymentData: any) {
  const response = await fetch('https://api.whop.com/api/v2/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  return await response.json();
}

async function getUserCommunities(accessToken: string) {
  const response = await fetch('https://api.whop.com/api/v2/me/memberships', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user communities');
  }

  const memberships = await response.json();
  return memberships.filter((membership: any) => membership.status === 'active');
}