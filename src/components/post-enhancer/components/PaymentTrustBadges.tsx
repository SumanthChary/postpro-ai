
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PaymentTrustBadges = () => {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate("/payment");
  };

  return (
    <Card className="p-4 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg border">
        <span className="text-sm text-gray-600 font-medium">Secure payments via:</span>
        <button 
          onClick={handlePaymentRedirect}
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <img 
            src="/lovable-uploads/14ae3ece-1f14-4d00-943b-e0b05db11ddd.png" 
            alt="PayPal" 
            className="h-6 w-6"
          />
          <span className="text-sm font-medium text-blue-600">PayPal</span>
        </button>
        <button 
          onClick={handlePaymentRedirect}
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <img 
            src="/lovable-uploads/ee9548c4-72d9-4354-adff-ef4509dfb8e3.png" 
            alt="Razorpay" 
            className="h-6 w-6"
          />
          <span className="text-sm font-medium text-blue-600">Razorpay</span>
        </button>
      </div>
    </Card>
  );
};
