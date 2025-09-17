import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalPaymentButton } from "./PayPalPaymentButton";
import { Plan } from "@/types/pricing";
import { CreditCard, Smartphone } from "lucide-react";

interface SimplePaymentMethodProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  paypalClientId: string;
}

export const SimplePaymentMethod = ({
  planDetails,
  userId,
  onSuccess,
  onError,
  paypalClientId,
}: SimplePaymentMethodProps) => {
  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
      </div>

      <div className="space-y-4">
        {/* PayPal Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            </div>
            <span className="font-medium text-foreground">PayPal - Secure & Instant</span>
          </div>

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
            <div className="space-y-2">
              <PayPalPaymentButton 
                planDetails={planDetails}
                userId={userId}
                onSuccess={onSuccess}
                onError={onError}
              />
              <p className="text-xs text-center text-muted-foreground">Powered by PayPal</p>
            </div>
          </PayPalScriptProvider>
        </div>

        {/* Razorpay - Coming Soon */}
        <div className="space-y-3 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <span className="font-medium text-muted-foreground">Razorpay - Coming Soon</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">Razorpay integration is coming soon. Use PayPal for now.</span>
            </div>
          </div>
        </div>

        {/* Credit Card - Coming Soon */}
        <div className="space-y-3 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <span className="font-medium text-muted-foreground">Credit Card - Coming Soon</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Credit Card Payment (Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="mt-8 pt-6 border-t">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            </div>
            <span className="text-sm font-medium">Bank-Level Security</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Your payment is protected by 256-bit SSL encryption. We never store your payment details.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
              </div>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
              </div>
              <span>60-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              </div>
              <span>PayPal Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};