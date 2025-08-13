
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID') || '';
const PAYPAL_SECRET = Deno.env.get('PAYPAL_SECRET') || '';
const PAYPAL_API_URL = 'https://api-m.paypal.com';

if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
  console.error('PayPal credentials are not configured');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, subscriptionTier, userId, credits, planName } = await req.json();
    console.log('Payment handler called with:', { orderId, subscriptionTier, userId, credits, planName });

    if (!orderId || !userId) {
      throw new Error('Missing required parameters');
    }

    // Get access token from PayPal
    const authResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const authData = await authResponse.json();
    if (!authResponse.ok) {
      console.error('PayPal auth error:', authData);
      throw new Error(`Failed to authenticate with PayPal: ${authData.error_description || 'Unknown error'}`);
    }

    // Verify the payment with PayPal
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentData = await response.json();
    console.log('PayPal payment data:', paymentData);

    if (!paymentData.purchase_units?.[0]?.amount?.value) {
      throw new Error('Invalid payment data received from PayPal');
    }

    // Verify payment amount matches plan price
    const paymentAmount = parseFloat(paymentData.purchase_units[0].amount.value);
    const expectedAmount = parseFloat(planName.toLowerCase().includes('yearly') ? '3200' : '320');
    
    if (Math.abs(paymentAmount - expectedAmount) > 0.01) { // Using a small threshold for floating point comparison
      console.error('Payment amount mismatch:', { paymentAmount, expectedAmount });
      throw new Error('Payment amount does not match plan price');
    }

    if (paymentData.status !== 'COMPLETED' && paymentData.status !== 'APPROVED') {
      throw new Error(`Invalid payment status: ${paymentData.status}`);
    }

    if (paymentData.status === 'COMPLETED' || paymentData.status === 'APPROVED') {
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase configuration missing');
        throw new Error('Server configuration error');
      }

      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false
        }
      });

      // Get user information
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
      if (userError) throw userError;

      // Record the payment
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            user_id: userId,
            amount: parseFloat(paymentData.purchase_units[0].amount.value),
            currency: paymentData.purchase_units[0].amount.currency_code,
            payment_method: 'paypal',
            status: 'completed',
            transaction_id: orderId,
            subscription_tier: subscriptionTier
          }
        ]);

      if (paymentError) {
        console.error('Payment recording error:', paymentError);
        throw new Error('Failed to record payment in database');
      }

      // Update subscription
      const subscriptionEnd = new Date();
      if (planName.toLowerCase().includes('yearly')) {
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
      } else {
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
      }

      const { error: subscriptionError } = await supabase
        .from('subscribers')
        .upsert([
          {
            user_id: userId,
            email: userData.user?.email || '',
            plan_name: planName,
            subscription_tier: subscriptionTier,
            subscribed: true,
            subscription_end: subscriptionEnd.toISOString(),
            monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            monthly_post_count: 0
          }
        ]);

      if (subscriptionError) {
        console.error('Subscription update error:', subscriptionError);
        throw new Error('Failed to update subscription');
      }

      // Add credits if provided
      if (credits && credits > 0) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);
        
        const { error: creditError } = await supabase
          .from('user_credits')
          .insert([
            { 
              user_id: userId,
              balance: credits,
              expires_at: expiresAt.toISOString()
            }
          ]);
        
        if (creditError) {
          console.error('Error adding credits:', creditError);
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Payment processed but credits could not be added',
              data: paymentData,
              creditError: creditError.message
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment and subscription processed successfully',
          data: {
            paymentId: orderId,
            subscriptionEnd: subscriptionEnd.toISOString(),
            plan: planName
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Payment verification failed: ' + paymentData.status);
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
