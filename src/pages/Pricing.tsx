import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Verified, Star } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUsername("");
        setAvatarUrl("");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }
      
      if (data) {
        setUsername(data.username || "User");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error: any) {
      console.error("Error in fetchUserProfile:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUsername("");
      setAvatarUrl("");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={() => {}}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Choose Your Growth Plan
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Start with our plans, upgrade when you're ready to accelerate
            </p>
          </div>

          {/* Main Plans */}
          <div className="mt-16 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-8 items-center justify-center">
            {pricingPlans.filter(plan => plan.name !== "LIFETIME CREATOR").map((plan, index) => (
              <div 
                key={plan.name}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 relative ${
                  plan.popular 
                    ? "border-blue-500 transform lg:scale-105 shadow-xl" 
                    : "border-transparent"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 right-5 px-3 py-1 rounded-full text-xs font-bold ${
                    plan.popular 
                      ? "bg-blue-600 text-white" 
                      : "bg-green-600 text-white"
                  }`}>
                    {plan.badge}
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{plan.limitedQuantity || "Perfect for growing creators"}</p>
                  <div className="mt-6">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through mr-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /{plan.period === "lifetime" ? "once" : plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <p className="text-sm font-medium text-green-600 mt-2">{plan.savings}</p>
                  )}
                </div>
                
                <ul className="mt-8 space-y-4 text-gray-600">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`mt-8 w-full text-center rounded-lg py-3 text-base font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:-translate-y-1 hover:shadow-lg" 
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  {plan.cta}
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">Cancel anytime</p>
              </div>
            ))}
          </div>

          {/* Lifetime Deal Section */}
          {pricingPlans.filter(plan => plan.name === "LIFETIME CREATOR").map((plan) => (
            <div key={plan.name} className="mt-24 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200 relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute -top-4 right-5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Limited Time - {plan.badge}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">One payment, everything forever. Includes all future features and VIP community access.</p>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold text-red-600">${plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-2xl font-medium text-gray-400 line-through ml-2">${plan.originalPrice}</span>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 text-center">
                <div className="text-red-600 font-bold mb-2">Offer ends in:</div>
                <CountdownTimer className="justify-center text-gray-800" />
                <button
                  onClick={() => handleSubscribe(plan)}
                  className="mt-4 w-full text-center rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-8 text-lg font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}

          {/* Trust Indicators */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center text-gray-600">
              <div className="flex items-center">
                <Verified className="w-5 h-5 text-blue-500 mr-2" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm">
                  <span>Secure payments via</span>
                </div>
                <div className="text-blue-600 font-semibold">Stripe</div>
                <div className="text-blue-600 font-semibold">PayPal</div>
                <div className="text-blue-600 font-semibold">Razorpay</div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500 italic">
              <p>"200+ professionals chose our plans this month"</p>
            </div>

            {/* Testimonials */}
            <div className="mt-12">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-50 px-2 text-gray-500">
                    <Star className="w-5 h-5 fill-current" />
                  </span>
                </div>
              </div>
              
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600">"PostPro AI has been a game-changer for my content strategy. The engagement boost is real!"</p>
                  <p className="mt-4 font-semibold text-gray-800">- Sarah J., Marketing Consultant</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600">"The annual plan is a no-brainer. The value you get for the price is incredible."</p>
                  <p className="mt-4 font-semibold text-gray-800">- Mike R., Startup Founder</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600">"I was skeptical, but the AI-enhanced posts actually perform better. Highly recommend!"</p>
                  <p className="mt-4 font-semibold text-gray-800">- David L., Tech Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;