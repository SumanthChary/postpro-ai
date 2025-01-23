import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Wallet2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const planDetails = location.state?.plan || {
    name: "Creator Plan",
    price: "6.99",
    period: "week"
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment System Coming Soon",
      description: "Our payment system is currently being integrated. We'll notify you once it's ready!",
      duration: 5000,
    });
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Payment Method
              </label>
              <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="googlepay">Google Pay</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Payment Notice
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Card payments will be available soon. For now, please use one of the available payment methods.
                      After payment confirmation, you'll receive access to your selected plan features.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-electric-purple hover:bg-electric-purple/90"
              onClick={handlePayment}
            >
              <Wallet2 className="w-4 h-4 mr-2" />
              Pay Now
            </Button>

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
    </div>
  );
};

export default Payment;