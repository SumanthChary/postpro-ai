import React from 'react';

// Performance utilities for optimizing the application

// Debounce function to limit function calls
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function calls
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload images for better performance
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  return Promise.all(promises);
};

// Optimize bundle size by lazy loading components
export const lazyLoad = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

// Memory cleanup utility
export const cleanup = (cleanup: () => void) => {
  return () => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  };
};

// Request Idle Callback polyfill for better performance
export const requestIdleCallback = 
  window.requestIdleCallback || 
  ((cb: IdleRequestCallback, options?: IdleRequestOptions) => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  });

export const cancelIdleCallback = 
  window.cancelIdleCallback || 
  ((id: number) => {
    clearTimeout(id);
  });

// Batch DOM updates for better performance
export const batchDOMUpdates = (callback: () => void) => {
  requestIdleCallback(callback);
};

// Optimize scroll performance
export const optimizeScroll = (element: HTMLElement, callback: () => void) => {
  let ticking = false;
  
  const update = () => {
    callback();
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  
  element.addEventListener('scroll', requestTick, { passive: true });
  
  return () => {
    element.removeEventListener('scroll', requestTick);
  };
};

// Image intersection observer for lazy loading
export const createImageIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {},
    };
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options,
  });
};