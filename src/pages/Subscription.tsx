
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: [
      "3-5 LinkedIn posts optimization per week",
      "Basic tone analysis",
      "Real-Time Trend Hashtags",
      "Standard templates (5 templates)",
      "Basic analytics",
    ],
  },
  {
    name: "Creator Plan",
    price: "4.99",
    period: "week",
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
    popular: true,
  },
  {
    name: "Business Plan",
    price: "99",
    period: "year",
    subtext: "Special 1st year pricing - Save $270.99 (73% off regular price)",
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
  }
];

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectPlan = async (plan: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    navigate("/payment", { 
      state: { 
        plan: {
          name: plan.name,
          price: plan.price,
          period: plan.period
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-montserrat font-extrabold text-center mb-16">
        Choose Your <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Subscription</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-8 hover:shadow-lg transition-all duration-300 ${
            plan.popular ? "border-electric-purple shadow-lg relative" : ""
          }`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-electric-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-3xl font-bold mb-2">${plan.price}<span className="text-lg font-normal">/{plan.period}</span></p>
              {plan.subtext && (
                <p className="text-sm text-green-600">{plan.subtext}</p>
              )}
            </div>

            <div className="space-y-6 mb-8">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-purple mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.comingSoon && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-coral-red flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Coming Soon
                  </p>
                  {plan.comingSoon.map((feature) => (
                    <li key={feature} className="flex items-center opacity-60">
                      <CheckCircle className="w-5 h-5 text-coral-red mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </div>
              )}
            </div>

            <Button 
              className={`w-full ${plan.popular ? "bg-electric-purple hover:bg-electric-purple/90" : ""}`}
              variant={plan.popular ? "default" : "outline"}
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.name === "Free" ? "Start Free" : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Start {plan.name}
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
