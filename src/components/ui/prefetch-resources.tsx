import React, { useEffect, memo } from 'react';

interface PrefetchResourcesProps {
  resources?: string[];
}

export const PrefetchResources = memo(({ resources = [] }: PrefetchResourcesProps) => {
  useEffect(() => {
    // Prefetch critical resources
    const criticalResources = [
      'https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/Screenshot%20(583).png',
      'https://api.fontshare.com/v2/css?f[]=europa-grotesk@300,400,500,600,700,800,900&display=swap',
      ...resources
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup prefetch links on unmount
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
      prefetchLinks.forEach(link => {
        if (criticalResources.includes((link as HTMLLinkElement).href)) {
          link.remove();
        }
      });
    };
  }, [resources]);

  return null;
});

PrefetchResources.displayName = 'PrefetchResources';