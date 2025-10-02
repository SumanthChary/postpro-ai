import { useEffect } from 'react';

// Critical resources for initial page load
const criticalResources = [
  {
    href: 'https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/Screenshot%20(583).png',
    as: 'image',
    type: 'image/png',
    fetchpriority: 'high'
  },
];

const PreloadResources = () => {
  useEffect(() => {
    // Preload critical resources with high priority
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.as;
      link.href = resource.href;
      if (resource.fetchpriority) {
        link.setAttribute('fetchpriority', resource.fetchpriority);
      }
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    });

    // Prefetch DNS for external resources
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://rskzizedzagohmvyhuyu.supabase.co',
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup on unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (criticalResources.some(r => r.href === link.getAttribute('href'))) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return null;
};

export default PreloadResources;