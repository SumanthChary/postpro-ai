
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
    <div className="pro-section">
      <div className="pro-container">
        <div className="text-center space-responsive-md mb-12">
          <h2 className="pro-heading text-responsive-2xl mb-4">
            Choose Your Growth Plan
          </h2>
          <p className="pro-subheading text-responsive-base max-w-2xl mx-auto">
            Join thousands of professionals already growing their LinkedIn presence
          </p>
        </div>
        
        <div className="pro-grid pro-grid-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              onSubscribe={handleSubscribe} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12 space-responsive-sm flex flex-col sm:flex-row items-center justify-center gap-4">
          <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
          <RedeemCodeDialog />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
