// Critical CSS that loads immediately for performance
import CriticalCSS from '@/components/ui/critical-css';
import { initPerformanceOptimizations } from "@/utils/aggressive-performance";

// Initialize performance optimizations immediately
initPerformanceOptimizations();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CriticalCSS />
    <App />
  </StrictMode>,
);
