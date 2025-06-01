
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

  const cleanAndEnhanceContent = (content: string, selectedCategory: string) => {
    // Remove asterisk symbols and clean the content
    let cleanedContent = content
      .replace(/\*/g, '') // Remove all asterisk symbols
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Check if content already has hashtags or CTAs to avoid duplicates
    const hasHashtags = cleanedContent.includes('#');
    const hasCommonCTAs = [
      'what are your thoughts',
      'follow for more',
      'save this',
      'share with someone',
      'double tap',
      'tag someone',
      'drop a',
      'which tip'
    ].some(phrase => cleanedContent.toLowerCase().includes(phrase));

    // Only add hashtags and CTA if they don't already exist
    if (!hasHashtags && !hasCommonCTAs) {
      const hashtags = getCategoryHashtags(selectedCategory);
      const selectedHashtags = [...hashtags]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 3) // 3-5 hashtags
        .join(' ');
      
      const cta = getEngagingCTA();
      cleanedContent = `${cleanedContent}\n\n${cta}\n\n${selectedHashtags}`;
    }
    
    return cleanedContent;
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
        // Get the enhanced LinkedIn post and clean it
        const enhancedLinkedInPost = data.platforms.linkedin || post;
        const finalEnhancedPost = cleanAndEnhanceContent(enhancedLinkedInPost, category);
        
        // Clean and enhance all platform posts
        const updatedPosts = {
          linkedin: finalEnhancedPost,
          twitter: data.platforms.twitter ? cleanAndEnhanceContent(data.platforms.twitter, category) : finalEnhancedPost,
          instagram: data.platforms.instagram ? cleanAndEnhanceContent(data.platforms.instagram, category) : finalEnhancedPost,
          facebook: data.platforms.facebook ? cleanAndEnhanceContent(data.platforms.facebook, category) : finalEnhancedPost,
        };
        
        setEnhancedPosts(updatedPosts);
        setPost(finalEnhancedPost);
        
        toast({
          title: "Post Enhanced Successfully!",
          description: "Your post has been enhanced with clean formatting, trending hashtags, and engaging CTAs.",
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

  const handlePaymentRedirect = () => {
    navigate("/payment");
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

        {/* Trust Badges - Payment Icons - Separate Section */}
        <Card className="p-4 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg border">
            <span className="text-sm text-gray-600 font-medium">Secure payments via:</span>
            <button 
              onClick={handlePaymentRedirect}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <img 
                src="/lovable-uploads/14ae3ece-1f14-4d00-943b-e0b05db11ddd.png" 
                alt="PayPal" 
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-blue-600">PayPal</span>
            </button>
            <button 
              onClick={handlePaymentRedirect}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <img 
                src="/lovable-uploads/ee9548c4-72d9-4354-adff-ef4509dfb8e3.png" 
                alt="Razorpay" 
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-blue-600">Razorpay</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostEnhancer;
