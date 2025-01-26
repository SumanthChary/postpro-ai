import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID');
const PAYPAL_API_URL = 'https://api-m.paypal.com'; // Use sandbox URL for testing

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, subscriptionTier } = await req.json();

    // Verify the payment with PayPal
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${PAYPAL_CLIENT_ID}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentData = await response.json();

    if (paymentData.status === 'COMPLETED') {
      // Here you would update the user's subscription status in your database
      console.log('Payment successful:', paymentData);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment processed successfully',
          data: paymentData 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Payment verification failed');
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