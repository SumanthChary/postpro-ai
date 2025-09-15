
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { EnhancedPlanSummary } from "@/components/payment/EnhancedPlanSummary";
import { EnhancedPaymentOptions } from "@/components/payment/EnhancedPaymentOptions";
import { CouponCode } from "@/components/payment/CouponCode";
import { ContactSupport } from "@/components/payment/ContactSupport";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  
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
      } catch (error) {
        const err = error as Error;
        console.error("Payment auth check error:", err);
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

  const handleApplyCoupon = (code: string, discount: number) => {
    setAppliedCoupon({ code, discount });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-destructive mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-8 text-lg">{authError}</p>
          <Button 
            onClick={() => navigate("/auth")}
            size="lg"
            className="px-8"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Back Button - Top Left */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/pricing")}
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
              alt="PostPro AI" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain mr-3"
            />
            <span className="text-2xl sm:text-3xl font-bold text-foreground">PostPro AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Complete Your Purchase</h1>
          <p className="text-muted-foreground text-lg">Secure checkout • Instant access • 30-day money-back guarantee</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column - Plan Summary */}
          <div className="lg:col-span-2">
            <EnhancedPlanSummary 
              planDetails={planDetails} 
              appliedCoupon={appliedCoupon}
            />
          </div>

          {/* Right Column - Payment & Checkout */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Payment Methods */}
            {user && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <EnhancedPaymentOptions 
                  planDetails={{
                    ...planDetails,
                    price: appliedCoupon 
                      ? (parseFloat(planDetails.price) * (1 - appliedCoupon.discount / 100)).toFixed(2)
                      : planDetails.price
                  }}
                  userId={user.id}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  paypalClientId={PAYPAL_CLIENT_ID}
                />
              </div>
            )}

            {/* Coupon Code - Below Payment Methods */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <CouponCode 
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            </div>
          </div>
        </div>

        {/* Contact Support - Bottom */}
        <div className="mt-12 max-w-2xl mx-auto">
          <ContactSupport />
        </div>
      </div>
    </div>
  );
};

export default Payment;
