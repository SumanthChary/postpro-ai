import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Verified } from "lucide-react";
import PlanCard from "@/components/pricing/PlanCard";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/button";

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
        setUsername(data.username || "");
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

  const lifetimePlan = pricingPlans.find((plan) => plan.name === "LIFETIME CREATOR");
  const oneTimePlan = pricingPlans.find(
    (plan) => plan.name.toLowerCase().includes("one-time") || plan.badge?.toLowerCase().includes("one-time"),
  );
  const subscriptionPlans = pricingPlans.filter((plan) => plan.period !== "lifetime");

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
              Pay Once. Ship Better Posts Forever.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Unlock Post Enhancer for $2.99 or go all in with Post Enhancer Plus for $4.99—both are lifetime licenses with zero renewals.
            </p>
          </div>
          <div className="mt-16 max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>

          {(lifetimePlan || oneTimePlan) && (
            <div className="mt-20 max-w-5xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {lifetimePlan && (
                <div className="relative overflow-hidden rounded-[32px] border-[3px] border-red-200 bg-white shadow-xl">
                  <div className="absolute top-6 right-6 rounded-full bg-red-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Limited Time • 300 Spots
                  </div>
                  <div className="p-8 sm:p-10">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{lifetimePlan.name}</h2>
                        <p className="mt-3 text-base text-gray-600">
                          One payment. Every feature forever. Includes all upcoming launches.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-5xl font-extrabold text-red-600">${lifetimePlan.price}</span>
                        {lifetimePlan.originalPrice && (
                          <span className="text-2xl text-gray-400 line-through">
                            ${lifetimePlan.originalPrice}
                          </span>
                        )}
                      </div>

                      <ul className="space-y-3">
                        {lifetimePlan.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                            <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                          Offer ends in
                        </p>
                        <div className="mt-3 inline-flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4 md:justify-start">
                          <CountdownTimer className="text-red-600" />
                        </div>
                      </div>

                      <Button
                        className="w-full rounded-xl bg-red-600 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-red-700"
                        onClick={() => handleSubscribe(lifetimePlan)}
                      >
                        {lifetimePlan.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {oneTimePlan && (
                <div className="flex flex-col gap-5 rounded-[32px] border-2 border-blue-100 bg-white/95 p-6 sm:p-8 shadow-lg">
                  <span className="w-fit rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    One-time unlock
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Try the enhancer forever for just ${oneTimePlan.price}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Lifetime access without a subscription. Perfect for testing the full experience at your own pace.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {oneTimePlan.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
                    onClick={() => handleSubscribe(oneTimePlan)}
                  >
                    {oneTimePlan.cta}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="text-blue-600 font-semibold">PayPal</div>
                <div className="text-blue-600 font-semibold">Razorpay</div>
                <div className="text-blue-600 font-semibold">DoDo Payments</div>
                <div className="flex items-center">
                  <Verified className="w-5 h-5 text-green-500 mr-2" />
                  <span>Secure one-time payment</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500 italic">
              <p>"Creators love owning the enhancer without monthly fees"</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;