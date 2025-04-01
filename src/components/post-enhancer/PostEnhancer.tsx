
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PostEnhancerProps } from "./types";
import { enhancePost } from "./services/enhancePost";
import { EnhancerForm } from "./components/EnhancerForm";
import Footer from "@/components/Footer";
import Navigation from "@/components/layout/Navigation";
import { useNavigate } from "react-router-dom";

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
}: PostEnhancerProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock session for navigation component
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("Guest");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Check local storage for session data
  useEffect(() => {
    const storedSession = localStorage.getItem("sb-session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  const handleSignOut = async () => {
    // Mock sign out
    localStorage.removeItem("sb-session");
    setSession(null);
    navigate("/auth");
    return Promise.resolve();
  };

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
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={setShowPricing}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
      
      <div className="flex-grow py-20 px-4 bg-gradient-to-b from-white to-light-lavender">
        <div className="space-y-8 w-full px-4 sm:px-0 max-w-4xl mx-auto">
          <Card className="relative z-10 mx-auto p-6 sm:p-7 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-lg">
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
          
          {/* Product Hunt Section */}
          <div className="mx-auto flex flex-col items-center space-y-4 py-6 sm:py-8">
            <a 
              href="https://www.producthunt.com/posts/postproai?utm_source=other&utm_medium=social" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-electric-purple transition-colors"
            >
              Check us out on Product Hunt!
            </a>
            <a 
              href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center transition-transform hover:scale-105 duration-300"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=903202&theme=dark&t=1740317554845" 
                alt="PostProAI - Smart AI-Powered Post Enhancement | Product Hunt" 
                className="max-w-[250px] h-[54px] w-full"
                width="250"
                height="54"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PostEnhancer;
