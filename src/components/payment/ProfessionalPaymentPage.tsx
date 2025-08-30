import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, CreditCard, Lock, CheckCircle } from "lucide-react";

const ProfessionalPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const planDetails = location.state?.plan || {
    name: "Pro Monthly",
    price: "39",
    period: "month"
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error in Payment:", error);
          setLoading(false);
          return;
        }
        
        if (!session?.user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to subscribe to a plan",
            variant: "destructive"
          });
          navigate("/auth", { 
            state: { 
              returnTo: "/payment",
              plan: planDetails 
            } 
          });
          return;
        }
        
        setUser({ id: session.user.id });
      } catch (error) {
        console.error("Error checking auth:", error);
        toast({
          title: "Error",
          description: "Failed to verify authentication",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast, planDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Secure checkout powered by industry-leading payment processors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="p-6 sm:p-8 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">{planDetails.name}</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${planDetails.price}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Billed {planDetails.period === 'lifetime' ? 'once' : `per ${planDetails.period}`}
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${planDetails.price}
                </span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500 mr-2" />
                30-day money-back guarantee
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Lock className="w-4 h-4 text-green-500 mr-2" />
                SSL encrypted & secure payment
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            {/* Payment Buttons */}
            <div className="space-y-4">
              <Button 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  toast({
                    title: "Payment Processing",
                    description: "Redirecting to secure payment...",
                  });
                }}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Credit Card
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-50"
                onClick={() => {
                  toast({
                    title: "PayPal Payment",
                    description: "Redirecting to PayPal...",
                  });
                }}
              >
                Pay with PayPal
              </Button>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Your payment is secure</p>
                  <p>We use bank-level encryption and never store your payment details. Your subscription will be activated immediately upon successful payment.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Support */}
        <div className="text-center mt-8 pt-8 border-t">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-primary hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPaymentPage;