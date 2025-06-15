
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { enhancePost } from "../services/enhancePost";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePostEnhancer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{[key: string]: string}>({});

  const cleanContent = (content: string) => {
    return content
      // Remove HTML tags and symbols that could disturb the post
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Remove formatting artifacts but preserve line breaks
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(div|p|span)[^>]*>/gi, '\n')
      // Remove markdown asterisks that might interfere
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      // Clean up excessive whitespace but preserve line structure
      .replace(/[ \t]+/g, ' ') // Only collapse horizontal whitespace
      .replace(/\n[ \t]+/g, '\n') // Remove spaces at beginning of lines
      .replace(/[ \t]+\n/g, '\n') // Remove spaces at end of lines
      .replace(/\n{3,}/g, '\n\n') // Limit to max 2 consecutive line breaks
      .trim();
  };

  const checkCredits = async () => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.functions.invoke('handle-credits', {
        body: { 
          action: 'check',
          userId: user.id,
          amount: 1 // Each enhancement costs 1 credit
        }
      });

      if (error) throw error;
      
      return data.hasEnoughCredits;
    } catch (error) {
      console.error('Error checking credits:', error);
      return false;
    }
  };

  const handleEnhancePost = async (post: string, category: string, styleTone: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or sign up to use the post enhancement feature.",
        variant: "default",
      });
      navigate("/auth");
      return false;
    }

    if (!post.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content to enhance",
        variant: "destructive",
      });
      return false;
    }

    // Check if user has enough credits
    const hasCredits = await checkCredits();
    if (!hasCredits) {
      toast({
        title: "No Credits Available",
        description: "You've used all your free trial credits. Please upgrade to a paid plan to continue enhancing posts.",
        variant: "destructive",
        action: (
          <button 
            onClick={() => navigate("/subscription")}
            className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Upgrade Plan
          </button>
        ),
      });
      return false;
    }

    setIsEnhancing(true);
    setOriginalPost(post);

    try {
      console.log('Enhancing post with:', { post, category, styleTone });
      
      // Use credits for enhancement
      const data = await enhancePost(post, category, true, styleTone); // Set useCredits to true
      console.log('Enhanced post response:', data);
      
      if (data.platforms) {
        const updatedPosts = {
          linkedin: data.platforms.linkedin ? cleanContent(data.platforms.linkedin) : post,
          twitter: data.platforms.twitter ? cleanContent(data.platforms.twitter) : post,
          instagram: data.platforms.instagram ? cleanContent(data.platforms.instagram) : post,
          facebook: data.platforms.facebook ? cleanContent(data.platforms.facebook) : post,
        };
        
        setEnhancedPosts(updatedPosts);
        
        toast({
          title: "Post Enhanced Successfully!",
          description: "Your post has been enhanced with professional writing style and platform-specific optimization. 1 credit used.",
        });
        
        return updatedPosts;
      } else {
        throw new Error('No enhanced content received');
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error enhancing post:', err);
      
      // Handle specific credit-related errors
      if (err.message?.includes('No credits available') || err.message?.includes('Insufficient credits')) {
        toast({
          title: "No Credits Available",
          description: "You've used all your free trial credits. Please upgrade to a paid plan to continue.",
          variant: "destructive",
          action: (
            <button 
              onClick={() => navigate("/subscription")}
              className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-100"
            >
              Upgrade Plan
            </button>
          ),
        });
      } else {
        toast({
          title: "Enhancement Failed",
          description: err.message || "There was an error enhancing your post. Please try again.",
          variant: "destructive",
        });
      }
      return false;
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleReset = () => {
    setOriginalPost("");
    setEnhancedPosts({});
  };

  const handlePlatformSelect = (platform: string) => {
    if (enhancedPosts[platform]) {
      return enhancedPosts[platform];
    }
    return null;
  };

  return {
    isEnhancing,
    originalPost,
    enhancedPosts,
    handleEnhancePost,
    handleReset,
    handlePlatformSelect,
  };
};
