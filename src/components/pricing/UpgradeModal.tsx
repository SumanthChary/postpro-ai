import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Zap, Crown, Sparkles, ArrowRight } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingCredits?: number;
}

const UpgradeModal = ({ isOpen, onClose, remainingCredits = 0 }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = (planType: "professional" | "lifetime") => {
    onClose();
    navigate("/subscription", { state: { selectedPlan: planType } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            You've Experienced the Power!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">
            {remainingCredits > 0 
              ? `Only ${remainingCredits} credits remaining in your trial` 
              : "Your trial credits have been used up"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Keep creating viral content with unlimited access
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Professional Plan */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 relative">
            <Badge className="absolute -top-2 left-4 bg-blue-600 text-white">
              Most Popular
            </Badge>
            
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Professional Plan</h3>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold">$15</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Unlimited AI enhancements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Advanced tone & style control</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handleUpgrade("professional")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue with Professional
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Lifetime Deal */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 relative">
            <Badge className="absolute -top-2 left-4 bg-purple-600 text-white">
              Best Value
            </Badge>
            
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-lg">Lifetime Deal</h3>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold">$45</span>
              <span className="text-gray-600"> once</span>
              <div className="text-xs text-green-600 font-medium">
                Save $135/year vs monthly
              </div>
            </div>
            
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>500 premium enhancements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>All professional features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Lifetime access, no monthly fees</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handleUpgrade("lifetime")}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Secure Lifetime Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            ✨ Join 2,847+ professionals who chose to continue their success story
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;