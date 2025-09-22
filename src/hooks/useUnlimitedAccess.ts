import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUnlimitedAccess = () => {
  useEffect(() => {
    const unlockFeatures = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Only give unlimited access to the admin account
        if (user.email !== 'enjoywithpandu@gmail.com') {
          return; // Exit early for non-admin users
        }

        // Override subscription limits in the database ONLY for admin
        await supabase.from('subscribers')
          .upsert({
            id: user.id,
            user_id: user.id,
            email: user.email,
            plan_name: 'Unlimited Plan',
            subscribed: true,
            monthly_post_count: 0,
            monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }, {
            onConflict: 'id'
          });

        // Track usage reset in user_usage table
        await supabase.from('user_usage')
          .insert({
            user_id: user.id,
            action_type: 'usage_reset',
            credits_used: 0,
            metadata: {
              reset_type: 'unlimited_access_granted_admin',
              previous_count: 0
            }
          });

        // Ensure we have an Unlimited Plan in subscription_limits
        await supabase.from('subscription_limits')
          .upsert({
            plan_name: 'Unlimited Plan',
            monthly_post_limit: -1,
            has_premium_templates: true,
            has_virality_score: true,
            has_ab_testing: true,
            has_advanced_ai: true,
            has_priority_support: true,
            credits_included: -1
          }, {
            onConflict: 'plan_name'
          });

        console.log('Successfully enabled unlimited access for admin account');
      } catch (error) {
        console.error('Error enabling unlimited access:', error);
      }
    };

    unlockFeatures();
  }, []);
};
