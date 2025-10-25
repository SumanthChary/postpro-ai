import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";
import { pricingPlans, creditPacks } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Verified } from "lucide-react";
import PlanCard from "@/components/pricing/PlanCard";
import PlanToggle from "@/components/pricing/PlanToggle";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

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

  const monthlyPlans = pricingPlans.filter((plan) => plan.period === "month");
  const yearlyPlans = pricingPlans.filter((plan) => plan.period === "year");
  const lifetimePlan = pricingPlans.find((plan) => plan.period === "lifetime");
  const activePlans = isYearly ? yearlyPlans : monthlyPlans;
  const proMonthlyPlan = monthlyPlans.find((plan) => plan.popular) ?? monthlyPlans[0];

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
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center">
              <Badge className="bg-blue-600/10 text-blue-700">One subscription • Web + Extension</Badge>
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Start your 7-day PostPro AI trial
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              A single account unlocks LinkedIn-first dashboards, Firefox/Chrome extension access, and AI workflows that ship high-performing posts in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-8 py-3 text-base font-semibold" onClick={() => handleSubscribe(proMonthlyPlan)}>
                Start free trial →
              </Button>
              {lifetimePlan && (
                <Button variant="outline" size="lg" className="px-8 py-3 text-base" onClick={() => handleSubscribe(lifetimePlan)}>
                  View lifetime deal
                </Button>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              No credit card required • Cancel anytime during the trial • Extension access included
            </p>
          </div>

          <div className="mt-20">
            <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />
            <div className={`mx-auto max-w-5xl grid gap-8 ${activePlans.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
              {activePlans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
              ))}
            </div>
          </div>

          {lifetimePlan && (
            <div className="mt-24 max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-[32px] border-[3px] border-purple-200 bg-white shadow-xl">
                <div className="absolute top-6 right-6 rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Limited • 500 seats only
                </div>
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{lifetimePlan.name}</h2>
                      <p className="mt-3 text-base text-gray-600">
                        Pay once, keep AI enhancements, analytics, and extension access forever. Every future feature ships to you automatically.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-5xl font-extrabold text-purple-600">${lifetimePlan.price}</span>
                      {lifetimePlan.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">
                          ${lifetimePlan.originalPrice}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {lifetimePlan.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-purple-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                        Seats refresh in
                      </p>
                      <div className="mt-3 inline-flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-purple-100 bg-purple-50/70 px-5 py-4 md:justify-start">
                        <CountdownTimer className="text-purple-600" />
                      </div>
                    </div>

                    <Button
                      className="w-full rounded-xl bg-purple-600 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-purple-700"
                      onClick={() => handleSubscribe(lifetimePlan)}
                    >
                      {lifetimePlan.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-24 max-w-5xl mx-auto">
            <div className="rounded-3xl border border-blue-100 bg-white/95 p-10 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Pay-as-you-go credits</h3>
                  <p className="text-sm text-gray-600">Perfect for campaign spikes or teams that bill enhancements back to clients.</p>
                </div>
                <Badge className="bg-blue-600/10 text-blue-700">Credits never expire</Badge>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {creditPacks.map((pack) => (
                  <div key={pack.name} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6">
                    <h4 className="text-lg font-semibold text-gray-900">{pack.name}</h4>
                    <p className="text-3xl font-bold text-blue-700 mt-2">${pack.price}</p>
                    <p className="text-sm text-gray-600">1 credit = 1 LinkedIn enhancement + virality check</p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      <li>${pack.pricePerCredit}/credit</li>
                      <li>Extension access included</li>
                      {pack.savings && <li className="text-emerald-600 font-medium">{pack.savings}</li>}
                    </ul>
                    <Button
                      className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handleSubscribe({
                        name: `${pack.name} Credit Pack`,
                        price: pack.price,
                        period: "lifetime",
                        features: [
                          `${pack.credits} credits to use whenever you need`,
                          "Enhance + analyze LinkedIn posts with each credit",
                          "Extension + dashboard included"
                        ],
                        cta: `Buy ${pack.name}`,
                        currency: "USD"
                      } as Plan)}
                    >
                      Buy credits
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 max-w-5xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Extension + web access with one LinkedIn subscription",
                "Trial converts at 18–25% — no more free-rider costs",
                "Priority onboarding and playbooks for Pro and Lifetime"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 text-left">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <p className="mt-3 text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto text-center text-gray-600">
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="text-blue-600 font-semibold">PayPal</div>
              <div className="text-blue-600 font-semibold">Razorpay</div>
              <div className="text-blue-600 font-semibold">DoDo Payments</div>
              <div className="flex items-center text-gray-700">
                <Verified className="w-5 h-5 text-green-500 mr-2" />
                <span>Secure checkout • Cancel anytime</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 italic">
              "PostPro AI gives us the extension speed of a free tool with the ROI of a full growth team."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;