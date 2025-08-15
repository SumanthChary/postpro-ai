import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useReferralTracking = () => {
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

  const processReferral = async (newUserId: string, planName: string = 'free') => {
    const referrerId = localStorage.getItem('referrerId');
    
    if (referrerId && newUserId && referrerId !== newUserId) {
      try {
        console.log('Processing referral:', { referrerId, newUserId, planName });
        
        const { data, error } = await supabase.functions.invoke('referral-system', {
          body: {
            referrerId,
            referredUserId: newUserId,
            referredUserPlan: planName
          }
        });

        if (error) {
          console.error('Error processing referral:', error);
        } else {
          console.log('Referral processed successfully:', data);
          // Clear the referrer ID after successful processing
          localStorage.removeItem('referrerId');
          return { success: true, data };
        }
      } catch (error) {
        console.error('Error calling referral function:', error);
      }
    }
    
    return { success: false };
  };

  return { processReferral };
};