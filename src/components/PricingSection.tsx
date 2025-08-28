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
      <div className="absolute top-8 left-8 w-16 h-px bg-black"></div>
      <div className="absolute top-8 right-8 w-16 h-px bg-black"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Choose your Perfect Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Early access pricing while we perfect the product. Join 47+ other creators!
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="font-medium">SSL Secure payments</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
          {pricingPlans.map((plan, index) => <div key={plan.name} className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${plan.popular ? "border-blue-600 bg-blue-50/50 transform scale-105" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              {/* Badges */}
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>}
              {plan.name === "Lifetime Deal" && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    EARLY BIRD
                  </span>
                </div>}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  {plan.icon && <span className="text-2xl">{plan.icon}</span>}
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{plan.period === "year" ? "year" : plan.period === "lifetime" ? "one-time" : "month"}
                  </span>
                </div>
                {plan.originalPrice && <p className="text-green-600 font-semibold">
                    Save ${Number(plan.originalPrice) - Number(plan.price)} annually
                  </p>}
              </div>
              
              <div className="space-y-3 mb-8">
                {plan.features.map(feature => <div key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>)}
              </div>
              
              <button onClick={() => handleSubscribe(plan)} className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.popular || plan.name === "Lifetime Deal" ? "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105" : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}>
                {plan.cta}
              </button>
              
              {plan.name === "Lifetime Deal" && <p className="text-center text-sm text-orange-600 font-medium mt-3">Limited for first 100 users</p>}
            </div>)}
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Creators Trust PostPro AI</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">Your content is encrypted and never shared. GDPR compliant.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Money-Back Promise</h4>
              <p className="text-sm text-gray-600">Not satisfied? Full refund within 30 days, no questions asked.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-sm text-gray-600">Average 300% increase in engagement for active users.</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Questions?</span> Chat with our founder directly - 2 hour response time guaranteed
            </p>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">47+ creators already growing their audience</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;