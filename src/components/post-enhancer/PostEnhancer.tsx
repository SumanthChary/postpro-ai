
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PostEnhancerProps } from "./types";
import { enhancePost } from "./services/enhancePost";
import { EnhancerForm } from "./components/EnhancerForm";
import { ShareOptions } from "./components/ShareOptions";

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}: PostEnhancerProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const handleEnhancePost = async () => {
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
    } catch (error: any) {
      console.error('Error enhancing post:', error);
      toast({
        title: "Enhancement Failed",
        description: error.message || "There was an error enhancing your post. Please try again.",
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
    <div className="space-y-8 w-full px-4 sm:px-0">
      <Card className="max-w-2xl mx-auto p-4 sm:p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
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
      </Card>
    </div>
  );
};

export default PostEnhancer;
