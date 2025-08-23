import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'spinner' | 'pulse';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12'
};

export const PerformanceLoader = memo(({ 
  className, 
  size = 'md',
  variant = 'spinner'
}: PerformanceLoaderProps) => {
  
  if (variant === 'dots') {
    return (
      <div className={cn("flex space-x-1", className)}>
        <div className={cn("rounded-full bg-primary animate-pulse", 
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
        )}></div>
        <div className={cn("rounded-full bg-primary animate-pulse", 
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
        )} style={{ animationDelay: '0.2s' }}></div>
        <div className={cn("rounded-full bg-primary animate-pulse", 
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
        )} style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("bg-gray-200 animate-pulse rounded", sizeClasses[size], className)} />
    );
  }

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
      sizeClasses[size],
      className
    )} />
  );
});

PerformanceLoader.displayName = 'PerformanceLoader';