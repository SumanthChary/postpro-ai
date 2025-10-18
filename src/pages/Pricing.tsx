import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/Footer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Verified } from "lucide-react";
import PlanCard from "@/components/pricing/PlanCard";

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
            {pricingPlans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="text-blue-600 font-semibold">PayPal</div>
                <div className="text-blue-600 font-semibold">Razorpay</div>
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