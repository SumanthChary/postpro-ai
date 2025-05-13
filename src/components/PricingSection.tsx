
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
import RedeemCodeDialog from "./pricing/RedeemCodeDialog";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const PricingSection = () => {
  const navigate = useNavigate();
  
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", { state: { plan } });
  };

  const handleSeeFullFeatures = () => {
    navigate("/subscription");
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-2">Choose Your Perfect Plan</h2>
      <p className="text-center mb-8 max-w-md mx-auto">
        Don't just post. <span className="text-electric-purple font-medium">Grow your audience</span> with AI-enhanced content.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            onSubscribe={handleSubscribe} 
          />
        ))}
      </div>
      
      <div className="max-w-md mx-auto text-center mt-8">
        <p className="text-sm text-gray-600 mb-4">
          "I was struggling with daily content. Now I schedule a week's worth of posts in just 30 minutes!" - Sarah K.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
          <RedeemCodeDialog />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
