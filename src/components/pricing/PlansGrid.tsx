
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PlanGridProps {
  isYearly: boolean;
}

const PlansGrid = ({ isYearly }: PlanGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currency, formatPrice, convertPrice } = useCurrency();

  // Filter plans based on yearly toggle - remove weekly plan
  const filteredPlans = isYearly 
    ? pricingPlans.filter(plan => plan.period === "year" || plan.period === "forever" || plan.name === "Enterprise Plan")
    : pricingPlans.filter(plan => plan.period === "month" || plan.period === "forever");

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

    // Check if user already has active credits
    const { data: userCredits, error: creditsError } = await supabase
      .from('user_credits')
      .select('balance, expires_at')
      .eq('user_id', session.user.id)
      .gt('balance', 0)
      .lt('expires_at', new Date(Date.now() + 86400000).toISOString())
      .order('expires_at', { ascending: false });

    if (creditsError) {
      console.error('Error checking user credits:', creditsError);
    }

    // Prepare the converted price for display
    const displayPrice = currency === 'INR' 
      ? convertPrice(plan.price, 'INR')
      : plan.price;

    navigate("/payment", { 
      state: { 
        plan: {
          name: plan.name,
          price: plan.price,
          period: plan.period,
          currency: currency,
          displayPrice: displayPrice,
          credits: plan.credits
        },
        existingCredits: userCredits && userCredits.length > 0
      }
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
      {filteredPlans.map((plan) => (
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
            <h2 className="text-2xl font-bold mb-2">
              {plan.icon && <span className="mr-2">{plan.icon}</span>}
              {plan.name}
            </h2>
            <p className="text-3xl font-bold mb-2">
              {currency === 'USD' ? '$' : '₹'}
              {currency === 'USD' 
                ? plan.price 
                : convertPrice(plan.price, 'INR')}
              {plan.period !== "forever" && (
                <span className="text-lg font-normal">
                  {plan.period === "month" ? "" : `/${plan.period}`}
                </span>
              )}
            </p>
            {plan.name === "Yearly Plan" && (
              <p className="text-sm text-green-600 font-medium mb-2">
                50% OFF - Save $96/year!
              </p>
            )}
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span>🚀</span>
              {plan.credits} credits included
            </p>
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
          </div>

          <Button 
            className={`w-full ${plan.popular ? "bg-electric-purple hover:bg-electric-purple/90" : ""}`}
            variant={plan.popular ? "default" : "outline"}
            onClick={() => handleSelectPlan(plan)}
          >
            {plan.cta}
            {plan.cta?.includes("Choose") && <CreditCard className="w-4 h-4 ml-2" />}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default PlansGrid;
