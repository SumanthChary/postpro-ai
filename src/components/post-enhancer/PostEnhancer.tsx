
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

  // Debug logs to monitor state changes
  useEffect(() => {
    console.log("PostEnhancer rendered with post:", post);
    console.log("PostEnhancer rendered with category:", category);
  }, [post, category]);

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

  const handlePostChange = (newPost: string) => {
    console.log("PostEnhancer: post changed to:", newPost);
    setPost(newPost);
  };

  const handleCategoryChange = (newCategory: string) => {
    console.log("PostEnhancer: category changed to:", newCategory);
    setCategory(newCategory);
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
              onPostChange={handlePostChange}
              onCategoryChange={handleCategoryChange}
              onReset={handleReset}
              onEnhance={handleEnhancePost}
            />
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PostEnhancer;
