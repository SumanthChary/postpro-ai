import { Button } from "@/components/ui/button";
import { Plan } from "@/types/pricing";

interface DodoPaymentButtonProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const STARTER_URL = "https://checkout.dodopayments.com/buy/pdt_KlYc9kipBF9o2R7uWqnfX?quantity=1";
const PRO_URL = "https://checkout.dodopayments.com/buy/pdt_m5JEQlYnYdhFKGxFlNhO9?quantity=1";
const LIFETIME_URL = "https://checkout.dodopayments.com/buy/pdt_6toZQV9LZ4kI5V4attlVL?quantity=1";

const DODO_PAYMENT_URLS: Record<string, string> = {
  Starter: STARTER_URL,
  "Starter Annual": STARTER_URL,
  Pro: PRO_URL,
  "Pro Annual": PRO_URL,
  "Lifetime Access": LIFETIME_URL,
};

const DODO_ALIAS_URLS: Record<string, string> = {
  "POST ENHANCER": STARTER_URL,
  "POST ENHANCER PLUS": LIFETIME_URL,
  "BASIC MONTHLY": STARTER_URL,
  "BASIC": STARTER_URL,
  "BASIC PLAN": STARTER_URL,
  "CREATOR PLAN": STARTER_URL,
  "PRO": PRO_URL,
  "PRO ANNUAL": PRO_URL,
  "PRO PLAN": PRO_URL,
  "PROFESSIONAL PLAN": PRO_URL,
  "LIFETIME": LIFETIME_URL,
  "LIFETIME CREATOR": LIFETIME_URL,
  "LIFETIME DEAL": LIFETIME_URL,
  "ENTERPRISE PLAN": LIFETIME_URL,
};

export const DodoPaymentButton = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: DodoPaymentButtonProps) => {
  const handleDodoPayment = () => {
    console.log('DoDo Payment - Plan name:', planDetails.name);
    console.log('DoDo Payment - Full plan details:', planDetails);
    console.log('Available URLs:', Object.keys(DODO_PAYMENT_URLS));
    
    // Try multiple variations of the plan name
    let paymentUrl = DODO_PAYMENT_URLS[planDetails.name];
    
    // If direct match fails, try with trimmed and case variations
    if (!paymentUrl) {
      const normalizedName = planDetails.name.trim();
      paymentUrl = DODO_PAYMENT_URLS[normalizedName];

      if (!paymentUrl) {
        const upperName = normalizedName.toUpperCase();
        paymentUrl = DODO_ALIAS_URLS[upperName];
      }
    }
    
    if (!paymentUrl) {
      console.error('DoDo Payment - No URL found for plan:', planDetails.name);
      console.log('Available URLs:', Object.keys(DODO_PAYMENT_URLS));
      console.log('Alias URLs:', Object.keys(DODO_ALIAS_URLS));
      onError(`Payment URL not found for plan: ${planDetails.name}. Redirecting to pricing.`);
      window.open('/pricing', '_blank');
      return;
    }

    console.log('Opening DoDo checkout:', paymentUrl);
    // Open Dodo checkout in new window
    window.open(paymentUrl, '_blank');
  };

  return (
    <Button
      onClick={handleDodoPayment}
      className="h-14 w-full border-0 rounded-lg transition-all duration-200 p-0 overflow-hidden flex items-center justify-center"
    >
      <img 
        src="/lovable-uploads/dodo_payments.png" 
        alt="Pay with DoDo Payments" 
        className="h-full w-full object-cover rounded-lg"
      />
    </Button>
  );
};