import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
import RedeemCodeDialog from "./pricing/RedeemCodeDialog";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
const PricingSection = () => {
  const navigate = useNavigate();
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", {
      state: {
        plan
      }
    });
  };
  return <section className="py-16 bg-white relative">
      {/* Decorative lines */}
      
      
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Early access pricing while we perfect the product. Join 47 other creators!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
          {pricingPlans.slice(0, 3).map((plan) => ( // Show only first 3 plans (Free, Pro Monthly, Lifetime)
            <div key={plan.name} className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular || plan.badge ? "border-primary bg-primary/5 transform scale-105 shadow-lg" : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              {/* Badges */}
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    plan.popular ? "bg-primary text-white" : "bg-orange-500 text-white"
                  }`}>
                    {plan.badge || "MOST POPULAR"}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {plan.icon && <span className="text-3xl">{plan.icon}</span>}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      /{plan.period === "lifetime" ? "lifetime" : plan.period}
                    </span>
                  </div>
                  
                  {plan.originalPrice && (
                    <p className="text-green-600 font-semibold mt-2">
                      Save ${Number(plan.originalPrice) - Number(plan.price)} annually
                    </p>
                  )}
                </div>
                
                {plan.limitedQuantity && (
                  <p className="text-sm text-orange-600 font-medium">
                    {plan.limitedQuantity}
                  </p>
                )}
              </div>
              
              <div className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleSubscribe(plan)} 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.name === "FREE" 
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                    : plan.popular || plan.badge
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg" 
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600">
            <span className="font-semibold">30-day money-back guarantee</span> (processed within 48 hours) • Cancel anytime • Your feedback shapes our development
          </p>
        </div>
      </div>
    </section>;
};
export default PricingSection;