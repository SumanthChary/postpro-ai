
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
    <CurrencyProvider>
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
        <div className="text-center mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
          <RedeemCodeDialog />
        </div>
      </div>
    </CurrencyProvider>
  );
};

export default PricingSection;
