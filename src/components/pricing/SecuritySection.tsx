
import { Shield } from "lucide-react";

const SecuritySection = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Security & Trust</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-electric-purple" />
          <span>Secure SSL Encryption</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-electric-purple" />
          <span>PayPal Verified Partner</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-electric-purple" />
          <span>Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
