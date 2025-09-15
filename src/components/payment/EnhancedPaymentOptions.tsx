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
    // TODO: Implement Stripe integration
    toast({
      title: "Card Payment",
      description: "Card payment integration is being set up. Please use PayPal or Razorpay for now.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Payment Method</h2>
        <p className="text-muted-foreground">Secure • Encrypted • Trusted by thousands</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        
        {/* PayPal & Card Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-3 w-3 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">PayPal & Credit Cards</h3>
          </div>
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
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">or pay with</span>
          </div>
        </div>

        {/* Alternative Payment Methods */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-3 w-3 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Alternative Payment Options</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Razorpay */}
            <RazorpayPaymentButton
              planDetails={planDetails}
              userId={userId}
              onSuccess={onSuccess}
              onError={onError}
            />
            
            {/* Direct Card Payment */}
            <Button
              variant="outline"
              className="h-14 border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200"
              onClick={handleCardPayment}
            >
              <CreditCard className="mr-3 h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <div className="font-medium text-foreground">Credit/Debit Card</div>
                <div className="text-xs text-muted-foreground">Direct payment</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Security & Trust Indicators */}
      <div className="bg-muted/30 rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xs font-medium text-foreground">256-bit SSL</div>
            <div className="text-xs text-muted-foreground">Bank-level security</div>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xs font-medium text-foreground">PCI Compliant</div>
            <div className="text-xs text-muted-foreground">Industry standard</div>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xs font-medium text-foreground">No Data Stored</div>
            <div className="text-xs text-muted-foreground">We never save cards</div>
          </div>
        </div>
      </div>
    </div>
  );
};