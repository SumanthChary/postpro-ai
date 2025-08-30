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
    <section className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Early access pricing while we perfect the product. Join 47 other creators!
          </p>
        </div>
        
        {/* Professional Toggle */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-8 lg:mb-12 px-4">
          <span className={`text-sm sm:text-base lg:text-lg font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isYearly ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform duration-300 ${
                isYearly ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm sm:text-base lg:text-lg font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-green-600 font-semibold">Save 29%</span>
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-6 lg:mb-8 px-4">
          {getFilteredPlans().map((plan) => (
            <div key={plan.name} className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular ? "border-primary bg-primary/5 transform scale-105 shadow-lg" : plan.badge ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              {/* Badges */}
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                    plan.popular ? "bg-primary text-white" : "bg-orange-500 text-white"
                  }`}>
                    {plan.popular ? "MOST POPULAR" : plan.badge}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {plan.icon && <span className="text-2xl sm:text-3xl">{plan.icon}</span>}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">
                      /{plan.period === "lifetime" ? "lifetime" : plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 py-1 rounded">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
                
                {plan.limitedQuantity && (
                  <p className="text-xs sm:text-sm text-orange-600 font-medium">
                    {plan.limitedQuantity}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleSubscribe(plan)} 
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                  plan.name === "FREE" 
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                    : plan.popular
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg" 
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center px-4">
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-semibold">30-day money-back guarantee</span> (processed within 48 hours) • Cancel anytime • Your feedback shapes our development
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;