
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { pricingPlans } from "@/data/pricingPlans";

interface PlanGridProps {
  isYearly: boolean;
}

const PlansGrid = ({ isYearly }: PlanGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      name: "Free Plan",
      price: "0",
      period: "forever",
      subtext: "Trial Plan",
      features: [
        "5 Post Enhancements/Month",
        "Basic AI Features",
        "Manual Posting",
        "Real-Time Trending Hashtags",
        "Watermark on AI-Enhanced Posts",
      ],
    },
    {
      name: "Creator Plan",
      price: isYearly ? "129.99" : "5.99",
      period: isYearly ? "year" : "week",
      subtext: isYearly ? "Best value for long-term growth" : "Perfect for short-term boosts",
      features: [
        "Unlimited Post Enhancements",
        "AI Tone & Style Suggestions",
        "Trending Hashtag Generator",
        "Premium Templates (20+)",
        "Virality Score Predictor",
      ],
      comingSoon: [
        "Advanced AI Chatbot",
        "AI-Powered Smart Dashboard",
        "A/B Testing for Posts",
        "CTA Generator",
      ],
      popular: true,
    },
    {
      name: "Business Plan",
      price: "24.99",
      period: "month",
      subtext: "Ideal for serious content creators & businesses",
      features: [
        "All Weekly Features + More!",
        "Advanced AI Chatbot",
        "AI-Powered Smart Dashboard",
        "A/B Testing for Posts",
        "CTA Generator",
        "Custom Templates",
      ],
      comingSoon: [
        "Personal Branding Toolkit",
        "Content Strategy Calendar",
        "Advanced Analytics",
        "Team Collaboration (1 seat)",
      ],
    }
  ];

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
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
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
                  <span className="text-coral-red">✨</span>
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
            {plan.name === "Free Plan" ? "Start Free" : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Start {plan.name}
              </>
            )}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default PlansGrid;
