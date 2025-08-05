import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CreditCard, Shield, Clock } from "lucide-react";

const FreeTrialSection = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate("/auth?trial=true");
  };

  return (
    <div className="text-center mb-8">
      <p className="text-lg text-gray-600 mb-6 font-medium">
        Start your 7-day free trial - experience premium AI enhancements risk-free
      </p>
      
      <Card className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">Premium Trial</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-green-600" />
            <span>7 days full access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CreditCard className="w-4 h-4 text-green-600" />
            <span>50 premium credits included</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Cancel anytime, no hidden fees</span>
          </div>
        </div>

        <Button 
          onClick={handleStartTrial}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Start Free Trial
        </Button>
        
        <p className="text-xs text-gray-500 mt-3">
          Card required for verification • No charges until day 8
        </p>
      </Card>
    </div>
  );
};

export default FreeTrialSection;