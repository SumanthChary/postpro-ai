import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@/types/pricing";

interface CardPaymentFormProps {
  planDetails: Plan;
  userId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const CardPaymentForm = ({
  planDetails,
  userId,
  onSuccess,
  onError,
}: CardPaymentFormProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    } else if (field === "cardName") {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.replace(/\s/g, "") || formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Please enter the cardholder name";
    }
    
    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid month";
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Card has expired";
      }
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // TODO: Implement Stripe integration here
      // This is a placeholder for the actual payment processing
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Payment Processing",
        description: "Card payment integration is being set up. Please use PayPal or Razorpay for now.",
        variant: "default",
      });
      
      // For now, we'll show this message and not process the payment
      onError("Card payment integration is coming soon. Please use PayPal or Razorpay.");
      
    } catch (error: any) {
      onError(error.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">
            Card Number
          </Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            maxLength={19}
            className={`h-12 text-base ${errors.cardNumber ? "border-destructive" : ""}`}
          />
          {errors.cardNumber && (
            <p className="text-sm text-destructive">{errors.cardNumber}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-sm font-medium text-foreground">
            Cardholder Name
          </Label>
          <Input
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={formData.cardName}
            onChange={(e) => handleInputChange("cardName", e.target.value)}
            className={`h-12 text-base ${errors.cardName ? "border-destructive" : ""}`}
          />
          {errors.cardName && (
            <p className="text-sm text-destructive">{errors.cardName}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-sm font-medium text-foreground">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              maxLength={5}
              className={`h-12 text-base ${errors.expiryDate ? "border-destructive" : ""}`}
            />
            {errors.expiryDate && (
              <p className="text-sm text-destructive">{errors.expiryDate}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-sm font-medium text-foreground">
              CVV
            </Label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              maxLength={4}
              className={`h-12 text-base ${errors.cvv ? "border-destructive" : ""}`}
            />
            {errors.cvv && (
              <p className="text-sm text-destructive">{errors.cvv}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <Lock className="w-4 h-4 text-primary" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isProcessing}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Pay ${planDetails.price}</span>
          </div>
        )}
      </Button>
    </form>
  );
};