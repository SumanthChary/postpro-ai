
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function trackReferral(referrerId: string, referredUserId: string, referredUserPlan: string) {
  console.log(`Tracking referral: Referrer ${referrerId}, Referred User ${referredUserId}, Plan ${referredUserPlan}`);

  try {
    // Insert referral record
    const { data: referralData, error: referralError } = await supabase
      .from('referrals')
      .insert([
        {
          referrer_id: referrerId,
          referred_user_id: referredUserId,
          referred_user_plan: referredUserPlan,
          created_at: new Date().toISOString()
        }
      ]);

    if (referralError) {
      console.error('Error inserting referral:', referralError);
      throw referralError;
    }

    // Reward logic for free plan users
    if (referredUserPlan === 'free') {
      console.log(`Referrer ${referrerId} gets 2 free post enhancements.`);
      
      // Update referrer's post count in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          free_enhancements: supabase.sql`free_enhancements + 2`
        })
        .eq('id', referrerId);

      if (updateError) {
        console.error('Error updating referrer credits:', updateError);
      }
    } else {
      console.log(`Referred user ${referredUserId} purchased a plan: ${referredUserPlan}`);
      
      // Check if referrer qualifies for plan upgrade
      const { data: referralCount, error: countError } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', referrerId)
        .neq('referred_user_plan', 'free');

      if (countError) {
        console.error('Error counting referrals:', countError);
        return;
      }

      const payingReferrals = referralCount || 0;
      
      // If 2 paying users referred, grant the same plan
      if (payingReferrals >= 2) {
        const { error: upgradeError } = await supabase
          .from('profiles')
          .update({ 
            subscription_plan: referredUserPlan,
            plan_upgraded_via_referral: true
          })
          .eq('id', referrerId);

        if (upgradeError) {
          console.error('Error upgrading referrer plan:', upgradeError);
        } else {
          console.log(`Referrer ${referrerId} upgraded to ${referredUserPlan} plan`);
        }
      }

      // Check for weekly referral bonus (10 paying users in a week)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data: weeklyCount, error: weeklyError } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', referrerId)
        .neq('referred_user_plan', 'free')
        .gte('created_at', oneWeekAgo.toISOString());

      if (!weeklyError && weeklyCount && weeklyCount >= 10) {
        const { error: annualUpgradeError } = await supabase
          .from('profiles')
          .update({ 
            subscription_plan: 'annual',
            plan_upgraded_via_referral: true
          })
          .eq('id', referrerId);

        if (annualUpgradeError) {
          console.error('Error upgrading to annual plan:', annualUpgradeError);
        } else {
          console.log(`Referrer ${referrerId} upgraded to annual plan for 10 weekly referrals`);
        }
      }
    }
  } catch (error) {
    console.error('Error in trackReferral:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { referrerId, referredUserId, referredUserPlan } = body;

      if (!referrerId || !referredUserId || !referredUserPlan) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: referrerId, referredUserId, referredUserPlan' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }

      await trackReferral(referrerId, referredUserId, referredUserPlan);

      return new Response(
        JSON.stringify({ message: 'Referral tracked successfully' }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    } catch (error) {
      console.error('Error in referral tracking:', error);
      return new Response(
        JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
