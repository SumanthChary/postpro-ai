
import { StrictMode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUnlimitedAccess } from "@/hooks/useUnlimitedAccess";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import FloatingChatButton from "./components/chatbot/FloatingChatButton";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Enhance from "./pages/Enhance";
import Features from "./pages/Features";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import BlogArticle from "./pages/BlogArticle";
import Chatbot from "./pages/Chatbot";
import Affiliate from "./pages/Affiliate";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import WhopApp from "./pages/WhopApp";
import WhopCallback from "./pages/WhopCallback";

function App() {
  const queryClient = new QueryClient();
  // Enable unlimited access
  useUnlimitedAccess();
  // Initialize referral tracking
  useReferralTracking();
  
  return (
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <Sonner />
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/enhance" element={<Enhance />} />
                <Route path="/features" element={<Features />} />
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
              </Routes>
              <FloatingChatButton />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
