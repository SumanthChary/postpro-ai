
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUnlimitedAccess } from "@/hooks/useUnlimitedAccess";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import PreloadResources from "@/components/ui/preload-resources";
import { AuthProvider } from "@/contexts/AuthContext";
import { initializePerformanceOptimizations } from "@/utils/performance-optimizations";

// Lazy load components for better performance
const FloatingChatButton = lazy(() => import("./components/chatbot/FloatingChatButton"));
const PageSkeleton = lazy(() => import("@/components/ui/page-skeleton"));
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Enhance = lazy(() => import("./pages/Enhance"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const Affiliate = lazy(() => import("./pages/Affiliate"));
const Contact = lazy(() => import("./pages/Contact"));
const Support = lazy(() => import("./pages/Support"));
const WhopApp = lazy(() => import("./pages/WhopApp"));
const WhopCallback = lazy(() => import("./pages/WhopCallback"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const FAQPage = lazy(() => import("./pages/FAQ"));


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });
  
  // Enable unlimited access
  useUnlimitedAccess();
  // Initialize referral tracking
  useReferralTracking();
  
  // Initialize performance optimizations
  useEffect(() => {
    initializePerformanceOptimizations();
  }, []);
  
  return (
    <StrictMode>
      <PreloadResources />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <Sonner />
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <BrowserRouter basename="/">
                <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/enhance" element={<Enhance />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blog/:id" element={<BlogArticle />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/affiliate" element={<Affiliate />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/whop-app" element={<WhopApp />} />
                  <Route path="/whop/callback" element={<WhopCallback />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
                </Suspense>
                <Suspense fallback={null}>
                  <FloatingChatButton />
                </Suspense>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
