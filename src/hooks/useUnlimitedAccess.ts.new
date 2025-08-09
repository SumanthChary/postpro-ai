import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUnlimitedAccess = () => {
  useEffect(() => {
    const unlockFeatures = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Override subscription limits in the database
        await supabase.from('subscriptions')
          .upsert({
            id: user.id,
            user_id: user.id,
            email: user.email,
            plan_name: 'unlimited',
            subscribed: true,
            monthly_post_count: 0,
            subscription_limits: {
              monthly_post_limit: -1,
              has_premium_templates: true,
              has_virality_score: true,
              has_ab_testing: true,
              has_advanced_ai: true,
              has_priority_support: true,
              credits_included: -1
            }
          }, {
            onConflict: 'id'
          });

        // Reset usage tracking
        await supabase.from('usage_stats')
          .upsert({
            user_id: user.id,
            monthly_post_count: 0,
            last_reset: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        console.log('Successfully enabled unlimited access');
      } catch (error) {
        console.error('Error enabling unlimited access:', error);
      }
    };

    unlockFeatures();
  }, []);
};
