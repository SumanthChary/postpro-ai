
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Razorpay API configuration
const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
const RAZORPAY_API_URL = 'https://api.razorpay.com/v1';

// Validate required secrets
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error('Missing required Razorpay credentials');
}

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

// Function to calculate credits expiration date based on plan period
function calculateCreditsExpiration(period: string): Date {
  const expirationDate = new Date();
  
  switch(period) {
    case 'week':
      expirationDate.setDate(expirationDate.getDate() + 7);
      break;
    case 'month':
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      break;
    case 'year':
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      break;
    default:
      // Default to 3 months for any other period
      expirationDate.setMonth(expirationDate.getMonth() + 3);
  }
  
  return expirationDate;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate required environment variables
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials:', { 
        keyId: RAZORPAY_KEY_ID ? 'present' : 'missing',
        keySecret: RAZORPAY_KEY_SECRET ? 'present' : 'missing'
      });
      throw new Error('Authentication failed');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, ...data } = await req.json();
    console.log(`Razorpay handler called with action: ${action}`, data);

    switch (action) {
      case 'create_order': {
        const { amount, currency, receipt, notes } = data;
        
        // Razorpay requires amount in smallest currency unit (paise for INR, cents for USD)
        const amountInSmallestUnit = Math.round(amount * 100);
        
        // Create basic auth header
        const authString = `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`;
        const authHeader = `Basic ${btoa(authString)}`;
        
        console.log('Creating Razorpay order:', {
          amount: amountInSmallestUnit,
          currency,
          receipt,
          keyIdPresent: !!RAZORPAY_KEY_ID,
          keySecretPresent: !!RAZORPAY_KEY_SECRET
        });
        
        // Create an order on Razorpay
        const response = await fetch(`${RAZORPAY_API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInSmallestUnit,
            currency,
            receipt,
            notes
          }),
        });

        const orderData = await response.json();
        
        if (!response.ok) {
          console.error('Razorpay order creation failed:', {
            status: response.status,
            statusText: response.statusText,
            error: orderData
          });
          throw new Error(`Razorpay API Error: ${orderData.error?.description || 'Unknown error'}`);
        }
        
        console.log('Razorpay order created successfully:', orderData.id);
        
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
        const authString = `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`;
        const authHeader = `Basic ${btoa(authString)}`;
        
        const response = await fetch(`${RAZORPAY_API_URL}/payments/${razorpay_payment_id}`, {
          method: 'GET',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        });

        const paymentData = await response.json();
        
        if (!response.ok || paymentData.status !== 'captured') {
          console.error('Payment verification error:', paymentData);
          throw new Error('Payment verification failed');
        }
        
        // Get the currency used
        const currency = plan_details.currency || 'USD';
        
        // Record the payment in the database
        const { error: paymentError } = await supabase
          .from('payments')
          .insert([
            {
              user_id,
              amount: parseFloat(plan_details.price),
              currency: currency, // Use the currency from payment
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
          
          // Calculate expiration date based on plan period
          const expiresAt = calculateCreditsExpiration(plan_details.period || 'month');
          
          // First check if user already has credits to update them
          const { data: existingCredits, error: fetchError } = await supabase
            .from('user_credits')
            .select('*')
            .eq('user_id', user_id)
            .gt('balance', 0)
            .lt('expires_at', new Date(Date.now() + 86400000).toISOString())
            .order('expires_at', { ascending: false })
            .limit(1);
            
          if (fetchError) {
            console.error('Error fetching existing credits:', fetchError);
          }
          
          if (existingCredits && existingCredits.length > 0) {
            // Update existing credits
            const { error: updateError } = await supabase
              .from('user_credits')
              .update({ 
                balance: existingCredits[0].balance + plan_details.credits,
                expires_at: expiresAt.toISOString()
              })
              .eq('id', existingCredits[0].id);
              
            if (updateError) {
              console.error('Error updating credits:', updateError);
              throw new Error('Failed to update credits');
            }
          } else {
            // Create new credits record
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
              throw new Error('Failed to add credits');
            }
          }
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Payment verified successfully',
            data: { 
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id,
              currency: currency
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
