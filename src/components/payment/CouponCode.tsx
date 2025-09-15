import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tag, X } from "lucide-react";

interface CouponCodeProps {
  onApplyCoupon: (code: string, discount: number) => void;
  appliedCoupon?: { code: string; discount: number } | null;
  onRemoveCoupon: () => void;
}

export const CouponCode = ({ onApplyCoupon, appliedCoupon, onRemoveCoupon }: CouponCodeProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  // Mock coupon validation - replace with actual API call
  const validateCoupon = async (code: string) => {
    const validCoupons: Record<string, number> = {
      "SAVE10": 10,
      "WELCOME20": 20,
      "EARLY30": 30,
    };
    
    return validCoupons[code.toUpperCase()] || null;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    setIsApplying(true);
    
    try {
      const discount = await validateCoupon(couponCode);
      
      if (discount) {
        onApplyCoupon(couponCode.toUpperCase(), discount);
        toast({
          title: "Coupon Applied",
          description: `${discount}% discount applied successfully!`,
        });
        setCouponCode("");
      } else {
        toast({
          title: "Invalid Coupon",
          description: "This coupon code is not valid or has expired",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply coupon code",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Coupon Applied: {appliedCoupon.code}
            </span>
            <span className="text-sm text-green-600">
              -{appliedCoupon.discount}% discount
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveCoupon}
            className="text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Tag className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Have a coupon code?</span>
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
        />
        <Button
          onClick={handleApplyCoupon}
          disabled={isApplying || !couponCode.trim()}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </div>
    </div>
  );
};