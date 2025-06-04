
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
import RedeemCodeDialog from "./pricing/RedeemCodeDialog";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";

const PricingSection = () => {
  const navigate = useNavigate();
  
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", { state: { plan } });
  };

  const handleSeeFullFeatures = () => {
    navigate("/subscription");
  };

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Select the perfect plan to supercharge your social media presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              onSubscribe={handleSubscribe} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12 lg:mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
          <RedeemCodeDialog />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
