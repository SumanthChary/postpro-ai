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
    <section className="py-8 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-normal text-foreground mb-2 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Early access pricing while we perfect the product. Join 47 other creators!
          </p>
        </div>
        
        {/* Professional Toggle */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className={`text-sm font-normal transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
              isYearly ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                isYearly ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-normal transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
            <span className="ml-1 text-xs text-green-600 font-medium">Save 29%</span>
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
          {getFilteredPlans().map((plan) => (
            <div key={plan.name} className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
              plan.popular ? "border-primary bg-primary/5 shadow-md" : plan.badge ? "border-orange-500 bg-orange-50" : "border-border bg-card hover:border-primary/50"
            }`}>
              {/* Badges */}
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-orange-500 text-white"
                  }`}>
                    {plan.popular ? "MOST POPULAR" : plan.badge}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-3">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {plan.icon && <span className="text-lg">{plan.icon}</span>}
                  <h3 className="text-sm font-medium text-foreground">{plan.name}</h3>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-medium text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{plan.period === "lifetime" ? "lifetime" : plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className="mt-1">
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
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
              
              <div className="space-y-1.5 mb-4">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleSubscribe(plan)} 
                className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  plan.name === "FREE" 
                    ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                    : plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" 
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">30-day money-back guarantee</span> • Cancel anytime • Processed within 48 hours
          </p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;