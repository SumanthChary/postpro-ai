import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import PlanToggle from "./pricing/PlanToggle";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", {
      state: {
        plan
      }
    });
  };

  // Filter plans based on yearly toggle (hide free plan and lifetime)
  const getFilteredPlans = () => {
    if (isYearly) {
      // Show only Annual plan
      const annualPlan = pricingPlans.find(plan => plan.name === 'PRO ANNUAL');
      return [annualPlan].filter(Boolean) as Plan[];
    } else {
      // Show only Monthly plan 
      const monthlyPlan = pricingPlans.find(plan => plan.name === 'BASIC MONTHLY');
      return [monthlyPlan].filter(Boolean) as Plan[];
    }
  };

  const lifetimePlan = pricingPlans.find(plan => plan.name === "LIFETIME CREATOR");

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan to supercharge your social media presence
          </p>
        </div>

        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <div className="flex justify-center">
          <div className="max-w-md">
            {getFilteredPlans().map((plan) => (
              <PlanCard 
                key={plan.name} 
                plan={plan} 
                onSubscribe={handleSubscribe} 
              />
            ))}
          </div>
        </div>

        {/* Lifetime Deal Section */}
        {lifetimePlan && (
          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200 relative">
            <div className="absolute -top-3 right-5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Limited Time - {lifetimePlan.badge}
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900">{lifetimePlan.name}</h3>
                <p className="mt-2 text-gray-600">One payment, everything forever. Includes all future features.</p>
                <div className="mt-3">
                  <span className="text-4xl font-extrabold text-red-600">${lifetimePlan.price}</span>
                  {lifetimePlan.originalPrice && (
                    <span className="text-xl font-medium text-gray-400 line-through ml-2">${lifetimePlan.originalPrice}</span>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  {lifetimePlan.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center lg:justify-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 text-center">
                <div className="text-red-600 font-bold mb-2 text-sm">Offer ends in:</div>
                <CountdownTimer className="justify-center text-gray-800 text-base" />
                <button
                  onClick={() => handleSubscribe(lifetimePlan)}
                  className="mt-3 w-full text-center rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-6 text-base font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  {lifetimePlan.cta}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            30-day money-back guarantee on all paid plans
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;