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

  // Show all actual pricing plans
  const getFilteredPlans = () => {
    return pricingPlans;
  };

  const handleSelectPlan = async (plan: Plan) => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`relative p-5 sm:p-6 lg:p-8 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  plan.popular ? 'border-2 border-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-white' : 'border-2 border-gray-200 hover:border-blue-300 bg-white'
                }`}>
                  {(plan.popular || plan.badge) && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg ${
                        plan.popular ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                      }`}>
                        {plan.popular ? "Most Popular" : plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {plan.icon && <span className="text-xl sm:text-2xl">{plan.icon}</span>}
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">{plan.name}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-sm sm:text-base text-gray-600 font-medium">
                            /{plan.period === "lifetime" ? "lifetime" : plan.period}
                          </span>
                        </div>
                        
                        {plan.originalPrice && (
                          <div className="mt-2">
                            <span className="text-sm sm:text-base text-gray-500 line-through">
                              ${plan.originalPrice}
                            </span>
                          </div>
                        )}
                        
                        {plan.savings && (
                          <div className="mt-2">
                            <span className="inline-block bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                              {plan.savings}
                            </span>
                          </div>
                        )}
                        
                        {plan.limitedQuantity && (
                          <p className="text-xs sm:text-sm text-orange-600 font-semibold mt-2">
                            {plan.limitedQuantity}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    className={`w-full py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 rounded-xl ${
                      plan.popular 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl" 
                        : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"
                    }`}
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