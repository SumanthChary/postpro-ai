import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
};

type PlanConfig = {
  planName: string;
  monthlyPostLimit: number;
  hasPremiumTemplates: boolean;
  hasViralityScore: boolean;
  hasAbTesting: boolean;
  hasAdvancedAI: boolean;
  hasPrioritySupport: boolean;
  creditsIncluded: number;
  trialDurationDays?: number;
};

const PLAN_CONFIGS: Record<string, PlanConfig> = {
  'Post Enhancer': {
    planName: 'Post Enhancer',
    monthlyPostLimit: -1,
    hasPremiumTemplates: true,
    hasViralityScore: false,
    hasAbTesting: false,
    hasAdvancedAI: false,
    hasPrioritySupport: false,
    creditsIncluded: -1,
  },
  'Post Enhancer Plus': {
    planName: 'Post Enhancer Plus',
    monthlyPostLimit: -1,
    hasPremiumTemplates: true,
    hasViralityScore: true,
    hasAbTesting: true,
    hasAdvancedAI: true,
    hasPrioritySupport: true,
    creditsIncluded: -1,
  },
  'Owner Unlimited': {
    planName: 'Owner Unlimited',
    monthlyPostLimit: -1,
    hasPremiumTemplates: true,
    hasViralityScore: true,
    hasAbTesting: true,
    hasAdvancedAI: true,
    hasPrioritySupport: true,
    creditsIncluded: -1,
  },
};

const DEFAULT_PLAN = 'Post Enhancer';

const UNLIMITED_EMAILS = new Set(['enjoywithpandu@gmail.com']);
const UNLIMITED_PLAN = 'Owner Unlimited';

const getPlanConfig = (planName?: string) => {
  if (!planName) return PLAN_CONFIGS[DEFAULT_PLAN];
  return PLAN_CONFIGS[planName] ?? PLAN_CONFIGS[DEFAULT_PLAN];
};

const ensurePlanLimits = async (supabase: any, planName: string) => {
  const config = getPlanConfig(planName);

  const { error } = await supabase
    .from('subscription_limits')
    .upsert({
      plan_name: config.planName,
      monthly_post_limit: config.monthlyPostLimit,
      has_premium_templates: config.hasPremiumTemplates,
      has_virality_score: config.hasViralityScore,
      has_ab_testing: config.hasAbTesting,
      has_advanced_ai: config.hasAdvancedAI,
      has_priority_support: config.hasPrioritySupport,
      credits_included: config.creditsIncluded,
    }, {
      onConflict: 'plan_name'
    });

  if (error) throw error;

  return config;
};

const ensureUnlimitedSubscription = async (
  supabase: any,
  userId: string,
  email?: string | null,
) => {
  if (!email) return null;
  const normalized = email.toLowerCase();
  if (!UNLIMITED_EMAILS.has(normalized)) return null;

  await ensurePlanLimits(supabase, UNLIMITED_PLAN);

  const { error } = await supabase
    .from('subscribers')
    .upsert({
      user_id: userId,
      email,
      plan_name: UNLIMITED_PLAN,
      subscription_tier: 'owner',
      subscribed: true,
      monthly_post_count: 0,
      monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subscription_end: null,
    }, {
      onConflict: 'user_id'
    })
    .select('id');

  if (error) throw error;

  return await fetchSubscription(supabase, userId);
};

const fetchSubscription = async (
  supabase: any,
  userId: string
) => {
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

  return subscription;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, userId, email, planName, subscriptionTier } = await req.json() as {
      action: string;
      userId: string;
      email?: string;
      planName?: string;
      subscriptionTier?: string;
    };
    console.log(`Subscription manager called with action: ${action}`, { userId, email, planName });

    await ensureUnlimitedSubscription(supabase, userId, email);

    switch (action) {
      case 'getUserSubscription': {
        let subscription = await fetchSubscription(supabase, userId);

        if (!subscription) {
          subscription = await ensureUnlimitedSubscription(supabase, userId, email);
        }

        if (!subscription) {
          return new Response(
            JSON.stringify({
              success: true,
              subscription: null,
              requiresPurchase: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Ensure subscription limits align with the defined plan configuration
        const planConfig = await ensurePlanLimits(supabase, subscription.plan_name ?? DEFAULT_PLAN);

        if (!subscription.subscription_limits) {
          subscription = await fetchSubscription(supabase, userId) ?? subscription;
        } else {
          const limits = subscription.subscription_limits;
          if (
            limits.monthly_post_limit !== planConfig.monthlyPostLimit ||
            limits.has_premium_templates !== planConfig.hasPremiumTemplates ||
            limits.has_virality_score !== planConfig.hasViralityScore ||
            limits.has_ab_testing !== planConfig.hasAbTesting ||
            limits.has_advanced_ai !== planConfig.hasAdvancedAI ||
            limits.has_priority_support !== planConfig.hasPrioritySupport ||
            limits.credits_included !== planConfig.creditsIncluded
          ) {
            await ensurePlanLimits(supabase, subscription.plan_name ?? DEFAULT_PLAN);
            subscription = await fetchSubscription(supabase, userId) ?? subscription;
          }
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
        const config = await ensurePlanLimits(supabase, planName || DEFAULT_PLAN);
        const { data, error } = await supabase
          .from('subscribers')
          .upsert([{
            user_id: userId,
            email: email,
            plan_name: planName,
            subscription_tier: subscriptionTier,
            subscribed: true,
            monthly_post_count: 0,
            subscription_end: config.trialDurationDays
              ? new Date(Date.now() + config.trialDurationDays * 24 * 60 * 60 * 1000)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }])
          .select();

        if (error) throw error;

        const updatedSubscription = await fetchSubscription(supabase, userId);

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Subscription updated successfully',
            data: updatedSubscription ?? data 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'checkUsageLimit': {
        let subscriptionRecord = await fetchSubscription(supabase, userId);

        if (!subscriptionRecord || (subscriptionRecord.email && UNLIMITED_EMAILS.has(subscriptionRecord.email.toLowerCase()))) {
          subscriptionRecord = await ensureUnlimitedSubscription(supabase, userId, subscriptionRecord?.email ?? email);
        }

        if (!subscriptionRecord) {
          return new Response(
            JSON.stringify({ success: false, error: 'Subscription not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        await ensurePlanLimits(supabase, subscriptionRecord.plan_name ?? DEFAULT_PLAN);

        const planConfig = getPlanConfig(subscriptionRecord.plan_name);
        const { data: subscription, error } = await supabase
          .from('subscribers')
          .select(`
            email,
            monthly_post_count,
            monthly_reset_date,
            plan_name,
            subscription_end,
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

        const monthlyLimit = subscription.subscription_limits?.monthly_post_limit ?? planConfig.monthlyPostLimit;
        const canUse = monthlyLimit === -1 || currentCount < monthlyLimit;

        return new Response(
          JSON.stringify({ 
            success: true,
            canUse,
            currentCount,
            monthlyLimit,
            planName: subscription.plan_name || DEFAULT_PLAN,
            remainingUses: monthlyLimit === -1 ? -1 : monthlyLimit - currentCount,
            subscriptionEndsAt: subscription.subscription_end ?? null,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'incrementUsage': {
        let subscription = await fetchSubscription(supabase, userId);

        if (!subscription || (subscription.email && UNLIMITED_EMAILS.has(subscription.email.toLowerCase()))) {
          subscription = await ensureUnlimitedSubscription(supabase, userId, subscription?.email ?? email);
        }

        if (!subscription) {
          return new Response(
            JSON.stringify({ success: false, error: 'Subscription not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        await ensurePlanLimits(supabase, subscription.plan_name ?? DEFAULT_PLAN);

        const config = getPlanConfig(subscription.plan_name);
        const limit = subscription.subscription_limits?.monthly_post_limit ?? config.monthlyPostLimit;
        const currentCount = subscription.monthly_post_count ?? 0;
        
        if (limit !== -1 && currentCount >= limit) {
          return new Response(
            JSON.stringify({
              success: false,
              overLimit: true,
              monthlyLimit: limit,
              currentCount
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const nextCount = currentCount + 1;
        const { error: updateError } = await supabase
          .from('subscribers')
          .update({
            monthly_post_count: nextCount
          })
          .eq('user_id', userId);

        if (updateError) throw updateError;

        // Log usage for all users
        await supabase
          .from('user_usage')
          .insert([{
            user_id: userId,
            action_type: 'post_enhancement',
            credits_used: 1
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
  } catch (error: any) {
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
