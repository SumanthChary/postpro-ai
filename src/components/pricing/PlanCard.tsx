
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  const currencySymbol = '$'; // USD only

  return (
    <Card
      className={`p-4 sm:p-6 flex flex-col relative bg-white border-2 rounded-xl hover:shadow-xl transition-all duration-300 ${
        plan.popular ? "border-primary shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {(plan.popular || plan.badge) && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
            plan.popular ? "bg-primary text-white" : "bg-orange-500 text-white"
          }`}>
            {plan.badge || "Most Popular"}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {plan.icon && <span className="text-2xl">{plan.icon}</span>}
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            {plan.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-gray-900">
              ${plan.price}
            </span>
            <span className="text-gray-600">
              /{plan.period === "lifetime" ? "lifetime" : plan.period}
            </span>
          </div>
          
          {plan.originalPrice && (
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                Save ${Number(plan.originalPrice) - Number(plan.price)}
              </span>
            </div>
          )}
          
          {plan.limitedQuantity && (
            <p className="text-sm text-orange-600 font-medium mt-2">
              {plan.limitedQuantity}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        className={`w-full py-3 font-semibold transition-all duration-300 ${
          plan.name === "FREE" 
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
            : plan.popular || plan.badge
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg" 
              : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
        }`}
        variant={plan.name === "FREE" ? "outline" : plan.popular || plan.badge ? "default" : "outline"}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
