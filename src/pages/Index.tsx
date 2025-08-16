import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Layout Components
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";
import WhopBanner from "@/components/layout/WhopBanner";
import WhopTrustPopup from "@/components/whop/WhopTrustPopup";

// New Professional Landing Page Components
import HeroSectionNew from "@/components/landing/HeroSectionNew";
import ResultsShowcase from "@/components/landing/ResultsShowcase";
import PainPointSection from "@/components/landing/PainPointSection";
import SolutionDemo from "@/components/landing/SolutionDemo";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import SocialProofWall from "@/components/landing/SocialProofWall";
import PricingOptimized from "@/components/landing/PricingOptimized";
import FinalCTA from "@/components/landing/FinalCTA";

// Additional Components
import VideoShowcase from "@/components/landing/VideoShowcase";
import PricingLandingSection from "@/components/landing/PricingLandingSection";
import FAQ from "@/components/FAQ";

const Index = () => {
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
    
      navigate("/subscription");
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
    <div className="min-h-screen bg-background">
      <WhopBanner />
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={() => {}}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
      
      {/* New Professional Landing Page */}
      <main>
        <HeroSectionNew isAuthenticated={!!session} username={username} />
        <ResultsShowcase />
        <PainPointSection />
        <SolutionDemo />
        <FeaturesGrid />
        <VideoShowcase />
        <SocialProofWall />
        <PricingLandingSection />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <WhopTrustPopup />
    </div>
  );
};

export default Index;
