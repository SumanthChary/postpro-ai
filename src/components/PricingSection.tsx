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
    <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight mb-4">
            Choose Your Growth Plan
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready to accelerate
          </p>
        </div>
        
        {/* Main Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
          {getFilteredPlans().map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 h-full flex flex-col ${
                plan.popular ? 'pro-card relative overflow-hidden transform scale-100 lg:scale-105' : ''
              } ${
                plan.badge ? 'relative overflow-hidden' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 -right-20 transform rotate-45 bg-accent text-white font-bold text-sm py-1 px-20">
                  MOST POPULAR
                </div>
              )}
              {plan.badge && !plan.popular && (
                <div className="absolute top-0 -right-16 transform rotate-45 bg-success text-white font-bold text-sm py-1 px-16">
                  {plan.badge}
                </div>
              )}
              
              <div className={`${plan.popular || plan.badge ? 'mt-6' : ''}`}>
                <h3 className="text-3xl font-bold text-primary mb-4">{plan.name}</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <p className="flex items-baseline">
                    <span className="text-7xl font-bold text-primary">${plan.price}</span>
                    <span className="ml-2 text-xl text-gray-600">
                      /{plan.period === "lifetime" ? "lifetime" : plan.period}
                    </span>
                  </p>
                  {plan.savings && (
                    <span className="bg-success/10 text-success text-sm font-bold px-3 py-1 rounded-full">
                      {plan.savings}
                    </span>
                  )}
                </div>
                
                {plan.name === 'PRO ANNUAL' && (
                  <p className="text-gray-500 line-through mb-4">$468</p>
                )}
                
                <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`mt-10 block w-full text-center py-4 px-6 font-semibold rounded-lg transition-all duration-300 ${
                    plan.name === "FREE"
                      ? "border-2 border-accent text-accent hover:bg-accent/5"
                      : "gradient-button text-white hover:opacity-90"
                  }`}
                >
                  {plan.cta}
                </button>
                
                {plan.popular && (
                  <p className="mt-4 text-sm text-center font-semibold text-gray-700">
                    Chosen by 73% of paid users
                  </p>
                )}
                {plan.name === 'FREE' && (
                  <p className="mt-4 text-sm text-center text-gray-500">
                    Perfect for testing our platform
                  </p>
                )}
                {plan.name === 'PRO ANNUAL' && (
                  <p className="mt-4 text-sm text-center text-gray-500">
                    Most cost-effective option
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Limited Time Lifetime Deal */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-8 sm:p-12 shadow-lg border border-red-200 mb-16">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 mb-4">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              LIMITED TIME
            </span>
            <h2 className="text-4xl font-bold text-primary mb-6">Lifetime Access</h2>
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-6xl font-bold text-primary">$99</span>
              <span className="text-3xl font-bold text-gray-400 line-through ml-4">$299</span>
            </div>
            <p className="font-semibold text-red-600 mb-8">Only 234 spots remaining</p>
            <div className="mb-8">
              <p className="text-lg font-bold text-gray-800">Ends in: 2d 14h 23m</p>
            </div>
            <ul className="space-y-3 text-gray-700 inline-block text-left mb-10">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-success mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Everything forever
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-success mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                All future updates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-success mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                VIP community
              </li>
            </ul>
            <div>
              <button 
                onClick={() => handleSubscribe(pricingPlans.find(p => p.name === 'LIFETIME')!)}
                className="inline-block w-full max-w-md text-center py-4 px-8 gradient-button-urgent text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Claim Lifetime Deal
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 mb-12">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-success mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.1 15.1,18 14,18H10C8.9,18 8,17.1 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11.5H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
              <p className="font-semibold">30-Day Money-Back Guarantee</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
              </svg>
              <p className="font-semibold">Cancel anytime with one click</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-accent mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
              <p className="font-semibold">Secure SSL Payments</p>
            </div>
          </div>
          
          <p className="text-lg font-semibold text-gray-800">Join 340+ professionals who trust us to grow</p>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;