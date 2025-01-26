import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";

const PAYPAL_CLIENT_ID = "AUAlOzak-yTYorC9Iz4-u4VFApYVxgbvNGHZvTxqfCxPnzoJoyI6-bqCfEtJAwXbfRBlmuxPuLdOkO_j";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePaymentSuccess = async (orderId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a payment",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('payments')
        .insert([
          {
            user_id: session.user.id,
            amount: 25.00,
            currency: 'USD',
            payment_method: 'paypal',
            status: 'completed',
            transaction_id: orderId,
            subscription_tier: 'Creator Plan'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: "You are now subscribed to the Creator Plan",
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-montserrat font-extrabold text-center mb-16">
        Choose Your <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Subscription</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-8 hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Creator Plan</h2>
            <p className="text-3xl font-bold mb-2">$6.99<span className="text-lg font-normal">/week</span></p>
            <p className="text-sm text-gray-600">14-day trial available</p>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Unlimited Post Enhancements</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>AI Post Writer</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Premium Templates (20+)</span>
            </li>
          </ul>
          <PayPalScriptProvider options={{ 
            clientId: PAYPAL_CLIENT_ID,
            currency: "USD",
            intent: "CAPTURE"
          }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: {
                      value: "25.00",
                      currency_code: "USD"
                    },
                    description: "Creator Plan Subscription"
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
                  description: "There was an error processing your payment. Please try again.",
                  variant: "destructive",
                });
              }}
            />
          </PayPalScriptProvider>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Business Plan</h2>
            <p className="text-3xl font-bold mb-2">$299<span className="text-lg font-normal">/year</span></p>
            <p className="text-sm text-gray-600">Save over 50% compared to weekly pricing!</p>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>All Creator Features</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Premium Support</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Early Access to New Features</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-electric-purple hover:bg-electric-purple/90"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Business Plan payments will be available shortly.",
              });
            }}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscribe Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;