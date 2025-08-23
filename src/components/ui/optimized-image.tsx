import React, { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: boolean;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  priority = false,
  quality = 85,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Optimize src for better compression if it's a URL
  const optimizedSrc = src.includes('http') 
    ? `${src}?quality=${quality}&format=webp`
    : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={hasError ? fallback : optimizedSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-out object-cover w-full h-full",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        {...props}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-primary animate-spin"></div>
        </div>
      )}
    </div>
  );
});