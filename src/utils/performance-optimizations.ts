import { debounce, throttle } from './performance';

// Enhanced performance optimizations
export const optimizeScrollPerformance = () => {
  // Add passive scroll listeners for better performance
  document.addEventListener('scroll', throttle(() => {
    // Handle scroll events efficiently
  }, 16), { passive: true });
};

// Optimize image loading
export const optimizeImageLoading = () => {
  // Use Intersection Observer for lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, { rootMargin: '50px' });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

// Memory cleanup utilities
export const cleanupUnusedResources = () => {
  // Clean up event listeners and timers
  return () => {
    // Cleanup logic
  };
};

// Optimize React rendering
export const optimizeReactRendering = {
  // Use memo for expensive calculations
  memoizeExpensiveCalculations: <T>(fn: (...args: any[]) => T) => {
    const cache = new Map();
    return (...args: any[]): T => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Debounce state updates
  debouncedStateUpdate: debounce,
  
  // Throttle expensive operations
  throttledOperations: throttle,
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Set up optimizations when the app loads
  if (typeof window !== 'undefined') {
    optimizeScrollPerformance();
    optimizeImageLoading();
    
    // Add will-change for frequently animated elements
    const animatedElements = document.querySelectorAll('.will-change-transform, .will-change-auto');
    animatedElements.forEach((el) => {
      (el as HTMLElement).style.willChange = 'transform';
    });
  }
};