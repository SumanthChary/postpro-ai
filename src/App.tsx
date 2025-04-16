import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { CurrencyProvider } from "./contexts/CurrencyContext";
import ScheduleShareButton from "./components/ScheduleShareButton"; // Ensure the correct path to the component

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CurrencyProvider>
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
                </Routes>
                <FloatingChatButton />
                <ScheduleShareButton /> {/* Add the Schedule & Auto-Share button */}
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
