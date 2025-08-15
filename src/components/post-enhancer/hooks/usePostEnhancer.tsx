import { useState } from 'react';
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

  const checkUsageLimit = async () => {
    try {
      // Call subscription manager to track usage
      const { data } = await supabase.functions.invoke('subscription-manager', {
        body: { 
          action: 'getUserSubscription',
          userId: user?.id,
          email: user?.email
        }
      });
      return { canUse: true }; // Allow usage but track it
    } catch (error) {
      console.error('Error checking usage limit:', error);
      return { canUse: true }; // Allow usage even on error
    }
  };

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
      // Track usage without blocking
      checkUsageLimit();
      checkCreditsAvailable();

      const data = await enhancePost(post, category, true, styleTone);
      setEnhancedPost(data);
      
      // Show feedback popup randomly (30% chance)
      if (Math.random() < 0.3) {
        setTimeout(() => setShowFeedback(true), 2000); // Show after 2 seconds
      }
      
      return data;
    } catch (error) {
      console.error('Error enhancing post:', error);
      toast({
        title: "Error",
        description: "An error occurred while enhancing your post. Please try again.",
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
  };
};
