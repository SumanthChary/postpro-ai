
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, Sparkles, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import RedeemCodeDialog from "@/components/pricing/RedeemCodeDialog";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);

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
      price: isYearly ? "20" : "4.99",
      period: isYearly ? "month" : "week",
      subtext: isYearly ? "Save 15% compared to weekly" : "14-day trial available",
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
    <div className="min-h-screen bg-gradient-to-b from-light-lavender/50 to-transparent">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-montserrat font-extrabold text-center mb-8">
          Choose Your <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Subscription</span>
        </h1>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className={`text-lg ${!isYearly ? 'font-bold text-electric-purple' : 'text-gray-600'}`}>Weekly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
              isYearly ? "bg-electric-purple" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-lg ${isYearly ? 'font-bold text-electric-purple' : 'text-gray-600'}`}>Yearly</span>
        </div>
        
        <div className="flex justify-center mb-8">
          <RedeemCodeDialog />
        </div>

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
                    <CreditCard className="w-4 h-4 mr-2" />
                    Start {plan.name}
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Security & Trust</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-electric-purple" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-electric-purple" />
                  <span>PayPal Verified Partner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-electric-purple" />
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                  <p className="text-gray-600">Yes, you can cancel your subscription at any time with no hidden fees.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards and PayPal.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is there a trial period?</h3>
                  <p className="text-gray-600">Yes, our Creator Plan comes with a 14-day trial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
