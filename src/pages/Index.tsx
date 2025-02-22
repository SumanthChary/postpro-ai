
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import SupportSection from "@/components/post-enhancer/SupportSection";
import TemplatesSection from "@/components/post-enhancer/TemplatesSection";
import VideoShowcase from "@/components/landing/VideoShowcase";
import ComparisonSection from "@/components/landing/ComparisonSection";
import EnhancedPostsShowcase from "@/components/landing/EnhancedPostsShowcase";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

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
          handleEnhancePost={() => {}}
        />

        <VideoShowcase />
        <ComparisonSection />
        <EnhancedPostsShowcase />
        
        <SupportSection />
        <TemplatesSection handleProTemplatesClick={handleProTemplatesClick} />
        <Testimonials />
        <FAQ />

        {/* About Section */}
        <section className="py-16 bg-gradient-to-r from-light-lavender to-white rounded-2xl shadow-lg my-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
              About Our Platform
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-electric-purple">Our Mission</h3>
                <p className="text-custom-text leading-relaxed">
                  We're dedicated to empowering professionals and businesses to create engaging, 
                  impactful social media content through innovative AI technology.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-electric-purple">Why Choose Us</h3>
                <ul className="space-y-2 text-custom-text">
                  <li className="flex items-center gap-2">
                    <span className="text-bright-teal">✓</span>
                    Advanced AI-powered content enhancement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-bright-teal">✓</span>
                    Professional templates for every industry
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-bright-teal">✓</span>
                    Time-saving automation tools
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16 bg-gradient-to-r from-electric-purple to-bright-teal rounded-2xl shadow-lg my-16">
          <div className="max-w-4xl mx-auto px-6 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-8">
              Coming Soon
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">AI Image Generator</h3>
                <p className="text-sm opacity-90">
                  Create stunning visuals for your posts with our AI-powered image generator.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
                <p className="text-sm opacity-90">
                  Track your content performance and engagement metrics in real-time.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-sm opacity-90">
                  Work together with your team to create and manage content efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>
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
