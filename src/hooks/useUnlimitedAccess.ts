import { useEffect } from 'react';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useUnlimitedAccess = () => {
  const { toast } = useToast();

  useEffect(() => {
    const unlockFeatures = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Override subscription limits in the database
      await supabase.from('subscription_limits')
        .upsert({
          user_id: user.id,
          monthly_post_limit: -1,
          has_premium_templates: true,
          has_virality_score: true,
          has_ab_testing: true,
          has_advanced_ai: true,
          has_priority_support: true,
          credits_included: -1
        });

      // Reset usage counters
      await supabase.from('user_usage')
        .upsert({
          user_id: user.id,
          monthly_count: 0,
          total_count: 0
        });
    };

    unlockFeatures().catch(console.error);
  }, []);

  return null;
};
