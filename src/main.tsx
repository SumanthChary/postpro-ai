import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/performance-monitor'
import { registerServiceWorker } from './utils/register-sw'

// Performance optimization: ensure the root element is available
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Register service worker for caching
registerServiceWorker();

// Use concurrent features for better performance
createRoot(rootElement).render(<App />);
