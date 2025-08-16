import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, StarIcon } from "lucide-react";
import { pricingPlans } from "@/data/pricingPlans";

const PricingLandingSection = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: any) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary">
            <StarIcon className="w-4 h-4 mr-2" />
            Choose Your Plan
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who are already growing their social media presence with PostPro AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans
            .filter(plan => ['Free', 'Professional', 'Lifetime Creator'].includes(plan.name))
            .map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.period === 'lifetime' ? 'lifetime' : plan.period}
                    </span>
                  </div>
                  {plan.name === 'Free' && (
                    <p className="text-muted-foreground">
                      Perfect for getting started
                    </p>
                  )}
                  {plan.name === 'Professional' && (
                    <p className="text-muted-foreground">
                      For serious content creators
                    </p>
                  )}
                  {plan.name === 'Lifetime Creator' && (
                    <p className="text-muted-foreground">
                      One-time payment, lifetime access
                    </p>
                  )}
                  {plan.name === 'Yearly Plan' && (
                    <p className="text-muted-foreground">
                      Best value for power users
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 text-lg ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            🔒 Secure payment • Cancel anytime • 7-day money-back guarantee
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/subscription")}
            className="border-primary text-primary hover:bg-primary/10"
          >
            View All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingLandingSection;