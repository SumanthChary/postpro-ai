
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
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
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            onSubscribe={handleSubscribe} 
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
      </div>
    </div>
  );
};

export default PricingSection;
