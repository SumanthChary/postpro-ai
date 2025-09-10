
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  const isFree = plan.name === "START FREE";
  const isLifetime = plan.period === "lifetime";
  const isAnnual = plan.period === "year";
  
  return (
    <Card
      className={`p-8 flex flex-col relative bg-white border rounded-xl hover:shadow-lg transition-all duration-300 ${
        plan.popular 
          ? "border-blue-200 shadow-md ring-1 ring-blue-100" 
          : "border-gray-150 hover:border-gray-200"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            plan.popular 
              ? "bg-blue-600 text-white" 
              : isFree
                ? "bg-green-600 text-white"
                : "bg-orange-600 text-white"
          }`}>
            {plan.badge}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          {plan.icon && <span className="text-2xl">{plan.icon}</span>}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
            {plan.limitedQuantity && (
              <p className="text-sm text-gray-600">{plan.limitedQuantity}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            {plan.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              {isFree ? "Free" : `$${plan.price}`}
            </span>
            {!isFree && (
              <span className="text-gray-600">
                /{plan.period === "lifetime" ? "once" : plan.period}
              </span>
            )}
          </div>
          
          {isFree && (
            <p className="text-sm text-gray-600">7 days only • Full feature access</p>
          )}
          
          {plan.name === "PROFESSIONAL" && (
            <p className="text-sm text-gray-600">Billed monthly • Cancel anytime</p>
          )}
          
          {isAnnual && (
            <p className="text-sm text-gray-600">Billed annually • Cancel anytime</p>
          )}
          
          {isLifetime && (
            <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
          )}
          
          {plan.savings && (
            <p className="text-sm font-medium text-green-600 mt-1">{plan.savings}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
          isFree
            ? "bg-green-600 text-white hover:bg-green-700" 
            : plan.popular
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
