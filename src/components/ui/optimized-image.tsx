import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  fetchPriority,
  loading,
  decoding,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const resolvedLoading = loading ?? "lazy";
  const resolvedDecoding = decoding ?? "async";
  const resolvedFetchPriority = fetchPriority ?? "auto";

  return (
    <img
      src={hasError ? fallback : src}
      alt={alt}
      className={cn(
        "object-cover w-full h-full",
        className
      )}
      onError={() => setHasError(true)}
      loading={resolvedLoading}
      decoding={resolvedDecoding}
      fetchPriority={resolvedFetchPriority}
      {...props}
    />
  );
};