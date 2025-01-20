import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Enhance from "./pages/Enhance";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/enhance" element={<Enhance />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);

export default App;