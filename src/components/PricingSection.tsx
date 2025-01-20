import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Infinity, Sparkles } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "",
      features: [
        "2 AI Post Enhancements",
        "Basic Analytics",
        "Standard Support",
      ],
      comingSoon: [],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "24",
      period: "month",
      subtext: "or $6/week",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Creator",
        "Advanced Analytics",
        "Priority Support",
        "Custom Hashtag Suggestions",
        "Engagement Analytics",
      ],
      comingSoon: [
        "AI Image Generation",
        "Scheduled Posts",
        "Team Collaboration",
      ],
      cta: "Start Pro Plan",
      popular: true,
    },
    {
      name: "Annual",
      price: "289",
      period: "year",
      features: [
        "Everything in Pro",
        "2 Months Free",
        "Early Access to New Features",
        "Dedicated Account Manager",
        "Custom Branding",
      ],
      comingSoon: [
        "API Access",
        "White Label Solution",
        "Custom AI Training",
      ],
      cta: "Start Annual",
      popular: false,
    },
  ];

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 flex flex-col ${
              plan.popular ? "border-linkedin shadow-lg relative" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-linkedin text-white px-4 py-1 rounded-full text-sm font-medium">
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
                    <Check className="w-5 h-5 text-linkedin mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {plan.comingSoon && plan.comingSoon.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-warm flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Coming Soon
                  </p>
                  {plan.comingSoon.map((feature) => (
                    <div key={feature} className="flex items-start opacity-60">
                      <Check className="w-5 h-5 text-warm mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              className={plan.popular ? "bg-linkedin hover:bg-linkedin/90" : ""}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;