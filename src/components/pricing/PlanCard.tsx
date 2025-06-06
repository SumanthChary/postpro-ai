
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Coins } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  // Safely use the currency context with a fallback
  let currencySymbol = '$'; // Default to USD
  try {
    const { currency } = useCurrency();
    currencySymbol = currency === 'USD' ? '$' : '₹';
  } catch (error) {
    console.warn('Currency context not available, using default currency symbol:', error);
    // Continue with the default currency symbol
  }

  return (
    <Card
      className={`p-3 sm:p-4 lg:p-6 flex flex-col relative bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 ${
        plan.popular ? "border-2 border-electric-purple shadow-lg" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-electric-purple text-white px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
          {plan.icon && <span className="text-sm sm:text-base">{plan.icon}</span>}
          {plan.name}
        </h3>
        <div className="flex items-end mb-2 sm:mb-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {plan.price === "Custom" ? "Custom" : `${currencySymbol}${plan.price}`}
          </span>
          {plan.price !== "Custom" && (
            <span className="text-gray-600 ml-1 sm:ml-2 text-sm sm:text-base">/{plan.period}</span>
          )}
        </div>
        {plan.credits && (
          <div className="flex items-center gap-1 sm:gap-2 text-green-600 text-xs sm:text-sm font-medium mb-2">
            <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
            {plan.credits} credits included
          </div>
        )}
      </div>
      
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        className={`w-full text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 ${
          plan.popular 
            ? "bg-electric-purple hover:bg-electric-purple/90 text-white" 
            : "border border-electric-purple text-electric-purple hover:bg-electric-purple hover:text-white"
        }`}
        variant={plan.popular ? "default" : "outline"}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
