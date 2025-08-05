
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Admin account configuration - moved to database-based role system for security
const UNLIMITED_ACCOUNT_ID = Deno.env.get('ADMIN_ACCOUNT_ID');

// Function to check if user has admin privileges
async function isAdminUser(userId: string, supabase: any): Promise<boolean> {
  // Check if user has admin role in database
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .single();
    
  return !!userRole || userId === UNLIMITED_ACCOUNT_ID;
}

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

    // Check if user has admin privileges using database-based role system
    const hasUnlimitedAccess = await isAdminUser(userId, supabase);

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
        // For admin accounts, always return success without deducting
        if (hasUnlimitedAccess) {
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: `Admin account - ${amount} credits used (not deducted)`,
              unlimited: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Use credits (deduct from balance) for regular users
        // First get the user's credits ordered by expiration date (use oldest credits first)
        const { data: credits, error: fetchError } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', userId)
          .gt('balance', 0)
          .gt('expires_at', new Date().toISOString()) // Only use non-expired credits
          .order('expires_at', { ascending: true });

        if (fetchError) {
          console.error('Error fetching credits:', fetchError);
          throw fetchError;
        }

        if (!credits || credits.length === 0) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'No credits available. Please upgrade your plan to continue using this feature.',
              insufficientCredits: true
            }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Calculate total available credits
        const totalAvailable = credits.reduce((sum, credit) => sum + credit.balance, 0);
        
        if (totalAvailable < amount) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: `Insufficient credits. You have ${totalAvailable} credits but need ${amount}. Please upgrade your plan.`,
              insufficientCredits: true,
              availableCredits: totalAvailable,
              requiredCredits: amount
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

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `${amount} credits used successfully`,
            remainingCredits: totalAvailable - amount
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get': {
        // For unlimited accounts, return a large number
        if (hasUnlimitedAccess) {
          return new Response(
            JSON.stringify({ 
              success: true,
              totalCredits: 999999,
              credits: [{
                id: 'unlimited',
                user_id: userId,
                balance: 999999,
                expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }],
              unlimited: true,
              isAdmin: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get user's available credits for regular users
        const { data, error } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', userId)
          .gt('balance', 0)
          .gt('expires_at', new Date().toISOString()); // Only get non-expired credits

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
            credits: data,
            unlimited: false,
            isAdmin: false
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'check': {
        // Check if user has enough credits for an operation
        if (hasUnlimitedAccess) {
          return new Response(
            JSON.stringify({ 
              success: true,
              hasEnoughCredits: true,
            unlimited: true,
            isAdmin: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data, error } = await supabase
          .from('user_credits')
          .select('balance')
          .eq('user_id', userId)
          .gt('balance', 0)
          .gt('expires_at', new Date().toISOString());

        if (error) {
          console.error('Error checking credits:', error);
          throw error;
        }

        const totalCredits = data.reduce((sum, credit) => sum + credit.balance, 0);
        const hasEnoughCredits = totalCredits >= (amount || 1);
        
        return new Response(
          JSON.stringify({ 
            success: true,
            hasEnoughCredits,
            availableCredits: totalCredits,
            requiredCredits: amount || 1,
            unlimited: false,
            isAdmin: false
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
