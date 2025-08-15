import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitFeedback = async (rating: number, feedbackText: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit feedback",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          rating,
          feedback_text: feedbackText,
          feature_used: 'post_enhancement'
        });

      if (error) {
        console.error('Error submitting feedback:', error);
        toast({
          title: "Error",
          description: "Failed to submit feedback. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
        variant: "default",
      });
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to determine if feedback popup should show (30% chance)
  const shouldShowFeedback = () => {
    return Math.random() < 0.3; // 30% chance
  };

  return {
    submitFeedback,
    isSubmitting,
    shouldShowFeedback,
  };
};