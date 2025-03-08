
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

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
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, userId, amount, expiresAt, creditId } = await req.json();
    console.log(`Credits function called with action: ${action}`, { userId, amount, expiresAt, creditId });

    switch (action) {
      case 'add': {
        // Add credits to user account
        const { data, error } = await supabase
          .from('user_credits')
          .insert([
            { 
              user_id: userId,
              balance: amount,
              expires_at: expiresAt
            }
          ])
          .select();

        if (error) {
          console.error('Error adding credits:', error);
          throw error;
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `${amount} credits added successfully`,
            data
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'use': {
        // Use credits (deduct from balance)
        // First get the user's credits ordered by expiration date (use oldest credits first)
        const { data: credits, error: fetchError } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', userId)
          .gt('balance', 0)
          .order('expires_at', { ascending: true });

        if (fetchError) {
          console.error('Error fetching credits:', fetchError);
          throw fetchError;
        }

        if (!credits || credits.length === 0) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'No credits available' 
            }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        let remaining = amount;
        const updates = [];

        // Use credits from oldest to newest
        for (const credit of credits) {
          if (remaining <= 0) break;
          
          const toUse = Math.min(remaining, credit.balance);
          remaining -= toUse;
          
          updates.push(
            supabase
              .from('user_credits')
              .update({ balance: credit.balance - toUse })
              .eq('id', credit.id)
          );
        }

        // Execute all updates
        if (updates.length > 0) {
          await Promise.all(updates);
        }

        if (remaining > 0) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: `Insufficient credits. ${amount - remaining} credits used, ${remaining} more needed.` 
            }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `${amount} credits used successfully` 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get': {
        // Get user's available credits
        const { data, error } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', userId)
          .gt('balance', 0)
          .lt('expires_at', new Date().toISOString());

        if (error) {
          console.error('Error fetching credits:', error);
          throw error;
        }

        // Calculate total available credits
        const totalCredits = data.reduce((sum, credit) => sum + credit.balance, 0);
        
        return new Response(
          JSON.stringify({ 
            success: true,
            totalCredits,
            credits: data
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
    console.error('Error in handle-credits function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
