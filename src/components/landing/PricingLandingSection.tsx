import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, StarIcon, SparklesIcon } from "lucide-react";
import { pricingPlans } from "@/data/pricingPlans";

const PricingLandingSection = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: any) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4" />
            Limited Time Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Growth Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who've transformed their social media presence with PostPro AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative p-8 ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-2xl scale-105 bg-white' 
                  : 'border border-gray-200 shadow-lg bg-white/80'
              } hover:shadow-2xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                {plan.icon && (
                  <div className="text-4xl mb-4">{plan.icon}</div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className="text-lg text-gray-500 line-through mb-1">
                      ${plan.originalPrice}
                    </div>
                  )}
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  {plan.discountPercentage && (
                    <div className="text-green-600 font-medium mt-2">
                      Save {plan.discountPercentage}%
                    </div>
                  )}
                </div>

                {plan.credits && (
                  <div className="text-blue-600 font-medium">
                    {plan.credits} Credits Included
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-4 font-medium text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 text-lg">
            Trusted by 10,000+ creators worldwide
          </p>
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium text-lg">
              💰 30-Day Money-Back Guarantee
            </p>
            <p className="text-green-700 mt-2">
              Try PostPro AI risk-free. If you're not completely satisfied, get a full refund.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingLandingSection;