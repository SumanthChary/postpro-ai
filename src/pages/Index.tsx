
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import VideoShowcase from "@/components/landing/VideoShowcase";
import ComparisonSection from "@/components/landing/ComparisonSection";
import EnhancedPostsShowcase from "@/components/landing/EnhancedPostsShowcase";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ComingSoonSection from "@/components/landing/ComingSoonSection";
import SupportSection from "@/components/post-enhancer/SupportSection";
import TemplatesSection from "@/components/post-enhancer/TemplatesSection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Add page load animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
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

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
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

  // Track user scroll for optimization
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
            scrollPosition < sectionTop + sectionHeight - window.innerHeight / 2) {
          // Could be used for analytics or UX improvements
          // console.log('Viewing section:', section.id || 'unnamed section');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-custom-bg ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={setShowPricing}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="pt-20">
        <HeroSection />
        
        <ScrollReveal>
          <VideoShowcase />
        </ScrollReveal>
        
        <ScrollReveal>
          <ComparisonSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <EnhancedPostsShowcase />
        </ScrollReveal>
        
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <SupportSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <TemplatesSection handleProTemplatesClick={handleProTemplatesClick} />
        </ScrollReveal>
        
        <ScrollReveal>
          <ComingSoonSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
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
      
      {/* Floating CTA - Appears after scrolling */}
      <div id="floating-cta" className="fixed bottom-6 right-6 transform translate-y-20 opacity-0 transition-all duration-500 z-30">
        <button 
          onClick={() => navigate("/enhance")} 
          className="bg-black text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-black/80 transition-colors"
        >
          <span className="hidden md:inline">Try PostPro AI</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      
      {/* Script to show/hide floating CTA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const floatingCTA = document.getElementById('floating-cta');
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              // Show after scrolling down 300px
              if (scrollTop > 300) {
                floatingCTA.style.transform = 'translateY(0)';
                floatingCTA.style.opacity = '1';
              } else {
                floatingCTA.style.transform = 'translateY(20px)';
                floatingCTA.style.opacity = '0';
              }
              
              lastScrollTop = scrollTop;
            });
          });
        `
      }} />
    </div>
  );
};

export default Index;
