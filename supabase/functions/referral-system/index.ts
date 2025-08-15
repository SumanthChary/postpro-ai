
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

    console.log('Referral record created successfully');

    // Reward logic for free plan users
    if (referredUserPlan === 'free') {
      console.log(`Referrer ${referrerId} gets 2 free post enhancements.`);
      
      // Get current free enhancements count
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('free_enhancements')
        .eq('id', referrerId)
        .single();

      if (fetchError) {
        console.error('Error fetching referrer profile:', fetchError);
        return;
      }

      const currentEnhancements = currentProfile?.free_enhancements || 0;
      
      // Update referrer's free enhancements
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          free_enhancements: currentEnhancements + 2
        })
        .eq('id', referrerId);

      if (updateError) {
        console.error('Error updating referrer credits:', updateError);
      } else {
        console.log(`Referrer ${referrerId} awarded 2 free enhancements`);
      }
    } else {
      console.log(`Referred user ${referredUserId} purchased a plan: ${referredUserPlan}`);
      
      // Check if referrer qualifies for plan upgrade rewards
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
      console.log(`Referrer ${referrerId} has ${payingReferrals} paying referrals`);
      
      // Award more free enhancements for paying referrals
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('free_enhancements')
        .eq('id', referrerId)
        .single();

      if (!fetchError && currentProfile) {
        const currentEnhancements = currentProfile.free_enhancements || 0;
        const bonusEnhancements = referredUserPlan === 'annual' ? 20 : 10; // More for annual plans
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            free_enhancements: currentEnhancements + bonusEnhancements
          })
          .eq('id', referrerId);

        if (updateError) {
          console.error('Error updating referrer bonus credits:', updateError);
        } else {
          console.log(`Referrer ${referrerId} awarded ${bonusEnhancements} bonus enhancements`);
        }
      }

      // Check for weekly referral bonus (5 paying users in a week gets 50 bonus enhancements)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data: weeklyCount, error: weeklyError } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', referrerId)
        .neq('referred_user_plan', 'free')
        .gte('created_at', oneWeekAgo.toISOString());

      if (!weeklyError && weeklyCount && weeklyCount >= 5) {
        const { data: currentProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('free_enhancements')
          .eq('id', referrerId)
          .single();

        if (!fetchError && currentProfile) {
          const currentEnhancements = currentProfile.free_enhancements || 0;
          
          const { error: weeklyBonusError } = await supabase
            .from('profiles')
            .update({ 
              free_enhancements: currentEnhancements + 50,
              plan_upgraded_via_referral: true
            })
            .eq('id', referrerId);

          if (weeklyBonusError) {
            console.error('Error awarding weekly bonus:', weeklyBonusError);
          } else {
            console.log(`Referrer ${referrerId} awarded 50 bonus enhancements for 5 weekly referrals`);
          }
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
