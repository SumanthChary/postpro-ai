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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={() => {}}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="pt-24 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-primary mr-3" />
              <span className="text-lg font-semibold text-muted-foreground">Premium AI-Powered Growth</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Choose Your <span className="text-primary">Growth Plan</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Join thousands of professionals who trust PostPro AI to amplify their content and accelerate their growth
            </p>
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Verified className="w-4 h-4 text-primary mr-2" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Main Plans */}
          <div className="mt-20 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-8 items-center justify-center">
            {pricingPlans.filter(plan => plan.name !== "LIFETIME CREATOR").map((plan, index) => (
              <div 
                key={plan.name}
                className={`bg-card rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 relative backdrop-blur-sm ${
                  plan.popular 
                    ? "border-primary transform lg:scale-105 shadow-2xl bg-gradient-to-br from-card to-accent/10" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-4 right-6 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    plan.popular 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  }`}>
                    {plan.badge}
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-3">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.limitedQuantity || "Perfect for growing creators"}</p>
                  <div className="mt-8 mb-8">
                    {plan.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through mr-3">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-6xl font-extrabold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                      /{plan.period === "lifetime" ? "once" : plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      {plan.savings}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-5 text-foreground">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
                      <span className="text-base font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`mt-10 w-full text-center rounded-2xl py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg" 
                      : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/25"
                  }`}
                >
                  {plan.cta}
                </button>
                <p className="text-center text-sm text-muted-foreground mt-4 font-medium">30-day money-back guarantee • Cancel anytime</p>
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
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <Verified className="w-6 h-6 text-primary mr-3" />
                    <span className="text-foreground font-semibold">Bank-grade security</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <span className="text-foreground font-semibold">Instant activation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-primary mr-3" />
                    <span className="text-foreground font-semibold">24/7 support</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-semibold text-foreground mb-2">Trusted by 1000+ professionals worldwide</p>
                <p className="text-muted-foreground">PayPal • Razorpay • Credit Cards • Secure Checkout</p>
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