import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "3 LinkedIn posts optimization per week",
        "Basic tone analysis",
        "Real-Time Trend Hashtags",
        "Standard templates (5 templates)",
        "Basic analytics",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Creator Plan",
      variants: [
        {
          price: "6.99",
          period: "week",
          savings: null,
        },
        {
          price: "25",
          period: "month",
          savings: "Save 10% compared to weekly",
        }
      ],
      subtext: "14-day trial available • Limited time: $3.99 first month",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Writer",
        "Advanced tone analysis",
        "Engagement predictions",
        "Premium templates (20+ templates)",
      ],
      comingSoon: [
        "AI Profile Enhancer",
        "AI Visuals Generator",
        "Cross-Platform Sharing",
        "Teams collaboration",
        "CTA Generator"
      ],
      cta: "Start Creator Plan",
      popular: true,
    },
    {
      name: "Business Plan",
      price: "299",
      period: "year",
      subtext: "Save over 50% compared to weekly pricing!",
      features: [
        "All Creator Features",
        "Premium Support",
        "Early access to new features",
        "Premium templates (20+ templates)",
        "Advanced analytics dashboard",
      ],
      comingSoon: [
        "API integration",
        "Personal Branding Tools",
        "Priority customer support",
        "Dedicated account manager",
      ],
      cta: "Start Business Plan",
      popular: false,
    },
  ];

  const handleSubscribe = (plan: any) => {
    navigate("/payment", { state: { plan } });
  };

  const handleLearnMore = () => {
    navigate("/features");
  };

  const handleTemplates = () => {
    window.open("https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing", "_blank");
  };

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 flex flex-col ${
              plan.popular ? "border-electric-purple shadow-lg relative" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-electric-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <div className="relative">
              <button 
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
                onClick={() => navigate("/")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              {'variants' in plan ? (
                <div className="space-y-4">
                  {plan.variants.map((variant, index) => (
                    <div key={variant.period} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-end mb-2">
                        <span className="text-4xl font-bold">${variant.price}</span>
                        <span className="text-gray-600 ml-2">/{variant.period}</span>
                      </div>
                      {variant.savings && (
                        <p className="text-sm text-green-600">{variant.savings}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-end mb-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  )}
                </div>
              )}
              {plan.subtext && (
                <p className="text-sm text-gray-500">{plan.subtext}</p>
              )}
            </div>
            <div className="space-y-6 mb-8 flex-grow">
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {plan.comingSoon && plan.comingSoon.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-coral-red flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Coming Soon
                  </p>
                  {plan.comingSoon.map((feature) => (
                    <div key={feature} className="flex items-start opacity-60">
                      <CheckCircle className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <Button
                className={plan.popular ? "bg-electric-purple hover:bg-electric-purple/90 w-full" : "w-full"}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.cta}
              </Button>
              <Button 
                variant="ghost" 
                onClick={plan.name === "Free" ? handleLearnMore : handleTemplates}
                className="w-full text-sm text-gray-600 hover:text-electric-purple"
              >
                {plan.name === "Free" ? "Learn More About Features" : "View Templates"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;