import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionLimits {
  monthly_post_limit: number;
  has_premium_templates: boolean;
  has_virality_score: boolean;
  has_ab_testing: boolean;
  has_advanced_ai: boolean;
  has_priority_support: boolean;
  credits_included: number;
}

interface Subscription {
  id: string;
  user_id: string;
  email: string;
  plan_name: string;
  subscribed: boolean;
  monthly_post_count: number;
  subscription_limits: SubscriptionLimits;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [usageStats, setUsageStats] = useState({
    canUse: true,
    currentCount: 0,
    monthlyLimit: 5, // Changed from 3 to 5
    remainingUses: 5
  });
  const { toast } = useToast();

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'getUserSubscription',
          userId: user.id,
          email: user.email
        }
      });

      if (error) throw error;
      
      if (data.success) {
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkUsageLimit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'checkUsageLimit',
          userId: user.id
        }
      });

      if (error) throw error;
      
      if (data.success) {
        setUsageStats(data);
        return data.canUse;
      }
      return false;
    } catch (error) {
      console.error('Error checking usage limit:', error);
      return false;
    }
  };

  const incrementUsage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'incrementUsage',
          userId: user.id
        }
      });

      if (error) throw error;
      
      if (data.success) {
        // Refresh usage stats
        await checkUsageLimit();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return {
    subscription,
    loading,
    usageStats,
    fetchSubscription,
    checkUsageLimit,
    incrementUsage,
  };
};
