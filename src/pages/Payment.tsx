import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Wallet2 } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";

const PAYPAL_CLIENT_ID = "AUAlOzak-yTYorC9Iz4-u4VFApYVxgbvNGHZvTxqfCxPnzoJoyI6-bqCfEtJAwXbfRBlmuxPuLdOkO_j";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "6.99",
    period: "week"
  };

  const handlePayPalApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const order = await actions.order.capture();
      
      // Call our Supabase Edge Function to handle the payment
      const { data: paymentResult, error } = await supabase.functions.invoke('handle-payment', {
        body: {
          orderId: order.id,
          subscriptionTier: planDetails.name,
        },
      });

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated.",
        duration: 5000,
      });

      // Redirect to dashboard or home page
      navigate("/");
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">
            You're subscribing to {planDetails.name} at ${planDetails.price}/{planDetails.period}
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Payment Information
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
              <PayPalScriptProvider options={{ 
                "client-id": PAYPAL_CLIENT_ID,
                currency: "USD",
              }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: planDetails.price,
                          currency_code: "USD"
                        },
                        description: `${planDetails.name} Subscription`
                      }]
                    });
                  }}
                  onApprove={handlePayPalApprove}
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