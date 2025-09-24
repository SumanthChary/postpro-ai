import React, { useEffect } from 'react';
import { useOptimizedUnlimitedAccess } from '@/hooks/useOptimizedUnlimitedAccess';
import { useOptimizedReferralTracking } from '@/hooks/useOptimizedReferralTracking';

// Component to handle app initialization logic that requires AuthContext
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Enable unlimited access (now optimized)
  useOptimizedUnlimitedAccess();
  
  // Initialize referral tracking (now optimized)
  const { processReferral } = useOptimizedReferralTracking();

  // Initialize referral URL tracking
  useEffect(() => {
    const trackReferral = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referrerId = urlParams.get('ref');
      
      if (referrerId) {
        // Store referrer ID in localStorage for later use when user signs up
        localStorage.setItem('referrerId', referrerId);
        console.log('Referral ID stored:', referrerId);
        
        // Remove ref parameter from URL to clean it up
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('ref');
        window.history.replaceState({}, document.title, newUrl.toString());
      }
    };

    trackReferral();
  }, []);

  return <>{children}</>;
};

export default AppInitializer;