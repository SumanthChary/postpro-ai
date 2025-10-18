import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/utils/performance";

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
  monthly_reset_date?: string | null;
  subscription_end?: string | null;
  subscription_tier?: string | null;
  subscription_limits?: SubscriptionLimits | null;
}

// Cache for subscription data
const subscriptionCache = new Map();
const SUBSCRIPTION_CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes (increased from 2)

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [usageStats, setUsageStats] = useState({
    canUse: false,
    currentCount: 0,
    monthlyLimit: 0,
    remainingUses: 0
  });
  const { toast } = useToast();

  // Debounced usage limit check to prevent excessive API calls
  const debouncedCheckUsageLimit = useMemo(
    () => debounce(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.functions.invoke('subscription-manager', {
          body: {
            action: 'checkUsageLimit',
            userId: user.id,
            email: user.email
          }
        });

        if (error) throw error;

        const monthlyLimit = typeof data?.monthlyLimit === 'number' ? data.monthlyLimit : 0;
        const currentCount = typeof data?.currentCount === 'number' ? data.currentCount : 0;
        const remainingUses = typeof data?.remainingUses === 'number'
          ? data.remainingUses
          : (monthlyLimit === -1 ? -1 : Math.max(monthlyLimit - currentCount, 0));

        setUsageStats({
          canUse: Boolean(data?.canUse ?? true),
          currentCount,
          monthlyLimit,
          remainingUses
        });
      } catch (error) {
        console.error('Error checking usage limit:', error);
        setUsageStats({
          canUse: false,
          currentCount: 0,
          monthlyLimit: 0,
          remainingUses: 0
        });
      }
    }, 300),
    []
  );

  const checkUsageLimit = useCallback(() => {
    debouncedCheckUsageLimit();
  }, [debouncedCheckUsageLimit]);

  const fetchSubscription = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check cache first
      const cacheKey = `subscription_${user.id}`;
      const cached = subscriptionCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < SUBSCRIPTION_CACHE_EXPIRY) {
        setSubscription(cached.data as Subscription);
        checkUsageLimit();
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'getUserSubscription',
          userId: user.id,
          email: user.email
        }
      });

      if (error) throw error;
      
      if (data.success && data.subscription) {
        const subscriptionData = data.subscription as Subscription;

        subscriptionCache.set(cacheKey, {
          data: subscriptionData,
          timestamp: Date.now()
        });

        setSubscription(subscriptionData);
        checkUsageLimit();
      } else {
        subscriptionCache.set(cacheKey, {
          data: null,
          timestamp: Date.now()
        });
        setSubscription(null);
        setUsageStats({
          canUse: false,
          currentCount: 0,
          monthlyLimit: 0,
          remainingUses: 0
        });
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

      if (data?.overLimit) {
        setUsageStats((prev) => ({
          ...prev,
          canUse: false,
          currentCount: data.currentCount ?? prev.currentCount,
          monthlyLimit: data.monthlyLimit ?? prev.monthlyLimit,
          remainingUses: 0
        }));
        return false;
      }

      if (data?.success) {
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

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    subscription,
    loading,
    usageStats,
    fetchSubscription,
    checkUsageLimit,
    incrementUsage,
  }), [
    subscription,
    loading,
    usageStats,
    fetchSubscription,
    checkUsageLimit,
    incrementUsage,
  ]);
};
