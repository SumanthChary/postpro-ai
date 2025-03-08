
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Coins } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
}

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {
  return (
    <Card
      className={`p-6 flex flex-col ${
        plan.popular ? "border-electric-purple shadow-lg relative" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-electric-purple text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {plan.icon && <span>{plan.icon}</span>}
          {plan.name}
        </h3>
        <div className="flex items-end mb-4">
          <span className="text-4xl font-bold">
            {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
          </span>
          {plan.price !== "Custom" && (
            <span className="text-gray-600 ml-2">/{plan.period}</span>
          )}
        </div>
        {plan.credits && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
            <Coins className="w-4 h-4" />
            {plan.credits} credits included
          </div>
        )}
      </div>
      <div className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <Button
        className={`w-full ${plan.popular ? "bg-electric-purple hover:bg-electric-purple/90" : ""}`}
        variant={plan.popular ? "default" : "outline"}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
