import { Button } from "@/components/ui/button";
import { Plan } from "@/types/pricing";

interface DodoPaymentButtonProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const DODO_PAYMENT_URLS = {
  "Basic": "https://checkout.dodopayments.com/buy/pdt_KlYc9kipBF9o2R7uWqnfX?quantity=1",
  "Pro": "https://checkout.dodopayments.com/buy/pdt_m5JEQlYnYdhFKGxFlNhO9?quantity=1",
  "Lifetime Deal": "https://checkout.dodopayments.com/buy/pdt_6toZQV9LZ4kI5V4attlVL?quantity=1",
  // Add alternative plan name mappings
  "Basic Plan": "https://checkout.dodopayments.com/buy/pdt_KlYc9kipBF9o2R7uWqnfX?quantity=1",
  "Pro Plan": "https://checkout.dodopayments.com/buy/pdt_m5JEQlYnYdhFKGxFlNhO9?quantity=1",
  "Lifetime": "https://checkout.dodopayments.com/buy/pdt_6toZQV9LZ4kI5V4attlVL?quantity=1"
};

export const DodoPaymentButton = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: DodoPaymentButtonProps) => {
  const handleDodoPayment = () => {
    console.log('DoDo Payment - Plan name:', planDetails.name);
    const paymentUrl = DODO_PAYMENT_URLS[planDetails.name as keyof typeof DODO_PAYMENT_URLS];
    
    if (!paymentUrl) {
      console.error('DoDo Payment - No URL found for plan:', planDetails.name);
      console.log('Available URLs:', Object.keys(DODO_PAYMENT_URLS));
      onError(`Payment URL not found for plan: ${planDetails.name}`);
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