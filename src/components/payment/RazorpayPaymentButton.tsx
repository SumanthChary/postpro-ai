
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import Script from "./Script";
import { useCurrency } from "@/contexts/CurrencyContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentButtonProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const RazorpayPaymentButton = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: RazorpayPaymentButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { currency } = useCurrency();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // Get the price and currency to use
      const priceToUse = (planDetails as any).displayPrice || planDetails.price;
      const currencyToUse = (planDetails as any).currency || currency || 'USD';
      
      // Create an order on the server
      const { data: orderData, error: orderError } = await supabase.functions.invoke('handle-razorpay-payment', {
        body: { 
          action: 'create_order',
          amount: parseFloat(priceToUse) * 100, // Convert to smallest currency unit (cents/paise)
          currency: currencyToUse,
          receipt: `plan_${planDetails.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`,
          notes: {
            plan_name: planDetails.name,
            user_id: userId,
            original_currency: 'USD',
            display_currency: currencyToUse
          }
        }
      });
      
      if (orderError || !orderData?.id) {
        throw new Error(orderError?.message || 'Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        key: 'rzp_live_L9cXXNKWlP9tYl',
        amount: parseFloat(priceToUse) * 100,
        currency: currencyToUse,
        name: 'PostPro AI',
        description: `${planDetails.name} Subscription`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // Verify the payment on server
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('handle-razorpay-payment', {
              body: { 
                action: 'verify_payment',
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                user_id: userId,
                plan_details: {
                  name: planDetails.name,
                  price: planDetails.price,
                  credits: planDetails.credits,
                  currency: currencyToUse
                }
              }
            });
            
            if (verifyError) {
              throw new Error(verifyError.message);
            }
            
            toast({
              title: "Payment Successful!",
              description: `You are now subscribed to the ${planDetails.name}${planDetails.credits ? ` with ${planDetails.credits} credits` : ''}`,
              duration: 5000,
            });
            
            onSuccess();
          } catch (error: any) {
            console.error('Payment verification error:', error);
            onError(error.message || 'Failed to verify payment');
          }
        },
        prefill: {
          name: 'User',
          email: '',
          contact: ''
        },
        theme: {
          color: '#8b5cf6'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      // @ts-ignore - Razorpay is loaded via script
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error: any) {
      console.error('Razorpay error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "There was an error processing your payment.",
        variant: "destructive",
      });
      onError(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="lazyOnload"
      />
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay with Razorpay (${currency})`}
      </Button>
    </>
  );
};
