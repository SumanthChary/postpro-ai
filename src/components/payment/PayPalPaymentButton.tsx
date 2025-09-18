
import { useState, useEffect } from "react";
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

      // Verify payment with our backend
      const { data: verificationData, error: verificationError } = await supabase.functions.invoke('handle-payment', {
        body: {
          orderId,
          userId,
          subscriptionTier: planDetails.name,
          planName: planDetails.name
        }
      });

      console.log('Payment verification response:', { verificationData, verificationError });

      if (verificationError) {
        throw new Error(verificationError.message || 'Payment verification failed');
      }
      
      if (!verificationData?.success) {
        throw new Error(verificationData?.error || 'Payment verification failed');
      }

      // Payment successful - no credits system anymore

      toast({
        title: "Payment Successful!",
        description: `You are now subscribed to the ${planDetails.name}`,
        duration: 5000,
      });

      onSuccess();
    } catch (error) {
      const err = error as Error;
      console.error('Payment processing error:', err);
      onError(err.message || 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-14 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2 text-sm">PayPal is temporarily unavailable</p>
          <button 
            onClick={() => setHasError(false)}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-14 flex items-center justify-center">
      <PayPalButtons
        forceReRender={[planDetails.price]} // Re-render when price changes
        fundingSource="paypal"
        style={{ 
          layout: "vertical",
          shape: "rect",
          color: "gold",
          label: "pay",
          height: 55
        }}
        createOrder={(data, actions) => {
          console.log('Creating PayPal order with details:', {
            price: planDetails.price,
            name: planDetails.name
          });
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
              amount: {
                value: planDetails.price,
                currency_code: "USD",
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: planDetails.price
                  }
                }
              },
              description: `${planDetails.name} Subscription`,
              items: [{
                name: planDetails.name,
                description: `${planDetails.name} Plan`,
                unit_amount: {
                  currency_code: "USD",
                  value: planDetails.price
                },
                quantity: "1"
              }]
            }]
          });
        }}
        onApprove={async (data, actions) => {
          console.log('PayPal payment approved:', data);
          try {
            if (!actions.order) {
              throw new Error('Invalid PayPal order object');
            }
            const order = await actions.order.capture();
            console.log('PayPal order captured:', order);
            await handlePaymentSuccess(order.id);
          } catch (error) {
            console.error('PayPal capture error:', error);
            setHasError(true);
            onError(error instanceof Error ? error.message : "Failed to capture payment. Please try again or contact support.");
          }
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
          setHasError(true);
          onError("There was an error processing your PayPal payment. Please try again.");
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
