
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import Script from "./Script";

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

  // Safe currency handling with fallbacks
  const getCurrency = () => {
    try {
      // Try to use currency context
      const { useCurrency } = require("@/contexts/CurrencyContext");
      const { currency, convertPrice } = useCurrency();
      return { currency: currency || 'USD', convertPrice };
    } catch (error) {
      console.warn('Currency context not available, using USD');
      return { 
        currency: 'USD', 
        convertPrice: (price: string, targetCurrency: string) => {
          // Simple fallback conversion
          if (targetCurrency === 'INR') {
            return (parseFloat(price) * 83).toFixed(0); // Approximate USD to INR
          }
          return price;
        }
      };
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      console.log('Starting Razorpay payment process');
      
      const { currency, convertPrice } = getCurrency();
      
      // Get the appropriate currency and price
      const currencyToUse = (planDetails as any).currency || currency || 'USD';
      
      // Convert price if needed
      let priceToUse = planDetails.price;
      if(currencyToUse === 'INR' && typeof planDetails.price === 'string') {
        priceToUse = convertPrice(planDetails.price, 'INR');
      } else if((planDetails as any).displayPrice) {
        priceToUse = (planDetails as any).displayPrice;
      }
      
      console.log('Payment details:', { priceToUse, currencyToUse, originalPrice: planDetails.price });
      
      // Create an order on the server
      const { data: orderData, error: orderError } = await supabase.functions.invoke('handle-razorpay-payment', {
        body: { 
          action: 'create_order',
          amount: parseFloat(priceToUse), // Backend will handle conversion to smallest currency unit
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

      console.log('Razorpay order created:', orderData.id);

      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay is not available. Please try PayPal or refresh the page.');
      }

      // Initialize Razorpay payment
      const options = {
        key: 'rzp_live_dUTvU9HscnAP9M',
        amount: parseFloat(priceToUse) * 100,
        currency: currencyToUse,
        name: 'PostPro AI',
        description: `${planDetails.name} Subscription`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            console.log('Razorpay payment response:', response);
            
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
                  currency: currencyToUse,
                  period: planDetails.period
                }
              }
            });
            
            if (verifyError) {
              throw new Error(verifyError.message || 'Payment verification failed');
            }
            
            toast({
              title: "Payment Successful!",
              description: `You are now subscribed to the ${planDetails.name}`,
              duration: 5000,
            });
            
            onSuccess();
          } catch (error: any) {
            console.error('Payment verification error:', error);
            onError(error.message || 'Failed to verify payment');
          } finally {
            setIsProcessing(false);
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
            console.log('Razorpay modal dismissed');
            setIsProcessing(false);
          }
        }
      };

      // Initialize and open Razorpay
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
        onClick={handlePayment}
        disabled={isProcessing}
        variant="outline"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted h-auto"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <>
            <svg className="h-6 w-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.9 22.2c-15.5-12.3-35-19-54.8-19-45.7 0-86.8 28-104.2 68.4-14.8 34.3-13.6 72.8 3.4 105.8-19.1 11.2-35.4 28-47.5 48.7-27.1 46.4-30.8 102.5-10.4 152.9 20.6 51.1 66.8 85.8 120.8 85.8h225.2c16.5 0 30-13.5 30-30s-13.5-30-30-30H187.5c-44.4 0-81-30.3-89.8-70.3-9-40.6 8.3-82.5 40.2-106.3 3.6-2.7 8.3-2.5 11.6.4 12.3 11 27.7 18.5 44.5 20.7 4.1.5 7.8-2.6 8.3-6.7.7-5.5-3.3-10.2-8.8-10.2-11.2 0-21.9-4.2-30.2-11.4 15.5-60.6 68.6-105.6 132-105.6 22.3 0 43.1 5.9 61.1 16.5 4.3 2.5 5.5 8.3 2.7 12.3-2.8 4.1-8.5 4.9-12.6 2.4z" fill="#528FF0"/>
            </svg>
            <span>Razorpay</span>
          </>
        )}
      </Button>
    </>
  );
};
