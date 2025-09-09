import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
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

  // Filter plans based on yearly toggle - show Free, Pro (Monthly/Annual based on toggle), and Lifetime
  const getFilteredPlans = () => {
    const freePlan = pricingPlans.find(plan => plan.name === 'FREE');
    const proPlan = pricingPlans.find(plan => 
      isYearly ? plan.name === 'PRO ANNUAL' : plan.name === 'PRO MONTHLY'
    );
    const lifetimePlan = pricingPlans.find(plan => plan.name === 'LIFETIME');
    
    return [freePlan, proPlan, lifetimePlan].filter(Boolean) as Plan[];
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Transform your LinkedIn presence with AI-powered content enhancement.
          </p>
        </div>
        
        {/* Professional Toggle */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 lg:mb-8 px-4">
          <span className={`text-xs sm:text-sm lg:text-base font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-10 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
              isYearly ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isYearly ? "translate-x-4 sm:translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-xs sm:text-sm lg:text-base font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 text-xs text-green-600 font-semibold">Save 29%</span>
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-4 lg:mb-6 px-4">
          {getFilteredPlans().map((plan) => (
            <div key={plan.name} className={`relative p-3 sm:p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
              plan.popular ? "border-primary bg-primary/5 transform scale-102 shadow-md" : plan.badge ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              {/* Badges */}
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.popular ? "bg-primary text-white" : "bg-orange-500 text-white"
                  }`}>
                    {plan.popular ? "MOST POPULAR" : plan.badge}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-3 sm:mb-4">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {plan.icon && <span className="text-lg sm:text-xl">{plan.icon}</span>}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      /{plan.period === "lifetime" ? "lifetime" : plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className="mt-1">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
                
                {plan.limitedQuantity && (
                  <p className="text-xs text-orange-600 font-medium">
                    {plan.limitedQuantity}
                  </p>
                )}
              </div>
              
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleSubscribe(plan)} 
                className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  plan.name === "FREE" 
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                    : plan.popular
                      ? "bg-primary text-white hover:bg-primary/90 shadow-md" 
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-semibold">30-day money-back guarantee</span> • Cancel anytime • Processed within 48 hours
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;