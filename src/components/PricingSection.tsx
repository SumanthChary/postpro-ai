import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Infinity, Sparkles } from "lucide-react";
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
        "Simple hashtag suggestions",
        "Character counter",
        "Standard templates (5 templates)",
        "Basic analytics",
      ],
      comingSoon: [
        "AI Profile Enhancer (Preview)",
        "Personal branding tools",
        "Achievement highlighter",
        "Professional bio generator",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "4.99",
      period: "week",
      subtext: "14-day trial available • Limited time: $3.99 first month",
      features: [
        "15 posts per week",
        "LinkedIn optimization",
        "AI Post Writer",
        "Advanced tone analysis",
        "Engagement predictions",
        "Premium templates (20+)",
        "Posting time optimizer",
        "Basic analytics dashboard",
        "Email support",
        "Save 3 custom templates",
        "Referral program (Get 1 month free)",
      ],
      comingSoon: [
        "AI Profile Enhancer (Preview)",
        "Personal branding tools",
        "Achievement highlighter",
        "Professional bio generator",
      ],
      cta: "Start Pro Plan",
      popular: true,
    },
    {
      name: "Annual",
      price: "299",
      period: "year",
      subtext: "Save over 50% compared to weekly pricing!",
      features: [
        "Massive cost savings",
        "All features unlocked",
        "No usage limits",
        "Premium support",
        "Early access to new features",
        "Unlimited LinkedIn posts",
        "All social media platforms support",
        "Advanced tone & sentiment analysis",
        "Premium hashtag research",
        "Custom CTA generator",
        "Bulk post scheduling",
      ],
      comingSoon: [
        "AI Profile Enhancer (Preview)",
        "Personal branding tools",
        "Achievement highlighter",
        "Professional bio generator",
      ],
      cta: "Start Annual",
      popular: false,
    },
  ];

  const handleLearnMore = () => {
    navigate("/features");
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
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end mb-2">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                )}
              </div>
              {plan.subtext && (
                <p className="text-sm text-gray-500">{plan.subtext}</p>
              )}
            </div>
            <div className="space-y-6 mb-8 flex-grow">
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
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
                      <Check className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              className={plan.popular ? "bg-electric-purple hover:bg-electric-purple/90" : ""}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          onClick={handleLearnMore}
          className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90"
        >
          Learn More About Features
        </Button>
      </div>
    </div>
  );
};

export default PricingSection;