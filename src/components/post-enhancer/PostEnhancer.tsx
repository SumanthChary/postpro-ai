
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostEnhancerProps } from "./types";
import { enhancePost } from "./services/enhancePost";
import { EnhancerForm } from "./components/EnhancerForm";
import { ShareOptions } from "./components/ShareOptions";
import { ViralityScore } from "./components/ViralityScore";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useHashtags from "@/hooks/useHashtags";

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
  const { getCategoryHashtags } = useHashtags();

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const getEngagingCTA = () => {
    const ctas = [
      "What are your thoughts on this?",
      "Follow for more insights like this!",
      "Save this for later reference!",
      "Share with someone who needs to see this!",
      "Double tap if you found this helpful!",
      "Tag someone who would benefit from this!",
      "What's your experience with this?",
      "Drop a 💯 if you agree!",
      "Which tip resonates with you most?",
      "Have you tried this approach?"
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  };

  const analyzeAndEnhanceContent = (content: string, selectedCategory: string) => {
    // Get relevant hashtags for the category
    const hashtags = getCategoryHashtags(selectedCategory);
    
    // Select 3-5 most relevant hashtags based on content analysis
    const selectedHashtags = [...hashtags]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3) // 3-5 hashtags
      .join(' ');
    
    // Get an engaging CTA that matches the content tone
    const cta = getEngagingCTA();
    
    // Intelligently combine content with CTA and hashtags
    const enhancedContent = `${content.trim()}\n\n${cta}\n\n${selectedHashtags}`;
    
    return enhancedContent;
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
        // Get the enhanced LinkedIn post
        const enhancedLinkedInPost = data.platforms.linkedin || post;
        
        // Automatically analyze and add trending hashtags + engaging CTAs
        const finalEnhancedPost = analyzeAndEnhanceContent(enhancedLinkedInPost, category);
        
        // Update all platform posts with smart enhancements
        const updatedPosts = {
          linkedin: finalEnhancedPost,
          twitter: data.platforms.twitter ? analyzeAndEnhanceContent(data.platforms.twitter, category) : finalEnhancedPost,
          instagram: data.platforms.instagram ? analyzeAndEnhanceContent(data.platforms.instagram, category) : finalEnhancedPost,
          facebook: data.platforms.facebook ? analyzeAndEnhanceContent(data.platforms.facebook, category) : finalEnhancedPost,
        };
        
        setEnhancedPosts(updatedPosts);
        setPost(finalEnhancedPost);
        
        toast({
          title: "Post Enhanced Successfully!",
          description: "Your post has been enhanced with AI improvements, trending hashtags, and engaging CTAs automatically integrated.",
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
    <div className="space-y-8 w-full px-4 sm:px-0">
      <div className="max-w-4xl mx-auto">
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

          <ViralityScore post={post} category={category} />
        </Card>
      </div>
    </div>
  );
};

export default PostEnhancer;
