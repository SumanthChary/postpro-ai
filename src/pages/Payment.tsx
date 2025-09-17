
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

  const finalPrice = appliedCoupon 
    ? (parseFloat(planDetails.price) * (1 - appliedCoupon.discount / 100)).toFixed(2)
    : planDetails.price;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl">
          
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
          <header className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Secure Checkout</h1>
          </header>

          <div className="mt-8 space-y-8">
            
            {/* Order Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">{planDetails.name} ({planDetails.period})</p>
                  <p className="font-medium">${planDetails.price}</p>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <p>Discount ({appliedCoupon.code})</p>
                    <p>-${(parseFloat(planDetails.price) * appliedCoupon.discount / 100).toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${finalPrice}</p>
                </div>
                <div className="border-t border-border my-4"></div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${finalPrice}</p>
                </div>
              </div>
            </div>

            {/* Money-back Guarantee */}
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-6 flex items-center gap-4">
              <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="font-bold text-primary">30-Day Money-Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
              </div>
            </div>

            {/* Payment Methods */}
            {user && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Choose your payment method</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>256-bit SSL encrypted • PCI DSS compliant</span>
                  </div>
                </div>
                <EnhancedPaymentOptions 
                  planDetails={{
                    ...planDetails,
                    price: finalPrice
                  }}
                  userId={user.id}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  paypalClientId={PAYPAL_CLIENT_ID}
                />
              </div>
            )}

            {/* Coupon Code */}
            <div className="bg-card border border-border rounded-lg p-6">
              <CouponCode 
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            </div>

            {/* Pay Button */}
            {user && (
              <div className="mt-8">
                <button 
                  className="w-full rounded-lg bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/50"
                  disabled={isProcessing}
                  onClick={() => {
                    // This will be handled by the payment method components
                    toast({
                      title: "Select Payment Method",
                      description: "Please choose a payment method above to proceed.",
                      variant: "default",
                    });
                  }}
                >
                  {isProcessing ? "Processing..." : `Pay $${finalPrice}`}
                </button>
                <p className="mt-4 text-center text-sm text-muted-foreground">Cancel anytime, no hidden fees.</p>
              </div>
            )}

            {/* Security Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-medium">Secure SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs font-medium">PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
