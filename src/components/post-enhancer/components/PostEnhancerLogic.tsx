
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { enhancePost } from "../services/enhancePost";
import { EnhancerForm } from "./EnhancerForm";
import { ShareOptions } from "./ShareOptions";
import { ViralityScore } from "./ViralityScore";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface PostEnhancerLogicProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  styleTone: string;
  setStyleTone: (tone: string) => void;
}

export const PostEnhancerLogic = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}: PostEnhancerLogicProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const cleanContent = (content: string) => {
    // Remove asterisk symbols and clean the content
    return content
      .replace(/\*/g, '') // Remove all asterisk symbols
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const handleEnhancePost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or sign up to use the post enhancement feature.",
        variant: "default",
      });
      navigate("/auth");
      return;
    }

    if (!post.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content to enhance",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    setOriginalPost(post);

    try {
      console.log('Enhancing post with:', { post, category, styleTone });
      const data = await enhancePost(post, category, false, styleTone);
      console.log('Enhanced post response:', data);
      
      if (data.platforms) {
        // Clean all platform posts without adding extra content since AI prompts handle everything
        const updatedPosts = {
          linkedin: data.platforms.linkedin ? cleanContent(data.platforms.linkedin) : post,
          twitter: data.platforms.twitter ? cleanContent(data.platforms.twitter) : post,
          instagram: data.platforms.instagram ? cleanContent(data.platforms.instagram) : post,
          facebook: data.platforms.facebook ? cleanContent(data.platforms.facebook) : post,
        };
        
        setEnhancedPosts(updatedPosts);
        setPost(updatedPosts.linkedin);
        
        toast({
          title: "Post Enhanced Successfully!",
          description: "Your post has been enhanced with professional writing style and platform-specific optimization.",
        });
      } else {
        throw new Error('No enhanced content received');
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error enhancing post:', err);
      toast({
        title: "Enhancement Failed",
        description: err.message || "There was an error enhancing your post. Please try again.",
        variant: "destructive",
      });
      setPost(originalPost);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleReset = () => {
    setPost(originalPost || "");
    setOriginalPost("");
    setEnhancedPosts({});
  };

  const handlePlatformSelect = (platform: string) => {
    if (enhancedPosts[platform]) {
      setPost(enhancedPosts[platform]);
    }
  };

  return (
    <Card className="p-4 sm:p-6 shadow-lg border-0 bg-white/70 backdrop-blur-[2px]">
      <EnhancerForm
        post={post}
        category={category}
        styleTone={styleTone}
        isEnhancing={isEnhancing}
        onPostChange={setPost}
        onCategoryChange={setCategory}
        onStyleToneChange={setStyleTone}
        onReset={handleReset}
        onEnhance={handleEnhancePost}
      />
      
      {Object.keys(enhancedPosts).length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <ShareOptions 
            enhancedPosts={enhancedPosts} 
            onPlatformSelect={handlePlatformSelect} 
          />
        </div>
      )}

      <ViralityScore post={post} category={category} />
    </Card>
  );
};
