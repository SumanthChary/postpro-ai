import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plan } from '@/types/pricing';
import { SimpleOrderSummary } from '@/components/payment/SimpleOrderSummary';
import { SimplePaymentMethod } from '@/components/payment/SimplePaymentMethod';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

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
    navigate('/enhance');
  };

  const handlePaymentError = (message: string) => {
    toast({
      title: "Payment Failed",
      description: message,
      variant: "destructive",
    });
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
          <button 
            onClick={() => navigate("/auth")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const planDetails: Plan = location.state?.planDetails || location.state?.plan || {
    id: 'professional',
    name: 'Starter Plan',
    price: 29,
    badge: '',
    features: ['Enhanced post creation with AI', 'Unlimited post enhancement', 'Advanced virality scoring', 'Priority customer support'],
    popular: false,
    originalPrice: 29
  };

  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Complete Your Subscription
          </h1>
          <p className="text-muted-foreground">
            Secure payment processing with enterprise-grade encryption
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Order Summary */}
          <SimpleOrderSummary planDetails={planDetails} />

          {/* Payment Method */}
          <SimplePaymentMethod
            planDetails={planDetails}
            userId={user?.id}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            paypalClientId={PAYPAL_CLIENT_ID}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;