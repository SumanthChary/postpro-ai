
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlanComparison = () => {
  const navigate = useNavigate();

  const features = {
    free: {
      included: [
        "7-Day Free Trial",
        "3 Post Enhancements",
        "50 Credits Included",
        "Basic AI Features",
        "Real-Time Trending Hashtags",
        "Manual Posting",
        "Watermark on AI-Enhanced Posts",
      ],
      notIncluded: [
        "Unlimited Post Enhancements",
        "Advanced AI Features",
        "Premium Templates",
        "Virality Score Predictor",
        "A/B Testing for Posts",
      ]
    },
    monthly: {
      included: [
        "Unlimited Post Enhancements",
        "320 Credits Included",
        "Advanced AI Tone & Style Suggestions",
        "Premium Templates (20+)",
        "Virality Score Predictor",
        "CTA Generator",
        "A/B Testing for Posts",
        "Advanced AI Chatbot",
        "AI-Powered Smart Dashboard",
      ],
      notIncluded: [
        "Premium Customer Support",
        "Early access to new features",
        "Personal Branding Toolkit",
        "Monthly Bonus Credits",
      ]
    },
    yearly: {
      included: [
        "All Monthly Features",
        "3,200 Credits Included",
        "50% OFF - Save $96/year",
        "Premium Customer Support",
        "Advanced AI for Content Strategy",
        "Early Access to New Features",
        "Personal Branding Toolkit",
        "Monthly Bonus Credits",
        "Priority Support",
        "Advanced Analytics Dashboard",
        "Cross-Platform Sharing",
      ],
      notIncluded: []
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">
        Compare Our <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Plans</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Free Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
            <p className="text-3xl font-bold mb-2">$0<span className="text-lg font-normal">/forever</span></p>
            <p className="text-sm text-green-600">7-Day Free Trial + 50 Credits</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Features:</h3>
            {features.free.included.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            <h3 className="font-semibold text-lg pt-4">Not Included:</h3>
            {features.free.notIncluded.map((feature, index) => (
              <div key={index} className="flex items-start text-gray-400">
                <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button 
            variant="outline"
            className="w-full mt-8"
            onClick={() => navigate("/subscription")}
          >
            Start Free Trial
          </Button>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-electric-purple relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-electric-purple text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Monthly Plan</h2>
            <p className="text-3xl font-bold mb-2">$8</p>
            <p className="text-sm text-green-600">320 Credits Included</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Features:</h3>
            {features.monthly.included.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            <h3 className="font-semibold text-lg pt-4">Not Included:</h3>
            {features.monthly.notIncluded.map((feature, index) => (
              <div key={index} className="flex items-start text-gray-400">
                <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-8 bg-electric-purple hover:bg-electric-purple/90"
            onClick={() => navigate("/subscription")}
          >
            Start Monthly Plan
          </Button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Yearly Plan</h2>
            <p className="text-3xl font-bold mb-2">$80<span className="text-lg font-normal">/year</span></p>
            <p className="text-sm text-green-600">50% OFF - Save $96/year + 3,200 Credits</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Features:</h3>
            {features.yearly.included.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-8 bg-electric-purple hover:bg-electric-purple/90"
            onClick={() => navigate("/subscription")}
          >
            Start Yearly Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
