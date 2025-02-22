
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, Sparkles, X, CreditCard, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "5 post enhancements/month",
        "Basic AI features",
        "Manual posting",
        "Real-Time Trend Hashtags",
        "Standard templates (5 templates)",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Weekly",
      price: "7.99",
      period: "week",
      features: [
        "Unlimited post enhancements",
        "AI tone/style analysis",
        "Trending Hashtag suggestions",
        "Premium templates (20+ templates)",
      ],
      cta: "Choose Plan",
      popular: true,
    },
    {
      name: period === "monthly" ? "Monthly" : "Yearly",
      price: period === "monthly" ? "19.99" : "149.99",
      period: period === "monthly" ? "month" : "year",
      features: [
        "All Weekly features",
        "Content analysis",
        "Custom templates",
        "Priority processing",
        "CTA Generator",
        "AI Profile Enhancer",
        period === "yearly" ? "Early feature access" : "24/7 support",
        period === "yearly" ? "Personal Branding tools" : "",
      ].filter(Boolean),
      cta: "Choose Plan",
      popular: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "API access",
        "Bulk enhancements",
        "Team collaboration",
        "Custom solutions",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const handleSelectPlan = (plan: any) => {
    navigate("/subscription", { state: { selectedPlan: plan } });
  };

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Choose Your Plan</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                <Button
                  variant={period === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={period === "yearly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("yearly")}
                >
                  Yearly
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 flex flex-col ${
                  plan.popular ? "border-electric-purple" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-electric-purple text-white px-3 py-1 rounded-full text-xs">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-2">
                    {plan.price === "Custom" ? (
                      <span className="text-2xl font-bold">Custom Pricing</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">${plan.price}</span>
                        {plan.period && (
                          <span className="text-gray-600 ml-1">/{plan.period}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-electric-purple hover:bg-electric-purple/90"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.name === "Enterprise" ? (
                    <Building2 className="w-4 h-4 mr-2" />
                  ) : (
                    <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/subscription")}
              className="text-electric-purple hover:text-electric-purple/90"
            >
              See Full Features
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingSection;

