import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, StarIcon, ClockIcon } from "lucide-react";

const PricingOptimized = () => {
  const plans = [
    {
      name: "Pro Monthly",
      price: "$15",
      period: "/month", 
      badge: null,
      description: "Perfect for individual creators and small businesses",
      features: [
        "Unlimited post generation",
        "All social platforms (LinkedIn, Instagram, Twitter, Facebook)",
        "Engagement analytics and insights",
        "Email support",
        "Brand voice learning",
        "Basic templates library"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Annual Plan", 
      price: "$150",
      period: "/year",
      badge: "MOST POPULAR",
      description: "Save $30 annually + get exclusive features",
      features: [
        "Everything in Pro Monthly",
        "Save $30 annually ($12.50/month)",
        "Team collaboration (3 users)",
        "Priority support",
        "Advanced templates library",
        "Custom brand voice training",
        "Performance benchmarking",
        "Content calendar integration"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Lifetime Deal",
      price: "$99", 
      period: "one-time",
      badge: "LIMITED TIME",
      description: "Pay once, use forever - incredible value",
      features: [
        "All Pro features included forever",
        "No recurring payments ever",
        "VIP community access",
        "Exclusive masterclasses",
        "Priority feature requests",
        "Lifetime updates",
        "1-on-1 onboarding call",
        "Advanced AI models access"
      ],
      cta: "Get Lifetime Access",
      popular: false,
      urgent: "Only 500 lifetime deals available"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, upgrade when you see results. No long-term commitments, cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-2 border-primary shadow-xl scale-105' 
                  : 'border-2 hover:border-primary/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`text-center py-2 text-sm font-bold text-white ${
                    plan.badge === 'MOST POPULAR' ? 'bg-primary' : 'bg-accent'
                  }`}>
                    {plan.badge === 'MOST POPULAR' && <StarIcon className="w-4 h-4 inline mr-1" />}
                    {plan.badge === 'LIMITED TIME' && <ClockIcon className="w-4 h-4 inline mr-1" />}
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <CardContent className={`p-8 ${plan.badge ? 'pt-16' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  {plan.urgent && (
                    <Badge variant="destructive" className="mt-2">
                      ⚡ {plan.urgent}
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg"
                  className={`w-full text-lg py-4 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-accent hover:bg-accent/90'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Risk-Free Guarantee
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl">✅</div>
              <p className="font-semibold text-foreground">30-Day Money-Back</p>
              <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">✅</div>
              <p className="font-semibold text-foreground">Cancel Anytime</p>
              <p className="text-sm text-muted-foreground">No long-term commitments</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">✅</div>
              <p className="font-semibold text-foreground">No Questions Asked</p>
              <p className="text-sm text-muted-foreground">Simple, hassle-free cancellation</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Trusted by thousands of creators</p>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-accent fill-current" />
            ))}
            <span className="ml-2 text-foreground font-semibold">4.9/5 from 2,847+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingOptimized;