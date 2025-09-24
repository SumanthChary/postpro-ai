import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpeedOptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export const SpeedOptimizedImage: React.FC<SpeedOptimizedImageProps> = ({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  priority = false,
  quality = 'high',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized src based on quality
  const getOptimizedSrc = (originalSrc: string, targetQuality: string) => {
    if (originalSrc.includes('supabase.co')) {
      const url = new URL(originalSrc);
      switch (targetQuality) {
        case 'low':
          url.searchParams.set('width', '400');
          url.searchParams.set('quality', '60');
          break;
        case 'medium':
          url.searchParams.set('width', '800');
          url.searchParams.set('quality', '75');
          break;
        case 'high':
        default:
          url.searchParams.set('width', '1200');
          url.searchParams.set('quality', '90');
          break;
      }
      return url.toString();
    }
    return originalSrc;
  };

  // Preload image
  const preloadImage = (imageSrc: string) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(imageSrc);
        setIsLoaded(true);
        resolve();
      };
      img.onerror = () => {
        setHasError(true);
        reject();
      };
      img.src = imageSrc;
      
      // Critical performance optimizations
      img.loading = 'eager';
      img.decoding = priority ? 'sync' : 'async';
    });
  };

  useEffect(() => {
    if (priority) {
      // Load immediately for priority images
      const optimizedSrc = getOptimizedSrc(src, quality);
      preloadImage(optimizedSrc);
      return;
    }

    // Lazy load for non-priority images
    if (imgRef.current && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !currentSrc) {
              const optimizedSrc = getOptimizedSrc(src, quality);
              preloadImage(optimizedSrc);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      observerRef.current.observe(imgRef.current);
    } else {
      // Fallback for browsers without IntersectionObserver
      const optimizedSrc = getOptimizedSrc(src, quality);
      preloadImage(optimizedSrc);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, quality]);

  // Generate placeholder with proper aspect ratio
  const PlaceholderDiv = () => (
    <div 
      className={cn(
        "bg-muted animate-pulse flex items-center justify-center",
        "min-h-[100px] w-full",
        className
      )}
      style={{
        aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : 'auto'
      }}
    >
      <div className="w-8 h-8 rounded-full bg-muted-foreground/20" />
    </div>
  );

  if (hasError && fallback) {
    return (
      <img
        ref={imgRef}
        src={fallback}
        alt={alt}
        className={cn("object-cover w-full h-full", className)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...props}
      />
    );
  }

  if (!isLoaded || !currentSrc) {
    return <PlaceholderDiv />;
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={cn(
        "object-cover w-full h-full transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};