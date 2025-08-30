import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";

interface PlanGridProps {
  isYearly: boolean;
}

const PlansGrid = ({ isYearly }: PlanGridProps) => {
  const navigate = useNavigate();

  // Filter plans based on yearly toggle - show Free, Pro (Monthly/Annual based on toggle), and Lifetime
  const getFilteredPlans = () => {
    const freePlan = pricingPlans.find(plan => plan.name === 'FREE');
    const proPlan = pricingPlans.find(plan => 
      isYearly ? plan.name === 'PRO ANNUAL' : plan.name === 'PRO MONTHLY'
    );
    const lifetimePlan = pricingPlans.find(plan => plan.name === 'LIFETIME');
    
    return [freePlan, proPlan, lifetimePlan].filter(Boolean) as Plan[];
  };

  const handleSelectPlan = async (plan: Plan) => {
    // For free plan, just redirect to signup/dashboard
    if (plan.name === 'FREE') {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      } else {
        navigate('/enhance'); // Redirect to main app
      }
      return;
    }

    // Check if user is authenticated for paid plans
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Redirect to auth if not logged in
      navigate('/auth', { 
        state: { 
          returnTo: '/payment',
          plan: plan 
        } 
      });
      return;
    }

    // Navigate to payment page with plan details
    navigate('/payment', {
      state: {
        plan: plan
      }
    });
  };

  return (
        <div className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
              {getFilteredPlans().map((plan) => (
                <Card key={plan.name} className={`relative p-4 sm:p-5 lg:p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? 'border-2 border-primary shadow-md transform scale-102' : 'border-2 border-gray-200 hover:border-gray-300'
                }`}>
                  {(plan.popular || plan.badge) && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.popular ? "bg-primary text-white" : "bg-orange-500 text-white"
                      }`}>
                        {plan.popular ? "Most Popular" : plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-center mb-4 sm:mb-5">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        {plan.icon && <span className="text-lg sm:text-xl">{plan.icon}</span>}
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{plan.name}</h3>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">
                            /{plan.period === "lifetime" ? "lifetime" : plan.period}
                          </span>
                        </div>
                        
                        {plan.savings && (
                          <div className="mt-1">
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                              {plan.savings}
                            </span>
                          </div>
                        )}
                        
                        {plan.limitedQuantity && (
                          <p className="text-xs text-orange-600 font-medium mt-1">
                            {plan.limitedQuantity}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-5 sm:mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      plan.name === "FREE" 
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                        : plan.popular || plan.badge
                          ? "bg-primary text-white hover:bg-primary/90 shadow-md" 
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                    variant={plan.name === "FREE" ? "outline" : plan.popular || plan.badge ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
  );
};

export default PlansGrid;