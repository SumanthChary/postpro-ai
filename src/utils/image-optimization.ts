// Image optimization utilities for better performance

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (baseUrl: string, sizes: number[]): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: { maxWidth: string; size: string }[]): string => {
  return breakpoints
    .map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`)
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'high'): void => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', priority);
  document.head.appendChild(link);
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImage = (imgElement: HTMLImageElement): IntersectionObserver | null => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    if (imgElement.dataset.src) {
      imgElement.src = imgElement.dataset.src;
    }
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  observer.observe(imgElement);
  return observer;
};

/**
 * Convert image to WebP format (client-side)
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Get optimized image URL with format and size
 */
export const getOptimizedImageUrl = (
  baseUrl: string,
  options?: {
    width?: number;
    height?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
    quality?: number;
  }
): string => {
  const params = new URLSearchParams();
  
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  if (options?.format) params.append('fm', options.format);
  if (options?.quality) params.append('q', options.quality.toString());
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
