import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}

export const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  priority = false,
  fetchPriority,
  loading,
  decoding,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedDecoding = decoding ?? "async";
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : "auto");

  return (
    <img
      src={hasError ? fallback : src}
      alt={alt}
      className={cn("object-cover w-full h-full", className)}
      onError={() => setHasError(true)}
      loading={resolvedLoading}
      decoding={resolvedDecoding}
      fetchPriority={resolvedFetchPriority}
      {...props}
    />
  );
};