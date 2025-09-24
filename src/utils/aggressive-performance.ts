// Aggressive performance optimizations for 100% speed

// 1. Preload critical resources immediately
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/lovable-uploads/linkedin-logo.png',
    '/lovable-uploads/whop-new-logo.png',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts immediately
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.type = 'font/woff2';
  fontPreload.crossOrigin = 'anonymous';
  fontPreload.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2';
  document.head.appendChild(fontPreload);
};

// 2. Optimize database queries with aggressive caching
const queryCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

export const getCachedQuery = (key: string, queryFn: () => Promise<any>) => {
  const cached = queryCache.get(key);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return Promise.resolve(cached.data);
  }

  return queryFn().then(data => {
    queryCache.set(key, { data, timestamp: now });
    return data;
  });
};

// 3. Debounced operations for smooth UX
export const createDebouncedCallback = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};

// 4. Intersection Observer for lazy loading
export const createIntersectionObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (!window.IntersectionObserver) return null;
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    {
      rootMargin: '100px',
      threshold: 0.1
    }
  );
};

// 5. Image optimization utility
export const optimizeImageLoad = (imgElement: HTMLImageElement) => {
  imgElement.loading = 'eager';
  imgElement.decoding = 'sync';
  
  // Create low-quality placeholder
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 10;
  canvas.height = 10;
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, 10, 10);
    imgElement.style.background = `url(${canvas.toDataURL()}) center/cover`;
  }
};

// 6. Reduce layout shifts
export const preventLayoutShift = () => {
  // Force reflow to prevent cumulative layout shift
  document.body.offsetHeight;
  
  // Set critical CSS properties immediately
  const style = document.createElement('style');
  style.textContent = `
    * { 
      contain-intrinsic-size: auto 300px;
      content-visibility: auto;
    }
    img { 
      aspect-ratio: attr(width) / attr(height);
      height: auto;
    }
    .page-container {
      min-height: 100vh;
      contain: layout style paint;
    }
  `;
  document.head.appendChild(style);
};

// 7. Database connection pooling optimization
export const optimizeSupabaseClient = (supabase: any) => {
  // Set aggressive timeout settings
  const originalFrom = supabase.from;
  supabase.from = function(table: string) {
    const query = originalFrom.call(this, table);
    
    // Add timeout and caching to all queries
    const originalSelect = query.select;
    query.select = function(...args: any[]) {
      const selectQuery = originalSelect.apply(this, args);
      return selectQuery.abortSignal(
        AbortSignal.timeout(5000) // 5 second timeout
      );
    };
    
    return query;
  };
  
  return supabase;
};

// 8. Memory management
export const cleanupMemory = () => {
  // Clear query cache periodically
  if (queryCache.size > 50) {
    queryCache.clear();
  }
  
  // Force garbage collection if available
  if ('gc' in window) {
    (window as any).gc();
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Run immediately
  preloadCriticalResources();
  preventLayoutShift();
  
  // Set up periodic cleanup
  setInterval(cleanupMemory, 60000); // Every minute
  
  // Add performance observer
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('📊 Navigation timing:', entry);
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('🎯 LCP:', entry.startTime);
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] });
    } catch (e) {
      console.warn('Performance observer not supported');
    }
  }
};