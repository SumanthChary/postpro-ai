
import { useNavigate } from "react-router-dom";

export const PaymentTrustBadges = () => {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate("/payment");
  };

  return (
    <div className="py-6">
      <div className="text-center space-y-4">
        <h3 className="text-sm text-gray-600 font-medium">Trustable payments through</h3>
        <div className="flex items-center justify-center gap-8">
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
      </div>
    </div>
  );
};
