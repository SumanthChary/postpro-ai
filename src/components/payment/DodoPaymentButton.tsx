import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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
  "Lifetime Deal": "https://checkout.dodopayments.com/buy/pdt_6toZQV9LZ4kI5V4attlVL?quantity=1"
};

export const DodoPaymentButton = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: DodoPaymentButtonProps) => {
  const handleDodoPayment = () => {
    const paymentUrl = DODO_PAYMENT_URLS[planDetails.name as keyof typeof DODO_PAYMENT_URLS];
    
    if (!paymentUrl) {
      onError("Payment URL not found for this plan");
      return;
    }

    // Open Dodo checkout in new window
    window.open(paymentUrl, '_blank');
  };

  return (
    <Button
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      onClick={handleDodoPayment}
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      Pay with Dodo
    </Button>
  );
};