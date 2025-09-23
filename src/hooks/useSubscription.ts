import { useState, useEffect, useCallback } from "react";
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
    monthlyLimit: -1,
    remainingUses: -1
  });
  const { toast } = useToast();

  const checkUsageLimit = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Set unlimited usage for admin account
      if (user?.email === 'enjoywithpandu@gmail.com') {
        setUsageStats({
          canUse: true,
          currentCount: 0,
          monthlyLimit: -1, // Unlimited
          remainingUses: -1
        });
        return;
      }

      // Get current usage from subscription
      const currentUsage = subscription?.monthly_post_count || 0;
      
      // For new users (within 24 hours), give them limited free enhancements
      const userCreatedAt = new Date(user?.created_at || '');
      const isNewUser = (Date.now() - userCreatedAt.getTime()) < 24 * 60 * 60 * 1000;

      if (isNewUser) {
        const newUserLimit = 5; // Limited to 5 for new users
        setUsageStats({
          canUse: currentUsage < newUserLimit,
          currentCount: currentUsage,
          monthlyLimit: newUserLimit,
          remainingUses: Math.max(newUserLimit - currentUsage, 0)
        });
        return;
      }

      // For regular users, check their subscription limits
      const monthlyLimit = subscription?.subscription_limits?.monthly_post_limit || 5; // Default to 5 instead of 15
      const hasUnlimitedAccess = monthlyLimit === -1;
      const remainingUses = hasUnlimitedAccess ? -1 : Math.max(monthlyLimit - currentUsage, 0);
      const canUse = hasUnlimitedAccess || remainingUses > 0;
      
      setUsageStats({
        canUse,
        currentCount: currentUsage,
        monthlyLimit,
        remainingUses
      });
    } catch (error) {
      console.error('Error checking usage limit:', error);
      // Default to allowing usage if there's an error
      setUsageStats({
        canUse: true,
        currentCount: 0,
        monthlyLimit: 5, // Default to 5 instead of 15
        remainingUses: 5
      });
    }
  }, [subscription?.monthly_post_count]);

  const fetchSubscription = useCallback(async () => {
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
        checkUsageLimit(); // Update usage stats after subscription is fetched
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
  }, [toast, checkUsageLimit]);

  const incrementUsage = useCallback(async () => {
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
        checkUsageLimit();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      return false;
    }
  }, [checkUsageLimit]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    loading,
    usageStats,
    fetchSubscription,
    checkUsageLimit,
    incrementUsage,
  };
};
