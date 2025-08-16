import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, CreditCard } from "lucide-react";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";

const PricingLandingSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    navigate("/payment", { 
      state: { 
        plan: {
          name: plan.name,
          price: plan.price,
          period: plan.period,
          currency: 'USD',
          displayPrice: plan.price,
          credits: plan.credits
        }
      }
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan to supercharge your social media presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`p-8 hover:shadow-lg transition-all duration-300 ${
              plan.popular ? "border-accent shadow-lg relative" : ""
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {plan.icon && <span className="mr-2">{plan.icon}</span>}
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold mb-2">
                  ${plan.price}
                  {plan.period !== "lifetime" && (
                    <span className="text-lg font-normal">
                      /{plan.period}
                    </span>
                  )}
                </p>
                {plan.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through mb-2">
                    Originally ${plan.originalPrice}
                  </p>
                )}
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <span>🚀</span>
                  {plan.credits} credits included
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <ul className="space-y-3">
                  {plan.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.cta}
                {plan.cta?.includes("Choose") && <CreditCard className="w-4 h-4 ml-2" />}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/subscription")}
            className="px-8"
          >
            View All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingLandingSection;