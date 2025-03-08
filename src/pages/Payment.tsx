
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlanSummary } from "@/components/payment/PlanSummary";
import { PaymentNotice } from "@/components/payment/PaymentNotice";
import { PaymentOptions } from "@/components/payment/PaymentOptions";
import { useAuth } from "@/hooks/useAuth";

const PAYPAL_CLIENT_ID = "AUAlOzak-yTYorC9Iz4-u4VFApYVxgbvNGHZvTxqfCxPnzoJoyI6-bqCfEtJAwXbfRBlmuxPuLdOkO_j";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, loading } = useAuth();
  
  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "25",
    period: "month",
    credits: 500
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    navigate("/enhance");
  };

  const handlePaymentError = (message: string) => {
    toast({
      title: "Error Recording Payment",
      description: message,
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <PlanSummary planDetails={planDetails} />

        <Card className="p-6 mb-6 bg-white">
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
