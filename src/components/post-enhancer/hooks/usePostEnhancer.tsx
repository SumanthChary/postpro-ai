import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { enhancePost } from '../services/enhancePost';
import { EnhancePostResponse } from '../types';

export const usePostEnhancer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [enhancedPost, setEnhancedPost] = useState<EnhancePostResponse | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const usageCacheRef = useRef<{ data: any; timestamp: number } | null>(null);

  const checkUsageLimit = useCallback(async () => {
    if (!user) {
      return { canUse: false, currentUsage: 0, monthlyLimit: 0, planName: 'Free Plan', isAdmin: false };
    }

    const cache = usageCacheRef.current;
    if (cache && Date.now() - cache.timestamp < 60 * 1000) {
      return cache.data;
    }

    try {
      // Admin always has unlimited access
      if (user?.email === 'enjoywithpandu@gmail.com') {
  const adminResult = { canUse: true, isAdmin: true, currentUsage: 0, monthlyLimit: -1, planName: 'Admin Access' };
        usageCacheRef.current = { data: adminResult, timestamp: Date.now() };
        return adminResult;
      }

      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'checkUsageLimit',
          userId: user?.id,
          email: user?.email
        }
      });

      if (error) throw error;
      
      const result = {
        canUse: data.canUse,
        currentUsage: data.currentCount,
        monthlyLimit: data.monthlyLimit,
        planName: data.planName || 'Free Plan',
        isAdmin: false
      };
      usageCacheRef.current = { data: result, timestamp: Date.now() };
      return result;
    } catch (error) {
      console.error('Error checking usage limit:', error);
      // Be restrictive on error for non-admin users
      const fallback = { 
        canUse: false, 
        currentUsage: 0, 
        monthlyLimit: 5,
        planName: 'Free Plan',
        error: 'Unable to verify usage limits',
        isAdmin: false
      };
      usageCacheRef.current = { data: fallback, timestamp: Date.now() };
      return fallback;
    }
  }, [user]);

  const checkCreditsAvailable = async () => {
    try {
      // Track credit usage without blocking
      const { data } = await supabase.functions.invoke('handle-credits', {
        body: { 
          action: 'check',
          userId: user?.id,
          amount: 1
        }
      });
      return { available: true }; // Allow usage but track it
    } catch (error) {
      console.error('Error checking credits:', error);
      return { available: true }; // Allow usage even on error
    }
  };

  const enhance = async (post: string, category: string, styleTone: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enhance your post",
        variant: "destructive",
        action: (
          <button 
            onClick={() => navigate("/auth")}
            className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Sign In
          </button>
        ),
      });
      return false;
    }

    setLoading(true);

    try {
      // Check usage limits BEFORE processing
      const usageCheck = await checkUsageLimit();
      
      if (!usageCheck.canUse) {
        setLoading(false);
        toast({
          title: "Usage Limit Reached",
          description: `You've reached your monthly limit of ${usageCheck.monthlyLimit} enhancements. Upgrade to continue!`,
          variant: "destructive",
          action: (
            <button 
              onClick={() => navigate("/pricing")}
              className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90"
            >
              Upgrade Now
            </button>
          ),
        });
        return false;
      }

      const data = await enhancePost(post, category, true, styleTone);
      setEnhancedPost(data);
      
      // Increment usage count after successful enhancement (only for non-admin)
      if (!usageCheck.isAdmin) {
        await supabase.functions.invoke('subscription-manager', {
          body: { 
            action: 'incrementUsage',
            userId: user.id
          }
        });
        usageCacheRef.current = {
          data: {
            ...usageCheck,
            currentUsage: (usageCheck.currentUsage || 0) + 1
          },
          timestamp: Date.now()
        };
      }
      
      toast({
        title: "✨ Post Enhanced!",
        description: "Your post is now optimized for maximum engagement",
        variant: "default"
      });
      
      // Show feedback popup randomly (20% chance)
      if (Math.random() < 0.2) {
        setTimeout(() => setShowFeedback(true), 3000);
      }
      
      return data;
    } catch (error) {
      console.error('Error enhancing post:', error);
      toast({
        title: "Enhancement Failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEnhancedPost(null);
  };

  const handlePlatformSelect = (platform: keyof EnhancePostResponse['platforms']) => {
    if (!enhancedPost?.platforms) return '';
    return enhancedPost.platforms[platform] || '';
  };

  return {
    isEnhancing: loading,
    enhancedPosts: enhancedPost?.platforms || {},
    handleEnhancePost: enhance,
    handleReset,
    handlePlatformSelect,
    showFeedback,
    setShowFeedback,
    checkUsageLimit, // Export this for other components to use
  };
};