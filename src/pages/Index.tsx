import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import WhopBanner from "@/components/layout/WhopBanner";
import WhopTrustPopup from "@/components/whop/WhopTrustPopup";
import { useToast } from "@/hooks/use-toast";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/Footer";
import SkipToContent from "@/components/ui/skip-to-content";

// Lazy load non-critical sections
const VideoShowcase = lazy(() => import("@/components/landing/VideoShowcase"));
const ComparisonSection = lazy(() => import("@/components/landing/ComparisonSection"));
const EnhancedPostsShowcase = lazy(() => import("@/components/landing/EnhancedPostsShowcase"));
const SocialProofBar = lazy(() => import("@/components/landing/SocialProofBar"));
const ProblemStatement = lazy(() => import("@/components/landing/ProblemStatement"));
const ComparisonTable = lazy(() => import("@/components/landing/ComparisonTable"));
const TemplatesSection = lazy(() => import("@/components/post-enhancer/TemplatesSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ExpectationsSection = lazy(() => import("@/components/landing/ExpectationsSection"));
const AboutFounderSection = lazy(() => import("@/components/landing/AboutFounderSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));

// Loading component for sections
const SectionLoader = () => (
  <div className="py-12 flex justify-center">
    <div className="animate-pulse h-32 w-full max-w-4xl bg-gray-200 rounded-lg"></div>
  </div>
);

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { processReferral } = useReferralTracking();

  useEffect(() => {
    // First set up the auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        // Process referral when user signs up/in
        processReferral(session.user.id, 'free');
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
        setUsername(data.username || "");
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
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <SkipToContent />
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

      <main id="main-content" className="w-full">
        <HeroSection isAuthenticated={!!session} username={username} />
        
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <Suspense fallback={<SectionLoader />}>
            <SocialProofBar />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ProblemStatement />
          </Suspense>
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
            <ComparisonTable />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ExpectationsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <AboutFounderSection />
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
      
      <WhopTrustPopup />
    </div>
  );
};

export default Index;
