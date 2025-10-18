import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const OWNER_EMAIL = 'enjoywithpandu@gmail.com';

export const useUnlimitedAccess = () => {
  useEffect(() => {
    const ensureSubscriptionState = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        if (user.email === OWNER_EMAIL) {
          // Force the admin account into an unlimited plan bucket
          await supabase.from('subscribers').upsert({
            id: user.id,
            user_id: user.id,
            email: user.email,
            plan_name: 'Owner Unlimited',
            subscribed: true,
            monthly_post_count: 0,
            monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }, {
            onConflict: 'user_id'
          });

          await supabase.from('subscription_limits').upsert({
            plan_name: 'Owner Unlimited',
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
        } else {
          await supabase.functions.invoke('subscription-manager', {
            body: {
              action: 'getUserSubscription',
              userId: user.id,
              email: user.email
            }
          });
        }
      } catch (error) {
        console.error('Error ensuring subscription state:', error);
      }
    };

    ensureSubscriptionState();
  }, []);
};
