import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Infinity } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "",
      features: ["2 AI Post Enhancements", "Basic Analytics", "Standard Support"],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro Weekly",
      price: "6",
      period: "week",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Creator",
        "Advanced Analytics",
        "Priority Support",
      ],
      cta: "Start 7-Day Pro",
      popular: true,
    },
    {
      name: "Monthly",
      price: "24",
      period: "month",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Creator",
        "Advanced Analytics",
        "Priority Support",
      ],
      cta: "Start Monthly",
      popular: false,
    },
    {
      name: "Annual",
      price: "289",
      period: "year",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Creator",
        "Advanced Analytics",
        "Priority Support",
      ],
      cta: "Start Annual",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 flex flex-col ${
                plan.popular ? "border-linkedin shadow-lg" : ""
              }`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-linkedin mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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
    </section>
  );
};

export default PricingSection;