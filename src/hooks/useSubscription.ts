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
    monthlyLimit: -1, // -1 means unlimited for your account
    remainingUses: -1
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

    const checkUsageLimit = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Set unlimited usage for your account
      if (user?.email === 'your-email@example.com') {
        setUsageStats({
          canUse: true,
          currentCount: 0,
          monthlyLimit: -1,
          remainingUses: -1
        });
        return;
      }

      // For other users, check if they're new (within 24 hours)
      const userCreatedAt = new Date(user?.created_at || '');
      const isNewUser = (Date.now() - userCreatedAt.getTime()) < 24 * 60 * 60 * 1000;

      if (isNewUser) {
        setUsageStats({
          canUse: true,
          currentCount: 0,
          monthlyLimit: 50,  // Give new users 50 free enhancements
          remainingUses: 50
        });
        return;
      }

      // For regular users, always allow usage but track it
      setUsageStats({
        canUse: true,
        currentCount: 0,
        monthlyLimit: 15,  // Show limit but don't enforce
        remainingUses: 15
      });
    } catch (error) {
      console.error('Error checking usage limit:', error);
      // Default to allowing usage if there's an error
      setUsageStats({
        canUse: true,
        currentCount: 0,
        monthlyLimit: 15,
        remainingUses: 15
      });
    }

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
