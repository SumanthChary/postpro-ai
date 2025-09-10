
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
  
  return (
    <Card
      className={`p-6 flex flex-col relative bg-white border-2 rounded-2xl hover:shadow-2xl transition-all duration-300 ${
        plan.popular 
          ? "border-primary shadow-xl ring-2 ring-primary/20 transform scale-105" 
          : "border-gray-200 hover:border-primary/30"
      }`}
    >
      {(plan.popular || plan.badge) && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
            plan.popular 
              ? "bg-primary text-white" 
              : isFree
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          }`}>
            {plan.badge || "Most Popular"}
          </span>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          {plan.icon && <span className="text-3xl">{plan.icon}</span>}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            {isFree && <p className="text-sm text-green-600 font-semibold">Experience everything risk-free</p>}
            {plan.name === "PROFESSIONAL" && <p className="text-sm text-blue-600 font-semibold">Perfect for LinkedIn professionals</p>}
            {isLifetime && <p className="text-sm text-purple-600 font-semibold">Perfect for content creators & executives</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            {plan.originalPrice && (
              <span className="text-xl text-gray-400 line-through font-medium">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-5xl font-bold text-gray-900">
              {isFree ? "Free" : `$${plan.price}`}
            </span>
            {!isFree && (
              <span className="text-gray-600 font-medium">
                /{plan.period === "lifetime" ? "once" : plan.period}
              </span>
            )}
          </div>
          
          {isFree && (
            <p className="text-sm text-gray-600 mt-1 font-medium">7 days only • Full feature access</p>
          )}
          
          {plan.name === "PROFESSIONAL" && (
            <p className="text-sm text-gray-600 mt-1">Billed monthly • Cancel anytime</p>
          )}
          
          {isLifetime && plan.originalPrice && (
            <div className="mt-3">
              <span className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                {plan.savings}
              </span>
            </div>
          )}
          
          {plan.limitedQuantity && (
            <p className={`text-sm font-medium mt-3 ${
              isFree ? "text-green-600" : "text-orange-600"
            }`}>
              {plan.limitedQuantity}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
          isFree
            ? "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl" 
            : plan.popular
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl" 
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
        }`}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
