import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalPaymentButton } from "./PayPalPaymentButton";
import { RazorpayPaymentButton } from "./RazorpayPaymentButton";
import { Plan } from "@/types/pricing";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PremiumPaymentOptionsProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  paypalClientId: string;
}

export const PremiumPaymentOptions = ({
  planDetails,
  userId,
  onSuccess,
  onError,
  paypalClientId,
}: PremiumPaymentOptionsProps) => {
  const { toast } = useToast();

  const handleCardPayment = () => {
    toast({
      title: "Card Payment",
      description: "Card payment integration is being set up. Please use PayPal or Razorpay for now.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Payment Method</h2>
      </div>
      
      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* PayPal Button */}
        <div className="w-full">
          <PayPalScriptProvider 
            options={{ 
              clientId: paypalClientId,
              currency: "USD",
              intent: "capture",
              components: "buttons,hosted-fields",
              'enable-funding': "paylater,venmo,card",
              'disable-funding': "",
              'data-sdk-integration-source': "button-factory"
            }}
          >
            <PayPalPaymentButton 
              planDetails={planDetails}
              userId={userId}
              onSuccess={onSuccess}
              onError={onError}
            />
          </PayPalScriptProvider>
        </div>

        {/* Razorpay Button */}
        <div className="w-full">
          <RazorpayPaymentButton
            planDetails={planDetails}
            userId={userId}
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center bg-green-50 border border-green-200 rounded-xl py-3 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-green-800 font-medium">30-Day Money Back Guarantee</span>
        </div>
      </div>

      {/* Complete Purchase Button */}
      <Button className="w-full h-14 payment-button-primary text-lg font-semibold rounded-xl">
        Complete Purchase
      </Button>

      {/* Trust Footer */}
      <div className="text-center text-gray-500 text-sm">
        No setup fees • Cancel anytime • Keep all enhanced posts
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-8 pt-4">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-500 font-medium">SSL</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span className="text-gray-500 font-medium">PCI</span>
        </div>
        <div className="text-gray-500 font-medium">
          Bank-level security
        </div>
      </div>
    </div>
  );
};