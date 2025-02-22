
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "3-5 LinkedIn posts optimization per week",
        "Basic tone analysis",
        "Real-Time Trend Hashtags",
      ],
      cta: "Start Free",
    },
    {
      name: "Creator Plan",
      price: "4.99",
      period: "week",
      features: [
        "Unlimited Post Enhancements",
        "AI Post Writer",
        "Advanced tone analysis",
      ],
      popular: true,
      cta: "Choose Plan",
    },
    {
      name: "Business Plan",
      price: "99",
      period: "year",
      features: [
        "All Creator Features",
        "Premium Support",
        "Early access to new features",
      ],
      cta: "Choose Plan",
    },
  ];

  const handleSubscribe = (plan: any) => {
    navigate("/payment", { state: { plan } });
  };

  const handleSeeFullFeatures = () => {
    navigate("/subscription");
  };

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 ml-2">/{plan.period}</span>
              </div>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button
              className={`w-full ${plan.popular ? "bg-electric-purple hover:bg-electric-purple/90" : ""}`}
              variant={plan.popular ? "default" : "outline"}
              onClick={() => handleSubscribe(plan)}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          onClick={handleSeeFullFeatures}
          className="group text-electric-purple hover:text-electric-purple/90"
          variant="link"
        >
          See Full Features
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default PricingSection;
