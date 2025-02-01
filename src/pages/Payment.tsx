import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CreditCard } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";

const PAYPAL_CLIENT_ID = "AUAlOzak-yTYorC9Iz4-u4VFApYVxgbvNGHZvTxqfCxPnzoJoyI6-bqCfEtJAwXbfRBlmuxPuLdOkO_j";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "25",
    period: "month"
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('payments')
        .insert([
          {
            user_id: user?.id,
            amount: parseFloat(planDetails.price),
            currency: 'USD',
            payment_method: 'paypal',
            status: 'completed',
            transaction_id: orderId,
            subscription_tier: planDetails.name
          }
        ]);

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: `You are now subscribed to the ${planDetails.name}`,
        duration: 5000,
      });

      navigate("/enhance");
    } catch (error: any) {
      console.error('Payment recording error:', error);
      toast({
        title: "Error Recording Payment",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-custom-text mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">
            {planDetails.name} - ${planDetails.price}/{planDetails.period}
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Secure Payment
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your subscription will start immediately after successful payment.
                      You can cancel anytime from your account settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full min-h-[150px]"> {/* Added fixed height container */}
                <PayPalScriptProvider options={{ 
                  clientId: PAYPAL_CLIENT_ID,
                  currency: "USD",
                  intent: "CAPTURE"
                }}>
                  <PayPalButtons
                    style={{ 
                      layout: "vertical",
                      height: 48 // Explicitly set height
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                          amount: {
                            value: planDetails.price,
                            currency_code: "USD"
                          },
                          description: `${planDetails.name} Subscription`
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        const order = await actions.order.capture();
                        await handlePaymentSuccess(order.id);
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      toast({
                        title: "Payment Error",
                        description: "There was an error processing your PayPal payment.",
                        variant: "destructive",
                      });
                    }}
                    disabled={isProcessing}
                  />
                </PayPalScriptProvider>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or pay with card</span>
                </div>
              </div>

              <Button
                className="w-full bg-electric-purple hover:bg-electric-purple/90"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Card payments will be available shortly.",
                  });
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Card
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
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