
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlanComparison = () => {
  const navigate = useNavigate();

  const features = {
    free: {
      included: [
        "3-5 LinkedIn posts optimization per week",
        "Basic tone analysis",
        "Real-Time Trend Hashtags",
        "Standard templates (5 templates)",
        "Basic analytics",
      ],
      notIncluded: [
        "Unlimited Post Enhancements",
        "AI Post Writer",
        "Advanced tone analysis",
        "Engagement predictions",
        "Premium templates",
      ]
    },
    creator: {
      included: [
        "Unlimited Post Enhancements",
        "AI Post Writer",
        "Advanced tone analysis",
        "Engagement predictions",
        "Premium templates (20+ templates)",
        "Cross-Platform Sharing",
        "Teams collaboration",
        "CTA Generator",
      ],
      notIncluded: [
        "Premium Support",
        "Early access to new features",
        "Advanced analytics dashboard",
        "API integration",
      ]
    },
    business: {
      included: [
        "All Creator Features",
        "Premium Support",
        "Early access to new features",
        "Premium templates (20+ templates)",
        "Advanced analytics dashboard",
        "API integration",
        "Personal Branding Tools",
        "Priority customer support",
        "Dedicated account manager",
      ],
      notIncluded: []
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-montserrat font-bold text-center mb-16">
        Compare Our <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Plans</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Free Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
            <p className="text-3xl font-bold mb-2">$0<span className="text-lg font-normal">/forever</span></p>
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
            Start Free
          </Button>
        </div>

        {/* Creator Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-electric-purple relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-electric-purple text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Creator Plan</h2>
            <p className="text-3xl font-bold mb-2">$20<span className="text-lg font-normal">/month</span></p>
            <p className="text-sm text-green-600">Save 15% compared to weekly</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Features:</h3>
            {features.creator.included.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            <h3 className="font-semibold text-lg pt-4">Not Included:</h3>
            {features.creator.notIncluded.map((feature, index) => (
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
            Start Creator Plan
          </Button>
        </div>

        {/* Business Plan */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Business Plan</h2>
            <p className="text-3xl font-bold mb-2">$99<span className="text-lg font-normal">/year</span></p>
            <p className="text-sm text-green-600">Special 1st year pricing - Save $270.99</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Features:</h3>
            {features.business.included.map((feature, index) => (
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
            Start Business Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
