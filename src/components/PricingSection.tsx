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
  return <section className="py-8 sm:py-12 md:py-16 bg-white relative">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-12 h-px bg-black/20"></div>
      <div className="absolute top-4 right-4 w-12 h-px bg-black/20"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing, no hidden fees. Join 500+ creators already growing their LinkedIn presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6 sm:mb-8">
          {pricingPlans.map((plan, index) => <div key={plan.name} className={`relative p-6 sm:p-7 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${plan.popular ? "border-blue-600 bg-blue-50/50 scale-105" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              {/* Badges */}
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>}
              {plan.name === "Lifetime Deal" && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                    EARLY BIRD
                  </span>
                </div>}
              
              <div className="text-center mb-5">
                <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  {plan.icon && <span className="text-xl">{plan.icon}</span>}
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{plan.period === "year" ? "year" : plan.period === "lifetime" ? "one-time" : "month"}
                  </span>
                </div>
                {plan.originalPrice && <p className="text-green-600 font-semibold text-sm">
                    Save ${Number(plan.originalPrice) - Number(plan.price)} annually
                  </p>}
                
                {/* Credits Display */}
                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Included Credits</div>
                  <div className="text-lg font-bold text-blue-600">{plan.credits?.toLocaleString()} credits</div>
                  <div className="text-xs text-gray-500">
                    ≈ {Math.floor((plan.credits || 0) / 10)} enhanced posts
                  </div>
                </div>
              </div>
              
              <div className="space-y-2.5 mb-6">
                {plan.features.map(feature => <div key={feature} className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                  </div>)}
              </div>
              
              <button onClick={() => handleSubscribe(plan)} className={`w-full py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.popular || plan.name === "Lifetime Deal" ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105" : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}>
                {plan.cta}
              </button>
              
              {plan.name === "Lifetime Deal" && <p className="text-center text-xs text-orange-600 font-medium mt-2">Only 47 spots left</p>}
            </div>)}
        </div>
        
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600 font-medium max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-semibold">30-day money-back guarantee</span>
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="font-semibold">500+ satisfied users</span>
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-semibold">24/7 customer support</span>
            </span>
          </p>
        </div>
      </div>
    </section>;
};
export default PricingSection;