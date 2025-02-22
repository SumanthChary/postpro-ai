
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PostEnhancerProps } from "./types";
import { enhancePost } from "./services/enhancePost";
import { EnhancerForm } from "./components/EnhancerForm";

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
}: PostEnhancerProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
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
      const data = await enhancePost(post, category);
      console.log('Enhanced post response:', data);
      
      if (data.platforms.linkedin) {
        setPost(data.platforms.linkedin);
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
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <EnhancerForm
          post={post}
          category={category}
          isEnhancing={isEnhancing}
          onPostChange={setPost}
          onCategoryChange={setCategory}
          onReset={handleReset}
          onEnhance={handleEnhancePost}
        />
      </Card>
    </div>
  );
};

export default PostEnhancer;
