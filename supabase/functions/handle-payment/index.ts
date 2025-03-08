
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID');
const PAYPAL_SECRET = Deno.env.get('PAYPAL_SECRET');
const PAYPAL_API_URL = 'https://api-m.paypal.com'; // Use sandbox URL for testing

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, subscriptionTier, userId, credits } = await req.json();
    console.log('Payment handler called with:', { orderId, subscriptionTier, userId, credits });

    // Get access token from PayPal
    const authResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const authData = await authResponse.json();
    if (!authResponse.ok) {
      console.error('PayPal auth error:', authData);
      throw new Error('Failed to authenticate with PayPal');
    }

    // Verify the payment with PayPal
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentData = await response.json();
    console.log('PayPal payment data:', paymentData);

    if (paymentData.status === 'COMPLETED' || paymentData.status === 'APPROVED') {
      // Create Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Record the payment in database
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

      // If credits are provided, add them to the user account
      if (credits && credits > 0) {
        // Calculate expiration date (3 months from now)
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
          // Continue with subscription but note credit error in response
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Payment processed successfully, but credits could not be added',
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
          message: 'Payment processed successfully',
          data: paymentData 
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
