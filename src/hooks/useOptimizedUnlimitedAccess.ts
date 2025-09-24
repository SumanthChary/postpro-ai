import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';

export const useOptimizedUnlimitedAccess = () => {
  const { user } = useAuthContext();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!user || hasInitializedRef.current) return;

    const setupUserAccess = async () => {
      try {
        hasInitializedRef.current = true;

        // Only give unlimited access to the admin account
        if (user.email === 'enjoywithpandu@gmail.com') {
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
              onConflict: 'user_id'
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
        } else {
          // For all other users, ensure they have a proper starter plan with limits
          const { data: existingSubscription } = await supabase
            .from('subscribers')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (!existingSubscription) {
            // Create starter plan for new users
            await supabase.from('subscribers')
              .insert({
                user_id: user.id,
                email: user.email,
                plan_name: 'Starter Plan',
                subscribed: true,
                monthly_post_count: 0,
                monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              });
          }
          
          // Ensure Starter Plan exists in subscription_limits with proper limits
          await supabase.from('subscription_limits')
            .upsert({
              plan_name: 'Starter Plan',
              monthly_post_limit: 5, // Limited to 5 posts per month
              has_premium_templates: false,
              has_virality_score: false,
              has_ab_testing: false,
              has_advanced_ai: false,
              has_priority_support: false,
              credits_included: 0
            }, {
              onConflict: 'plan_name'
            });
            
          console.log('Set up limited access for regular user');
        }
      } catch (error) {
        console.error('Error setting up user access:', error);
        hasInitializedRef.current = false; // Reset on error to allow retry
      }
    };

    setupUserAccess();
  }, [user]);

  // Reset flag when user changes
  useEffect(() => {
    hasInitializedRef.current = false;
  }, [user?.id]);
};