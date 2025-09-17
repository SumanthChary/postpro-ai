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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      
      {/* PayPal */}
      <div className="w-full">
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
          <div className="group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-col items-center space-y-3">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#a)">
                  <path d="M20.264 5.232a1.002 1.002 0 0 0-.91-.599H7.954l-.454 2.723h10.932c.49 0 .914.364.985.845l.635 4.444a.5.5 0 0 1-.493.589H8.483l-.226 1.357-.062.373a.5.5 0 0 0 .493.589h9.135c.49 0 .914.364.985.845l.635 4.444a1 1 0 0 1-.985.99H5.748a1 1 0 0 1-.985-.99L2.5 3.39a1 1 0 0 0-.985-.99H.5a.5.5 0 0 0-.5.5v.49c0 .276.224.5.5.5h.72l2.263 13.573a2 2 0 0 0 1.97 1.764h9.135a2 2 0 0 0 1.97-1.764l.635-4.444a.5.5 0 0 0-.493-.589H9.421l.192-1.152h9.66c.98 0 1.828-.727 1.97-1.689l.634-4.445a2 2 0 0 0-.583-1.85Z" fill="#003087"/>
                  <path d="M22.84 3.468a1.002 1.002 0 0 0-.91-.599H6.237l.455 2.723h12.593c.49 0 .914.364.985.845l.635 4.444a.5.5 0 0 1-.493.589H9.33l.423 2.536h9.967c.98 0 1.828-.727 1.97-1.689l.634-4.445a2 2 0 0 0-.584-1.85Z" fill="#009cde"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h24v24H0z" fill="#fff"/>
                  </clipPath>
                </defs>
              </svg>
              <div className="text-center">
                <h3 className="font-bold text-foreground">PayPal</h3>
                <p className="text-xs text-muted-foreground">Pay with PayPal or Card</p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <PayPalPaymentButton 
              planDetails={planDetails}
              userId={userId}
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
        </PayPalScriptProvider>
      </div>

      {/* Razorpay */}
      <div className="w-full">
        <RazorpayPaymentButton
          planDetails={planDetails}
          userId={userId}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
      
      {/* Direct Card Payment */}
      <div className="w-full sm:col-span-2">
        <Button
          variant="outline"
          className="group relative w-full overflow-hidden rounded-xl border-2 border-dashed border-border bg-gradient-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 h-auto"
          onClick={handleCardPayment}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-foreground">Credit/Debit Card</h3>
              <p className="text-xs text-muted-foreground">Direct secure payment</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};