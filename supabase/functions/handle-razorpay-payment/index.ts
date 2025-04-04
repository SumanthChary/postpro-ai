
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Razorpay API configuration
const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID') || 'rzp_live_L9cXXNKWlP9tYl';
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || 'h3Pg1rY8iuWjJoFmnUzbtKbi';
const RAZORPAY_API_URL = 'https://api.razorpay.com/v1';

// Function to create HMAC signature for payment verification
function createHmacSignature(data: string, secret: string): string {
  const encoder = new TextEncoder();
  const key = encoder.encode(secret);
  const message = encoder.encode(data);
  
  // Create the HMAC signature using SHA-256
  const hmacDigest = crypto.subtle.digestSync(
    "HMAC",
    key,
    message,
    { algorithm: "SHA-256" }
  );
  
  // Convert to hex string
  return Array.from(new Uint8Array(hmacDigest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, ...data } = await req.json();
    console.log(`Razorpay handler called with action: ${action}`, data);

    switch (action) {
      case 'create_order': {
        const { amount, currency, receipt, notes } = data;
        
        // Create an order on Razorpay
        const response = await fetch(`${RAZORPAY_API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
            receipt,
            notes
          }),
        });

        const orderData = await response.json();
        
        if (!response.ok) {
          console.error('Razorpay order creation error:', orderData);
          throw new Error(orderData.error?.description || 'Failed to create order');
        }
        
        return new Response(
          JSON.stringify(orderData),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'verify_payment': {
        const {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          user_id,
          plan_details
        } = data;
        
        // Verify signature
        const dataToVerify = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = createHmacSignature(dataToVerify, RAZORPAY_KEY_SECRET);
        
        if (generated_signature !== razorpay_signature) {
          throw new Error('Invalid payment signature');
        }
        
        // Get payment details from Razorpay
        const response = await fetch(`${RAZORPAY_API_URL}/payments/${razorpay_payment_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
            'Content-Type': 'application/json',
          },
        });

        const paymentData = await response.json();
        
        if (!response.ok || paymentData.status !== 'captured') {
          console.error('Payment verification error:', paymentData);
          throw new Error('Payment verification failed');
        }
        
        // Record the payment in the database
        const { error: paymentError } = await supabase
          .from('payments')
          .insert([
            {
              user_id,
              amount: parseFloat(plan_details.price),
              currency: 'INR',
              payment_method: 'razorpay',
              status: 'completed',
              transaction_id: razorpay_payment_id,
              subscription_tier: plan_details.name
            }
          ]);

        if (paymentError) {
          console.error('Error recording payment:', paymentError);
          throw new Error('Failed to record payment');
        }

        // Add credits if applicable
        if (plan_details.credits && plan_details.credits > 0) {
          console.log(`Adding ${plan_details.credits} credits for user ${user_id}`);
          
          // Calculate expiration date (3 months from now)
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 3);
          
          const { error: creditError } = await supabase
            .from('user_credits')
            .insert([
              { 
                user_id,
                balance: plan_details.credits,
                expires_at: expiresAt.toISOString()
              }
            ]);
            
          if (creditError) {
            console.error('Error adding credits:', creditError);
            // Continue with the payment but return warning
            return new Response(
              JSON.stringify({ 
                success: true, 
                message: 'Payment successful but credits could not be added',
                warning: 'Failed to add credits'
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Payment verified successfully',
            data: { 
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }
  } catch (error) {
    console.error('Error in handle-razorpay-payment:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
