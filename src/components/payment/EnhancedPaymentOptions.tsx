import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalPaymentButton } from "./PayPalPaymentButton";
import { RazorpayPaymentButton } from "./RazorpayPaymentButton";
import { Plan } from "@/types/pricing";
import { CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EnhancedPaymentOptionsProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  paypalClientId: string;
}

export const EnhancedPaymentOptions = ({
  planDetails,
  userId,
  onSuccess,
  onError,
  paypalClientId,
}: EnhancedPaymentOptionsProps) => {
  const { toast } = useToast();

  const handleCardPayment = () => {
    toast({
      title: "Coming Soon",
      description: "Direct card payments will be available soon. Please use PayPal or Razorpay for now.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Secure Payment</h3>
            <p className="text-xs text-blue-700 mt-1">
              Your payment is protected by 256-bit SSL encryption. We never store your payment details.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Choose Payment Method</h3>
        
        {/* PayPal Options */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">PayPal & Cards</div>
          <PayPalScriptProvider 
            options={{ 
              clientId: paypalClientId,
              currency: "USD",
              intent: "capture",
              components: "buttons",
              'enable-funding': "paylater,venmo,card",
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

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Razorpay */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Indian Payment Methods</div>
          <RazorpayPaymentButton
            planDetails={planDetails}
            userId={userId}
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>

        {/* Direct Card Payment - Coming Soon */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Direct Card Payment</div>
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 py-4"
            onClick={handleCardPayment}
          >
            <CreditCard className="mr-3 h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Pay with Credit/Debit Card</span>
            <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
          </Button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-900">SSL Secure</div>
            <div className="text-xs text-gray-600">256-bit encryption</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-900">PCI Compliant</div>
            <div className="text-xs text-gray-600">Industry standard</div>
          </div>
        </div>
      </div>
    </div>
  );
};