
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlanSummary } from "@/components/payment/PlanSummary";
import { PaymentNotice } from "@/components/payment/PaymentNotice";
import { PaymentOptions } from "@/components/payment/PaymentOptions";
import { supabase } from "@/integrations/supabase/client";

// Use environment variable or fallback to test key
const PAYPAL_CLIENT_ID = "AUAlOzak-yTYorC9Iz4-u4VFApYVxgbvNGHZvTxqfCxPnzoJoyI6-bqCfEtJAwXbfRBlmuxPuLdOkO_j";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "25",
    period: "month",
    credits: 500
  };

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error("Auth error in Payment:", error);
          setAuthError("Authentication error occurred");
          setLoading(false);
          return;
        }
        
        if (!session?.user) {
          setAuthError("Please sign in to continue with payment");
          toast({
            title: "Authentication Required",
            description: "Please sign in to subscribe to a plan",
            variant: "destructive",
          });
          setTimeout(() => navigate("/auth"), 2000);
          return;
        }
        
        setUser(session.user);
        setAuthError(null);
      } catch (error: any) {
        console.error("Payment auth check error:", error);
        setAuthError("Unable to verify authentication");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuthError("Session expired, please sign in again");
        navigate("/auth");
      } else if (session?.user) {
        setUser(session.user);
        setAuthError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    toast({
      title: "Payment Successful!",
      description: "Welcome to your new plan!",
    });
    navigate("/enhance");
  };

  const handlePaymentError = (message: string) => {
    console.error("Payment error:", message);
    toast({
      title: "Payment Error",
      description: message || "Something went wrong with your payment",
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">{authError}</p>
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <PlanSummary planDetails={planDetails} />

        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
          <div className="space-y-6">
            <PaymentNotice showCreditsInfo={!!planDetails.credits} />

            {user && (
              <PaymentOptions 
                planDetails={planDetails}
                userId={user.id}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                paypalClientId={PAYPAL_CLIENT_ID}
              />
            )}

            <Button
              variant="outline"
              className="w-full bg-white/80 border-gray-200/50 hover:bg-gray-50/80"
              onClick={() => navigate(-1)}
              disabled={isProcessing}
            >
              Go Back
            </Button>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Need help? Contact support for assistance</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
