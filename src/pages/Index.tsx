import { useState, useEffect, Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import WhopBanner from "@/components/layout/WhopBanner";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/Footer";
import { PrefetchResources } from "@/components/ui/prefetch-resources";

// Lazy load heavy components for better performance
const VideoShowcase = lazy(() => import("@/components/landing/VideoShowcase"));
const ComparisonSection = lazy(() => import("@/components/landing/ComparisonSection"));
const EnhancedPostsShowcase = lazy(() => import("@/components/landing/EnhancedPostsShowcase"));
const AboutSection = lazy(() => import("@/components/landing/AboutSection"));
const ComingSoonSection = lazy(() => import("@/components/landing/ComingSoonSection"));
const TemplatesSection = lazy(() => import("@/components/post-enhancer/TemplatesSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const AboutFounderSection = lazy(() => import("@/components/landing/AboutFounderSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const WhopTrustPopup = lazy(() => import("@/components/whop/WhopTrustPopup"));

// Loading component for sections
const SectionLoader = memo(() => (
  <div className="py-12 flex items-center justify-center">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-200 h-3 w-3"></div>
      <div className="rounded-full bg-gray-300 h-3 w-3"></div>
      <div className="rounded-full bg-gray-200 h-3 w-3"></div>
    </div>
  </div>
));

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
    
    navigate("/pricing");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <PrefetchResources />
      <WhopBanner />
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={() => navigate("/pricing")}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main role="main">
        <HeroSection isAuthenticated={!!session} username={username} />
        
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <Suspense fallback={<SectionLoader />}>
            <VideoShowcase />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <HowItWorksSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <ComparisonSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <EnhancedPostsShowcase />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <TemplatesSection handleProTemplatesClick={handleProTemplatesClick} />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <AboutFounderSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <ComingSoonSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>
        </div>
      </main>

      <Footer />
      
      <Suspense fallback={<div />}>
        <WhopTrustPopup />
      </Suspense>
    </div>
  );
};

export default Index;
