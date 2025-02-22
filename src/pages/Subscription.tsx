
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Subscription = () => {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const selectedPlan = location.state?.selectedPlan;

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
      savings: period === "yearly" ? "Save over 50% compared to monthly" : null,
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
    },
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

    if (plan.name === "Enterprise") {
      // Handle enterprise contact form or redirect
      window.location.href = "mailto:sales@postpro.ai";
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-montserrat font-extrabold mb-4">
          Choose Your <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Plan</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Select the perfect plan for your needs and start enhancing your social media presence today.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={period === "monthly" ? "default" : "outline"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly Billing
          </Button>
          <Button
            variant={period === "yearly" ? "default" : "outline"}
            onClick={() => setPeriod("yearly")}
          >
            Yearly Billing
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              {plan.price === "Custom" ? (
                <p className="text-3xl font-bold">Custom Pricing</p>
              ) : (
                <p className="text-3xl font-bold mb-2">
                  ${plan.price}<span className="text-lg font-normal">/{plan.period}</span>
                </p>
              )}
              {plan.savings && (
                <p className="text-sm text-green-600">{plan.savings}</p>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-electric-purple hover:bg-electric-purple/90"
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.name === "Enterprise" ? (
                <Building2 className="w-4 h-4 mr-2" />
              ) : (
                <CreditCard className="w-4 h-4 mr-2" />
              )}
              {plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Can I change my plan later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards and PayPal. Enterprise plans can be paid via invoice."
            },
            {
              q: "Is there a contract or commitment?",
              a: "No, all our plans are subscription-based and can be cancelled at any time."
            },
            {
              q: "What happens when I upgrade?",
              a: "You'll immediately get access to all features in your new plan. We'll prorate any remaining time on your current plan."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

