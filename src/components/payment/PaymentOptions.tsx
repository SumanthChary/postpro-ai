
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardPaymentButton } from "./CardPaymentButton";
import { PayPalPaymentButton } from "./PayPalPaymentButton";
import { RazorpayPaymentButton } from "./RazorpayPaymentButton";
import { DodoPaymentButton } from "./DodoPaymentButton";
import { Plan } from "@/types/pricing";

interface PaymentOptionsProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  paypalClientId: string;
}

export const PaymentOptions = ({
  planDetails,
  userId,
  onSuccess,
  onError,
  paypalClientId,
}: PaymentOptionsProps) => {
  console.log('PayPal Client ID being used:', paypalClientId);
  
  return (
    <div className="space-y-6">
      
      <PayPalScriptProvider 
        options={{ 
          clientId: paypalClientId,
          currency: "USD",
          intent: "capture",
          components: "buttons",
          'enable-funding': "paylater,venmo",
          'disable-funding': "card",
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Alternative payment methods</span>
        </div>
      </div>

      <RazorpayPaymentButton
        planDetails={planDetails}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />

      <DodoPaymentButton
        planDetails={planDetails}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};
