
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PaymentTrustBadges = () => {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate("/payment");
  };

  return (
    <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-12">
        <span className="text-sm text-gray-500 font-medium">Secure payments via:</span>
        <button 
          onClick={handlePaymentRedirect}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <img 
            src="/lovable-uploads/14ae3ece-1f14-4d00-943b-e0b05db11ddd.png" 
            alt="PayPal" 
            className="h-8 w-8"
          />
          <span className="text-sm font-medium text-gray-700">PayPal</span>
        </button>
        <button 
          onClick={handlePaymentRedirect}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <img 
            src="/lovable-uploads/ee9548c4-72d9-4354-adff-ef4509dfb8e3.png" 
            alt="Razorpay" 
            className="h-8 w-8"
          />
          <span className="text-sm font-medium text-gray-700">Razorpay</span>
        </button>
      </div>
    </Card>
  );
};
