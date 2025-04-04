
import { useEffect } from "react";

interface ScriptProps {
  src: string;
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload";
  onLoad?: () => void;
}

const Script = ({ src, strategy = "afterInteractive", onLoad }: ScriptProps) => {
  useEffect(() => {
    if (strategy === "beforeInteractive") {
      // This strategy requires the script to be loaded before the React app
      // Since we're using React, we can't actually do this, so we'll just load it immediately
      loadScript();
    } else if (strategy === "afterInteractive") {
      // Load immediately after component mounts
      loadScript();
    } else if (strategy === "lazyOnload") {
      // Load when browser is idle
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadScript);
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(loadScript, 500);
      }
    }

    function loadScript() {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        
        if (onLoad) {
          script.onload = onLoad;
        }
        
        document.body.appendChild(script);
      } else if (onLoad) {
        // If script is already loaded and we have onLoad callback
        onLoad();
      }
    }
    
    // Cleanup
    return () => {
      // We don't remove scripts as they might be used by other components
    };
  }, [src, strategy, onLoad]);

  return null; // This component doesn't render anything
};

export default Script;
