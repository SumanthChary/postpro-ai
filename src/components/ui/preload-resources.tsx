import { useEffect } from 'react';

const criticalResources = [
  'https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/Screenshot%20(583).png',
];

const PreloadResources = () => {
  useEffect(() => {
    // Preload critical images
    criticalResources.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = '/fonts/inter-var.woff2'; // Adjust path as needed
    document.head.appendChild(fontLink);

    return () => {
      // Cleanup on unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (criticalResources.includes(link.getAttribute('href') || '')) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return null;
};

export default PreloadResources;