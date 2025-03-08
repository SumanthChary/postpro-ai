
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "@/types/pricing";

interface PayPalPaymentButtonProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const PayPalPaymentButton = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: PayPalPaymentButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      setIsProcessing(true);
      
      // 1. Insert payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            user_id: userId,
            amount: parseFloat(planDetails.price),
            currency: 'USD',
            payment_method: 'paypal',
            status: 'completed',
            transaction_id: orderId,
            subscription_tier: planDetails.name
          }
        ]);

      if (paymentError) throw paymentError;

      // 2. Add credits to user account
      if (planDetails.credits) {
        // Calculate expiration date (3 months from now)
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);
        
        const { error: creditError } = await supabase.functions.invoke('handle-credits', {
          body: { 
            action: 'add',
            userId: userId,
            amount: planDetails.credits,
            expiresAt: expiresAt.toISOString()
          }
        });
        
        if (creditError) {
          console.error('Error adding credits:', creditError);
          // Continue with subscription but show warning about credits
          toast({
            title: "Credits Not Added",
            description: "We couldn't add credits to your account. Please contact support.",
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Payment Successful!",
        description: `You are now subscribed to the ${planDetails.name}${planDetails.credits ? ` with ${planDetails.credits} credits` : ''}`,
        duration: 5000,
      });

      onSuccess();
    } catch (error: any) {
      console.error('Payment recording error:', error);
      onError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <PayPalButtons
        style={{ 
          layout: "vertical",
          shape: "rect",
          color: "gold"
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
              amount: {
                value: planDetails.price,
                currency_code: "USD"
              },
              description: `${planDetails.name} Subscription`
            }]
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const order = await actions.order.capture();
            await handlePaymentSuccess(order.id);
          }
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
          onError("There was an error processing your PayPal payment.");
        }}
        disabled={isProcessing}
      />
    </div>
  );
};
