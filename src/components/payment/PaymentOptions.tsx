
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardPaymentButton } from "./CardPaymentButton";
import { PayPalPaymentButton } from "./PayPalPaymentButton";
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
  return (
    <div className="space-y-4">
      <PayPalScriptProvider 
        options={{ 
          clientId: paypalClientId,
          currency: "USD",
          intent: "capture"
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
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or pay with card</span>
        </div>
      </div>

      <CardPaymentButton />
    </div>
  );
};
