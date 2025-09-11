import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import PlanToggle from "./pricing/PlanToggle";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";

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

  // Filter plans based on yearly toggle (hide free plan)
  const getFilteredPlans = () => {
    if (isYearly) {
      // Show Annual, Lifetime
      const annualPlan = pricingPlans.find(plan => plan.name === 'PRO ANNUAL');
      const lifetimePlan = pricingPlans.find(plan => plan.name === 'LIFETIME CREATOR');
      return [annualPlan, lifetimePlan].filter(Boolean) as Plan[];
    } else {
      // Show Monthly, Lifetime  
      const monthlyPlan = pricingPlans.find(plan => plan.name === 'BASIC MONTHLY');
      const lifetimePlan = pricingPlans.find(plan => plan.name === 'LIFETIME CREATOR');
      return [monthlyPlan, lifetimePlan].filter(Boolean) as Plan[];
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your LinkedIn presence with AI-powered content enhancement
          </p>
        </div>
        
        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {getFilteredPlans().map((plan) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              onSubscribe={handleSubscribe} 
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">30-day money-back guarantee</span> • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;