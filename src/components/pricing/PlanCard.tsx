
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  return (
    <Card
      className={`p-6 flex flex-col relative bg-white border-2 rounded-xl hover:shadow-xl transition-all duration-300 ${
        plan.popular ? "border-blue shadow-lg scale-105" : "border-navy/20 hover:border-navy/40"
      }`}
    >
      {(plan.popular || plan.badge) && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
            plan.popular ? "bg-blue text-white" : "bg-navy text-white"
          }`}>
            {plan.badge || "Most Popular"}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {plan.icon && <span className="text-2xl">{plan.icon}</span>}
          <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            {plan.originalPrice && (
              <span className="text-lg text-navy/40 line-through">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-navy">
              ${plan.price}
            </span>
            <span className="text-navy/60">
              /{plan.period === "lifetime" ? "lifetime" : plan.period}
            </span>
          </div>
          
          {plan.originalPrice && (
            <div className="mt-2">
              <span className="inline-block bg-blue/10 text-blue text-sm font-medium px-2 py-1 rounded">
                Save ${Number(plan.originalPrice) - Number(plan.price)}
              </span>
            </div>
          )}
          
          {plan.limitedQuantity && (
            <p className="text-sm text-navy font-medium mt-2">
              {plan.limitedQuantity}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-6 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start">
            <CheckCircle className="w-4 h-4 text-blue mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-navy/70 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button
        className={`w-full py-3 font-semibold transition-all duration-300 ${
          plan.name === "FREE" 
            ? "bg-navy/10 text-navy hover:bg-navy/20" 
            : plan.popular || plan.badge
              ? "bg-blue text-white hover:bg-blue/90 shadow-lg" 
              : "border-2 border-blue text-blue hover:bg-blue hover:text-white"
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
