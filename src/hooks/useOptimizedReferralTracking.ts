import { useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useOptimizedReferralTracking = () => {
  const hasProcessedRef = useRef(false);
  const isProcessingRef = useRef(false);

  const processReferral = useCallback(async (newUserId: string, planName: string = 'free') => {
    // Prevent duplicate processing
    if (hasProcessedRef.current || isProcessingRef.current) {
      return { success: false, reason: 'already_processed' };
    }

    const referrerId = localStorage.getItem('referrerId');
    
    if (!referrerId || !newUserId || referrerId === newUserId) {
      return { success: false, reason: 'invalid_referral' };
    }

    isProcessingRef.current = true;

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
        return { success: false, error };
      } else {
        console.log('Referral processed successfully:', data);
        // Clear the referrer ID after successful processing
        localStorage.removeItem('referrerId');
        hasProcessedRef.current = true;
        return { success: true, data };
      }
    } catch (error) {
      console.error('Error calling referral function:', error);
      return { success: false, error };
    } finally {
      isProcessingRef.current = false;
    }
  }, []);

  return { processReferral };
};