import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-whop-signature',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('x-whop-signature');
    
    // Verify webhook signature (if needed)
    // For now, we'll process all webhooks
    
    const webhookData = JSON.parse(body);
    console.log('Received webhook:', webhookData);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different webhook events
    switch (webhookData.type) {
      case 'payment.success':
        await handlePaymentSuccess(supabaseClient, webhookData.data);
        break;
      
      case 'subscription.created':
        await handleSubscriptionCreated(supabaseClient, webhookData.data);
        break;
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(supabaseClient, webhookData.data);
        break;
      
      case 'user.created':
        await handleUserCreated(supabaseClient, webhookData.data);
        break;
      
      default:
        console.log('Unhandled webhook type:', webhookData.type);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Webhook processing failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

async function handlePaymentSuccess(supabase: any, data: any) {
  console.log('Processing payment success:', data);
  
  // Update user subscription or credits
  const { error } = await supabase
    .from('subscribers')
    .upsert({
      user_id: data.user_id,
      whop_payment_id: data.id,
      status: 'active',
      amount: data.amount,
      currency: data.currency,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error updating subscription:', error);
  }
}

async function handleSubscriptionCreated(supabase: any, data: any) {
  console.log('Processing subscription created:', data);
  
  const { error } = await supabase
    .from('subscribers')
    .upsert({
      user_id: data.user_id,
      whop_subscription_id: data.id,
      plan_name: data.plan_name || 'Pro Plan',
      status: 'active',
      subscription_tier: 'pro',
      end_date: data.expires_at ? new Date(data.expires_at).toISOString() : null,
      monthly_post_limit: 1000,
      monthly_post_count: 0,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating subscription:', error);
  }
}

async function handleSubscriptionCancelled(supabase: any, data: any) {
  console.log('Processing subscription cancelled:', data);
  
  const { error } = await supabase
    .from('subscribers')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('whop_subscription_id', data.id);

  if (error) {
    console.error('Error cancelling subscription:', error);
  }
}

async function handleUserCreated(supabase: any, data: any) {
  console.log('Processing user created:', data);
  
  // Create user profile
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: data.id,
      whop_user_id: data.whop_id,
      username: data.username,
      avatar_url: data.profile_pic_url,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating user profile:', error);
  }
}