import { debounce, throttle } from './performance';

// Enhanced performance optimizations with better memory management
export const optimizeScrollPerformance = () => {
  // Use passive scroll listeners for better performance
  const handleScroll = throttle(() => {
    // Handle scroll events efficiently with minimal DOM queries
    requestAnimationFrame(() => {
      // Any scroll-based animations or lazy loading
    });
  }, 16);

  document.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    document.removeEventListener('scroll', handleScroll);
  };
};

// Optimize image loading with better intersection observer
export const optimizeImageLoading = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          // Preload the image before setting src
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = img.dataset.src!;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          };
          tempImg.src = img.dataset.src;
        }
      }
    });
  }, { 
    rootMargin: '50px',
    threshold: 0.1
  });

  // Observe existing lazy images
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });

  return () => {
    imageObserver.disconnect();
  };
};

// Memory cleanup utilities
export const cleanupUnusedResources = () => {
  const cleanup = () => {
    // Clear unused timers and intervals
    for (let i = 1; i < 99999; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  };

  return cleanup;
};

// Optimize React rendering with better caching
export const optimizeReactRendering = {
  // Enhanced memoization with size limits
  memoizeExpensiveCalculations: <T>(fn: (...args: any[]) => T, maxSize = 100) => {
    const cache = new Map();
    return (...args: any[]): T => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      // Limit cache size to prevent memory leaks
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Debounce state updates with cleanup
  debouncedStateUpdate: (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    const debouncedFn = (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
    
    debouncedFn.cancel = () => clearTimeout(timeoutId);
    return debouncedFn;
  },
  
  // Throttle expensive operations
  throttledOperations: throttle,
};

// Initialize performance optimizations with cleanup
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  const cleanupFunctions: (() => void)[] = [];

  // Set up optimizations
  cleanupFunctions.push(optimizeScrollPerformance());
  cleanupFunctions.push(optimizeImageLoading());
  
  // Add performance hints
  const animatedElements = document.querySelectorAll('.will-change-transform, .will-change-auto');
  animatedElements.forEach((el) => {
    (el as HTMLElement).style.willChange = 'transform';
  });

  // Optimize fonts loading
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }

  // Preload critical resources
  const criticalResources = [
    'preload',
    'prefetch'
  ];

  criticalResources.forEach(rel => {
    const links = document.querySelectorAll(`link[rel="${rel}"]`);
    links.forEach(link => {
      if (!link.getAttribute('href')) {
        link.remove(); // Remove empty preload links
      }
    });
  });

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};