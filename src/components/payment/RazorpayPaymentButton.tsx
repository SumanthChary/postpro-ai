
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
          color: '#3b82f6'
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
        className="h-16 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 rounded-xl transition-all duration-200 p-0 overflow-hidden flex items-center justify-center"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-white font-medium">Processing...</span>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/razorpay-addon-scaled.jpg" 
            alt="Pay with Razorpay" 
            className="h-full w-full object-cover"
          />
        )}
      </Button>
    </>
  );
};
