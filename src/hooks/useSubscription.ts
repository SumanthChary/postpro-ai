import { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionLimits {
  monthly_post_limit: number;
  has_premium_templates: boolean;
  has_virality_score: boolean;
  has_ab_testing: boolean;
  has_advanced_ai: boolean;
  has_priority_support: boolean;
  credits_included: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  email: string;
  plan_name: string;
  subscribed: boolean;
  monthly_post_count: number;
  monthly_reset_date: string;
  subscription_limits?: SubscriptionLimits;
}

// Simple cache for performance
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds

export const useSubscription = () => {
  const { user } = useAuthContext();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Check cache first for performance
      const cacheKey = `sub_${user.id}`;
      const cached = cache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        setSubscription(cached.data);
        setLoading(false);
        return;
      }

      // Admin gets unlimited access instantly
      if (user.email === 'enjoywithpandu@gmail.com') {
        const adminSub: Subscription = {
          id: user.id,
          user_id: user.id,
          email: user.email!,
          plan_name: 'Unlimited Plan',
          subscribed: true,
          monthly_post_count: 0,
          monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          subscription_limits: {
            monthly_post_limit: -1,
            has_premium_templates: true,
            has_virality_score: true,
            has_ab_testing: true,
            has_advanced_ai: true,
            has_priority_support: true,
            credits_included: -1
          }
        };
        
        cache.set(cacheKey, { data: adminSub, timestamp: Date.now() });
        setSubscription(adminSub);
        setLoading(false);
        return;
      }

      // Regular users get Starter Plan
      const starterSub: Subscription = {
        id: user.id,
        user_id: user.id,
        email: user.email!,
        plan_name: 'Starter Plan',
        subscribed: false,
        monthly_post_count: 0,
        monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        subscription_limits: {
          monthly_post_limit: 5,
          has_premium_templates: false,
          has_virality_score: true,
          has_ab_testing: false,
          has_advanced_ai: false,
          has_priority_support: false,
          credits_included: 5
        }
      };

      cache.set(cacheKey, { data: starterSub, timestamp: Date.now() });
      setSubscription(starterSub);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return useMemo(() => ({
    subscription,
    loading,
    fetchSubscription,
  }), [subscription, loading]);
};