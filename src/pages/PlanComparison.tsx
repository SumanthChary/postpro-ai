
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { pricingPlans } from "@/data/pricingPlans";

const PlanComparison = () => {
  const navigate = useNavigate();

  const planMeta = {
    "Post Enhancer": {
      highlight: "Core Feature Access",
      locked: ["Virality predictor insights"],
      cta: "Unlock for $2.99"
    },
    "Post Enhancer Plus": {
      highlight: "Enhancer + Virality",
      locked: [] as string[],
      cta: "Unlock for $4.99"
    }
  } as const;

  const plans = pricingPlans.map((plan) => ({
    ...plan,
    highlight: planMeta[plan.name as keyof typeof planMeta]?.highlight ?? "",
    locked: planMeta[plan.name as keyof typeof planMeta]?.locked ?? []
  }));

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">
        Compare <span className="text-blue-600">One-Time Plans</span>
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-xl font-semibold text-blue-600 mt-1">${plan.price} one-time</p>
              <p className="text-sm text-gray-500 mt-2">{plan.highlight}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Included</h3>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}

              {plan.locked.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg pt-4">Not Included</h3>
                  {plan.locked.map((feature, index) => (
                    <div key={index} className="flex items-start text-gray-400">
                      <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="w-full mt-8 bg-electric-blue hover:bg-electric-blue/90"
              onClick={() => navigate("/payment", { state: { plan } })}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanComparison;
