import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import WhopBanner from "@/components/layout/WhopBanner";
import WhopTrustPopup from "@/components/whop/WhopTrustPopup";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/Footer";

// Lazy load non-critical sections
const VideoShowcase = lazy(() => import("@/components/landing/VideoShowcase"));
const ComparisonSection = lazy(() => import("@/components/landing/ComparisonSection"));
const EnhancedPostsShowcase = lazy(() => import("@/components/landing/EnhancedPostsShowcase"));
const TemplatesSection = lazy(() => import("@/components/post-enhancer/TemplatesSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const AboutFounderSection = lazy(() => import("@/components/landing/AboutFounderSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));

// Optimized loading component
const SectionLoader = React.memo(() => (
  <div className="py-12 flex justify-center">
    <div className="animate-pulse h-32 w-full max-w-4xl bg-muted/20 rounded-lg"></div>
  </div>
));

// Custom hook for user profile with caching
const useUserProfile = (userId: string | undefined) => {
  const [profileData, setProfileData] = useState({ username: "", avatarUrl: "" });

  React.useEffect(() => {
    if (!userId) {
      setProfileData({ username: "", avatarUrl: "" });
      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", userId)
          .single();

        if (error || !isMounted) return;
        
        if (data) {
          setProfileData({
            username: data.username || "",
            avatarUrl: data.avatar_url || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return profileData;
};

const OptimizedIndex: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session, user } = useAuthContext();
  const { username, avatarUrl } = useUserProfile(user?.id);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProTemplatesClick = useCallback(() => {
    if (!session) {
      toast({
        title: "Pro Templates",
        description: "Sign in to access premium templates",
        variant: "default",
      });
      return;
    }
    
    navigate("/pricing");
  }, [session, toast, navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
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
  }, [toast]);

  const handleSetPricing = useCallback(() => navigate("/pricing"), [navigate]);
  const handleSetMobileMenu = useCallback((open: boolean) => setMobileMenuOpen(open), []);

  const navigationProps = useMemo(() => ({
    session,
    username,
    avatarUrl,
    handleSignOut,
    setShowPricing: handleSetPricing,
    setMobileMenuOpen: handleSetMobileMenu,
    mobileMenuOpen,
  }), [session, username, avatarUrl, handleSignOut, handleSetPricing, handleSetMobileMenu, mobileMenuOpen]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <WhopBanner />
      <Navigation {...navigationProps} />

      <main className="w-full">
        <HeroSection isAuthenticated={!!session} username={username} />
        
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
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

export default React.memo(OptimizedIndex);