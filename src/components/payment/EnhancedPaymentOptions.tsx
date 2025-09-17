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
          <div className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <span>PayPal</span>
          </div>
          <div className="mt-2">
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
      <RazorpayPaymentButton
        planDetails={planDetails}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />
      
      {/* Direct Card Payment */}
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted h-auto"
        onClick={handleCardPayment}
      >
        <CreditCard className="h-6 w-6" />
        <span>Credit/Debit Card</span>
      </Button>

      {/* Google Pay placeholder */}
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted h-auto"
        onClick={() => toast({
          title: "Coming Soon",
          description: "Google Pay integration will be available soon.",
          variant: "default",
        })}
      >
        <svg className="h-6 w-6" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.014 0C4.33 0 1.54 2.87.502 6.353c-.366 1.23.155 2.57.935 3.513.784.94 1.895 1.552 3.125 1.552h.02c1.474 0 2.65-.826 3.422-1.936.572-.84.88-1.833.88-2.822-.008-.035-.02-.07-.028-.105A4.404 4.404 0 0 0 8.015 0zM14.498 6.353c-1.04-3.483-3.83-6.353-7.484-6.353a4.404 4.404 0 0 0-1.55.28c.592.518.99 1.218 1.155 2.064.16.826.02 1.7-.42 2.438-.44.729-1.088 1.25-1.86 1.552-.313.125-.633.242-.96.347.168.42.368.826.588 1.218.82 1.46 2.228 2.3 3.82 2.3h.012c1.23 0 2.34-.612 3.125-1.552.78-.943 1.3-2.283.935-3.513z"/>
        </svg>
        <span>Google Pay</span>
      </Button>
    </div>
  );
};