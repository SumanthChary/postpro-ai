import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: boolean;
}

export const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallback : src}
      alt={alt}
      className={cn("object-cover w-full h-full", className)}
      onError={() => setHasError(true)}
      loading="eager"
      decoding="sync"
      {...props}
    />
  );
};