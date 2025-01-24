import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  Wallet2, 
  AlertCircle,
  PaypalIcon,
  CreditCardIcon,
  SmartphoneIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "6.99",
    period: "week"
  };

  const handlePayment = (method: string) => {
    // In a real implementation, this would integrate with actual payment processors
    toast({
      title: "Processing Payment",
      description: `Initiating ${method} payment flow...`,
    });

    // Simulate payment success after 2 seconds
    setTimeout(() => {
      setShowSuccessDialog(true);
      // Here you would typically:
      // 1. Verify the payment on your backend
      // 2. Update user's subscription status
      // 3. Grant access to premium features
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: <PaypalIcon className="w-6 h-6" />,
      description: "Pay securely using your PayPal account",
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: <SmartphoneIcon className="w-6 h-6" />,
      description: "Quick payment with Google Pay",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCardIcon className="w-6 h-6" />,
      description: "Pay with your credit or debit card",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
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
                    Test Mode
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This is a test payment page. In production, this would connect
                      to actual payment processors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-6"
                  onClick={() => handlePayment(method.name)}
                >
                  <div className="flex items-center space-x-4">
                    {method.icon}
                    <div className="text-left">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm text-gray-500">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Need help? Contact support for assistance</p>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>
              Thank you for your purchase. Your subscription is now active and you
              have access to all premium features and templates.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/features");
              }}
            >
              View Features
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;