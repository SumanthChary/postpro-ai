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
  const isLifetimeCreator = plan.name === "LIFETIME CREATOR";
  const isOneTime = plan.name.toLowerCase().includes("one-time");

  const borderStyles = (() => {
    if (plan.popular) {
      return "border-blue-500 shadow-sm ring-2 ring-blue-100 scale-105";
    }
    if (isLifetimeCreator) {
      return "border-2 border-red-200 hover:border-red-300";
    }
    if (isOneTime) {
      return "border-2 border-blue-200 hover:border-blue-300";
    }
    return "border-gray-200 hover:border-gray-300";
  })();

  const badgeColor = (() => {
    if (plan.popular) return "bg-blue-600 text-white";
    if (isLifetimeCreator) return "bg-red-600 text-white";
    if (isOneTime) return "bg-blue-600 text-white";
    if (isFree) return "bg-green-600 text-white";
    return "bg-orange-600 text-white";
  })();

  const buttonColor = (() => {
    if (plan.popular) return "bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
    if (isLifetimeCreator) return "bg-red-600 text-white hover:bg-red-700 shadow-sm";
    if (isOneTime) return "bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
    if (isLifetime) return "bg-orange-600 text-white hover:bg-orange-700 shadow-sm";
    return "bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
  })();

  return (
    <Card
      className={`p-8 flex flex-col relative bg-white rounded-2xl transition-all duration-300 ${borderStyles}`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${badgeColor}`}>
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
        className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${buttonColor}`}
        onClick={() => onSubscribe(plan)}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};

export default PlanCard;
