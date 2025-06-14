
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
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      setIsProcessing(true);
      console.log('Processing PayPal payment:', orderId);
      
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

      if (paymentError) {
        console.error('Payment recording error:', paymentError);
        throw new Error('Failed to record payment: ' + paymentError.message);
      }

      // 2. Add credits to user account
      if (planDetails.credits) {
        console.log(`Adding ${planDetails.credits} credits for user ${userId}`);
        
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
          toast({
            title: "Payment Successful",
            description: "Your payment was processed but there was an issue adding credits. Please contact support.",
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
      onError(error.message || 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasError) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">PayPal is temporarily unavailable</p>
          <button 
            onClick={() => setHasError(false)}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <PayPalButtons
        style={{ 
          layout: "vertical",
          shape: "rect",
          color: "gold"
        }}
        createOrder={(data, actions) => {
          console.log('Creating PayPal order');
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
          console.log('PayPal payment approved:', data);
          try {
            if (actions.order) {
              const order = await actions.order.capture();
              await handlePaymentSuccess(order.id);
            }
          } catch (error) {
            console.error('PayPal capture error:', error);
            onError("Failed to capture payment");
          }
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
          setHasError(true);
          onError("PayPal is currently unavailable. Please try Razorpay or contact support.");
        }}
        onCancel={() => {
          console.log('PayPal payment cancelled');
          toast({
            title: "Payment Cancelled",
            description: "You can try again when ready",
          });
        }}
        disabled={isProcessing}
      />
    </div>
  );
};
