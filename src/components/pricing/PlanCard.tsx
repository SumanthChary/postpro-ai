
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  const isLifetime = plan.period === "lifetime";
  
  return (
    <Card
      className={`p-8 flex flex-col relative bg-white border rounded-xl hover:shadow-md transition-all duration-300 ${
        plan.popular
          ? "border-blue-500 shadow-sm ring-2 ring-blue-100"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            plan.popular
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-white"
          }`}>
            {plan.badge}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
          {plan.limitedQuantity && (
            <p className="text-sm text-gray-600">{plan.limitedQuantity}</p>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              ${plan.price}
            </span>
            <span className="text-gray-600">
              /{isLifetime ? "once" : plan.period}
            </span>
          </div>
          
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
          plan.popular
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        }`}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
