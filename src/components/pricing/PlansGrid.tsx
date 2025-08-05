
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, Clock, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { useCurrency } from "@/contexts/CurrencyContext";
import FreeTrialSection from "./FreeTrialSection";

interface PlanGridProps {
  isYearly: boolean;
}

const PlansGrid = ({ isYearly }: PlanGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currency, formatPrice, convertPrice } = useCurrency();

  // Only show the two premium plans
  const filteredPlans = pricingPlans;

  const handleSelectPlan = async (plan: Plan) => {
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

    // Navigate to payment with plan details
    if (plan.name === "Professional Plan") {
      navigate("/payment", { 
        state: { 
          planType: "professional",
          planName: plan.name,
          price: plan.price,
          period: plan.period,
          credits: plan.credits
        }
      });
    } else if (plan.name === "Lifetime Creator Deal") {
      navigate("/payment", { 
        state: { 
          planType: "lifetime",
          planName: plan.name,
          price: plan.price,
          period: plan.period,
          credits: plan.credits
        }
      });
    }
  };

  return (
    <div className="space-y-12">
      {/* Free Trial Section */}
      <FreeTrialSection />
      
      {/* Premium Plans Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {filteredPlans.map((plan) => (
          <Card key={plan.name} className={`p-8 hover:shadow-xl transition-all duration-300 relative ${
            plan.popular 
              ? "border-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50" 
              : "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50"
          }`}>
            
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </Badge>
              </div>
            )}

            {/* Best Value Badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-1 text-sm font-medium">
                  Best Value
                </Badge>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                {plan.icon && <span className="text-2xl">{plan.icon}</span>}
                {plan.name}
              </h2>
              
              <div className="mb-3">
                <p className="text-4xl font-bold mb-1">
                  {currency === 'USD' ? '$' : '₹'}
                  {currency === 'USD' 
                    ? plan.price 
                    : convertPrice(plan.price, 'INR')}
                  {plan.period === "month" && (
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  )}
                  {plan.period === "lifetime" && (
                    <span className="text-lg font-normal text-gray-600"> once</span>
                  )}
                </p>
                
                {plan.badge && (
                  <p className="text-sm text-green-600 font-semibold">
                    {plan.badge}
                  </p>
                )}
                
                {plan.urgency && (
                  <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {plan.urgency}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700">
                  {typeof plan.credits === 'string' 
                    ? `${plan.credits} AI enhancements` 
                    : `${plan.credits} premium credits included`}
                </span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className={`w-full h-12 text-base font-semibold ${
                plan.popular 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.cta}
              <CreditCard className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
      
      {/* Trust Indicators */}
      <div className="text-center mt-12">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">🔒</span>
            <span>SSL secured payments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">⚡</span>
            <span>Instant activation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansGrid;
