import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostEnhancerProps } from "./types";
import { enhancePost } from "./services/enhancePost";
import { EnhancerForm } from "./components/EnhancerForm";
import { ShareOptions } from "./components/ShareOptions";
import { ViralityScore } from "./components/ViralityScore";
import SmartSuggestions from "./components/SmartSuggestions";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}: PostEnhancerProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

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
        setEnhancedPosts(data.platforms);
        setPost(data.platforms.linkedin || post);
        
        toast({
          title: "Post Enhanced!",
          description: "Your post has been professionally enhanced",
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

  const handleSuggestionClick = (suggestion: string) => {
    setPost(prev => {
      // If post ends with a hashtag or starts with #, add a space
      if (prev.trim().endsWith('#') || suggestion.startsWith('#')) {
        return `${prev.trim()} ${suggestion}`;
      }
      // If it's a CTA, add it on a new line
      if (!suggestion.startsWith('#')) {
        return `${prev.trim()}\n\n${suggestion}`;
      }
      // Otherwise just add with space
      return `${prev.trim()} ${suggestion}`;
    });
  };

  return (
    <div className="space-y-8 w-full px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-4 sm:p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
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

            {/* Add Virality Score component */}
            <ViralityScore post={post} category={category} />
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <SmartSuggestions 
            post={post} 
            category={category} 
            onSuggestionClick={handleSuggestionClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default PostEnhancer;
