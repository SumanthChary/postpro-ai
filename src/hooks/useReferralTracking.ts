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
      }
    };

    trackReferral();
  }, []);

  const processReferral = async (newUserId: string, planName: string) => {
    const referrerId = localStorage.getItem('referrerId');
    
    if (referrerId && newUserId) {
      try {
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
        }
      } catch (error) {
        console.error('Error calling referral function:', error);
      }
    }
  };

  return { processReferral };
};