import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import VideoShowcase from "@/components/landing/VideoShowcase";
import ComparisonSection from "@/components/landing/ComparisonSection";
import EnhancedPostsShowcase from "@/components/landing/EnhancedPostsShowcase";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ComingSoonSection from "@/components/landing/ComingSoonSection";
import TemplatesSection from "@/components/post-enhancer/TemplatesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AboutFounderSection from "@/components/landing/AboutFounderSection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth listener
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

    // Then check for session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
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

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }
      
      if (data) {
        setUsername(data.username || "User");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error: any) {
      console.error("Error in fetchUserProfile:", error.message);
    }
  };

  const handleProTemplatesClick = () => {
    if (!session) {
      toast({
        title: "Pro Templates",
        description: "Sign in to access premium templates",
        variant: "default",
      });
      return;
    }
    
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
      setSession(null);
      setUsername("");
      setAvatarUrl("");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={setShowPricing}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main>
        <HeroSection />
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
          <VideoShowcase />
          <HowItWorksSection />
          <ComparisonSection />
          <EnhancedPostsShowcase />
          <TemplatesSection handleProTemplatesClick={handleProTemplatesClick} />
          <AboutFounderSection />
          <AboutSection />
          <ComingSoonSection />
          <Testimonials />
          <FAQ />
        </div>
      </main>

      <Footer />

      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl max-h-[95vh] overflow-hidden bg-white p-0 rounded-lg">
          <div className="overflow-y-auto max-h-[95vh]">
            <PricingSection />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
