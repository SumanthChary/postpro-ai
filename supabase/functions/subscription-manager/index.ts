import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, userId, email, planName, subscriptionTier } = await req.json();
    console.log(`Subscription manager called with action: ${action}`, { userId, email, planName });

    switch (action) {
      case 'getUserSubscription': {
        const { data: subscription, error } = await supabase
          .from('subscribers')
          .select(`
            *,
            subscription_limits (
              monthly_post_limit,
              has_premium_templates,
              has_virality_score,
              has_ab_testing,
              has_advanced_ai,
              has_priority_support,
              credits_included
            )
          `)
          .eq('user_id', userId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        // If no subscription exists, create a starter plan subscription
        if (!subscription) {
          const { data: newSubscription, error: insertError } = await supabase
            .from('subscribers')
            .insert([{
              user_id: userId,
              email: email,
              plan_name: 'Starter Plan',
              subscribed: true,
              monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }])
            .select(`
              *,
              subscription_limits (
                monthly_post_limit,
                has_premium_templates,
                has_virality_score,
                has_ab_testing,
                has_advanced_ai,
                has_priority_support,
                credits_included
              )
            `)
            .single();

          if (insertError) throw insertError;

          return new Response(
            JSON.stringify({ 
              success: true, 
              subscription: newSubscription 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            subscription 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'updateSubscription': {
        const { data, error } = await supabase
          .from('subscribers')
          .upsert([{
            user_id: userId,
            email: email,
            plan_name: planName,
            subscription_tier: subscriptionTier,
            subscribed: true,
            subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }])
          .select();

        if (error) throw error;

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Subscription updated successfully',
            data 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'checkUsageLimit': {
        const { data: subscription, error } = await supabase
          .from('subscribers')
          .select(`
            monthly_post_count,
            monthly_reset_date,
            plan_name,
            subscription_limits (monthly_post_limit)
          `)
          .eq('user_id', userId)
          .single();

        if (error) throw error;

        const now = new Date();
        const resetDate = new Date(subscription.monthly_reset_date);
        let currentCount = subscription.monthly_post_count || 0;

        // Reset count if past reset date
        if (now > resetDate) {
          await supabase
            .from('subscribers')
            .update({
              monthly_post_count: 0,
              monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
            .eq('user_id', userId);
          currentCount = 0;
        }

        const monthlyLimit = subscription.subscription_limits?.monthly_post_limit || 5;
        const canUse = monthlyLimit === -1 || currentCount < monthlyLimit;

        return new Response(
          JSON.stringify({ 
            success: true,
            canUse,
            currentCount,
            monthlyLimit,
            planName: subscription.plan_name || 'Starter Plan',
            remainingUses: monthlyLimit === -1 ? -1 : monthlyLimit - currentCount
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'incrementUsage': {
        // Check if this is the admin user who should have unlimited access
        const { data: userAuth } = await supabase.auth.admin.getUserById(userId);
        const isAdmin = userAuth?.user?.email === 'enjoywithpandu@gmail.com';
        
        if (!isAdmin) {
          // Only increment usage for non-admin users
          const { data, error } = await supabase
            .from('subscribers')
            .update({
              monthly_post_count: supabase.sql`monthly_post_count + 1`
            })
            .eq('user_id', userId)
            .select();

          if (error) throw error;
        }

        // Log usage for all users
        await supabase
          .from('user_usage')
          .insert([{
            user_id: userId,
            action_type: 'post_enhancement',
            credits_used: isAdmin ? 0 : 1 // Admin uses 0 credits
          }]);

        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'Usage incremented successfully'
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
    console.error('Error in subscription-manager function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
