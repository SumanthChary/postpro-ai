
import { Coins } from "lucide-react";
import { Plan } from "@/types/pricing";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PlanSummaryProps {
  planDetails: Plan;
}

export const PlanSummary = ({ planDetails }: PlanSummaryProps) => {
  const { currency, formatPrice, convertPrice } = useCurrency();
  
  // Get the price to display
  const displayPrice = (planDetails as any).displayPrice || planDetails.price;
  const displayCurrency = (planDetails as any).currency || currency;
  
  // Convert price if needed
  const finalPrice = displayCurrency === 'USD' 
    ? displayPrice 
    : convertPrice(planDetails.price, 'INR');
  
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
      <p className="text-gray-600">
        {planDetails.name} - {displayCurrency === 'USD' ? '$' : '₹'}{finalPrice}/{planDetails.period}
      </p>
      {planDetails.credits && (
        <div className="flex items-center justify-center mt-2 text-green-600">
          <Coins className="w-5 h-5 mr-2" />
          <span>Includes {planDetails.credits} credits</span>
        </div>
      )}
    </div>
  );
};
