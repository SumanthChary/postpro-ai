import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallback : src}
      alt={alt}
      className={cn(
        "object-cover w-full h-full",
        className
      )}
      onError={() => setHasError(true)}
      loading="eager"
      decoding="sync"
      {...props}
    />
  );
};