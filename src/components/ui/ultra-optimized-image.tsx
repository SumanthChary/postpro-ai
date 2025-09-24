import React, { useState, useRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  const imageStyles = useMemo(() => ({
    transition: 'opacity 0.3s ease-in-out',
    opacity: loaded ? 1 : 0,
  }), [loaded]);

  const placeholderStyles = useMemo(() => ({
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: loaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  }), [loaded]);

  if (error) {
    return (
      <div 
        className={cn("bg-muted flex items-center justify-center", className)}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {/* Placeholder */}
      <div style={placeholderStyles}>
        {placeholder === 'blur' && blurDataURL ? (
          <img
            src={blurDataURL}
            alt=""
            className="w-full h-full object-cover blur-sm scale-110"
          />
        ) : (
          <div className="w-6 h-6 bg-muted-foreground/20 rounded animate-pulse" />
        )}
      </div>

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyles}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
        className={cn("w-full h-full object-cover", className)}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;