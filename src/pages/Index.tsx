
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import SupportSection from "@/components/post-enhancer/SupportSection";
import TemplatesSection from "@/components/post-enhancer/TemplatesSection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import useHashtags from "@/hooks/useHashtags";

const Index = () => {
  const [post, setPost] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState("business");
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getCategoryHashtags } = useHashtags();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUsername("");
        setAvatarUrl("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUsername(data.username || "User");
      setAvatarUrl(data.avatar_url || "");
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleEnhancePost = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enhance your posts",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!post.trim()) {
      toast({
        title: "Please enter some text",
        description: "Your post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedHashtags = getCategoryHashtags(category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      const enhancedPost = `${post}\n\n${selectedHashtags.join(" ")}`;
      
      setPost(enhancedPost);
      toast({
        title: "Post Enhanced!",
        description: "Your post has been enhanced with trending hashtags for better engagement",
      });
    } catch (error: any) {
      toast({
        title: "Enhancement failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handlePostToTwitter = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post to Twitter",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!post.trim()) {
      toast({
        title: "Please enter some text",
        description: "Your post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/post-to-twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet: post }),
      });

      if (!response.ok) {
        throw new Error('Failed to post to Twitter');
      }

      toast({
        title: "Success!",
        description: "Your post has been shared on Twitter",
      });
    } catch (error: any) {
      toast({
        title: "Posting failed",
        description: "Failed to post to Twitter. Please try again later.",
        variant: "destructive",
      });
      console.error("Error posting to Twitter:", error);
    }
  };

  const handleProTemplatesClick = () => {
    setShowPricing(true);
    toast({
      title: "Pro Templates Locked",
      description: "Subscribe to our Pro Plan to access premium templates",
      variant: "default",
    });
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg">
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={setShowPricing}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-6 tracking-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Social Media Presence
            </span>
          </h1>
          <p className="text-xl text-custom-text mb-8 leading-relaxed font-opensans">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        <PostEnhancer
          post={post}
          setPost={setPost}
          category={category}
          setCategory={setCategory}
          handleEnhancePost={handleEnhancePost}
          handlePostToTwitter={handlePostToTwitter}
        />

        <SupportSection />

        <TemplatesSection handleProTemplatesClick={handleProTemplatesClick} />

        <Testimonials />

        <FAQ />
      </main>

      <Footer />

      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-extrabold text-center mb-4">
              Choose Your Perfect Plan
            </DialogTitle>
          </DialogHeader>
          <PricingSection />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
