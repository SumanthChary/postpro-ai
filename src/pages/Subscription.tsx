import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, CreditCard } from "lucide-react";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = (plan: string) => {
    toast({
      title: "Coming Soon",
      description: "Payment integration will be available shortly. Thank you for your interest!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-montserrat font-extrabold text-center mb-16">
        Choose Your <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">Subscription</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-8 hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Creator Plan</h2>
            <p className="text-3xl font-bold mb-2">$6.99<span className="text-lg font-normal">/week</span></p>
            <p className="text-sm text-gray-600">14-day trial available</p>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Unlimited Post Enhancements</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>AI Post Writer</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Premium Templates (20+)</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-electric-purple hover:bg-electric-purple/90"
            onClick={() => handleSubscribe('creator')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscribe Now
          </Button>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Business Plan</h2>
            <p className="text-3xl font-bold mb-2">$299<span className="text-lg font-normal">/year</span></p>
            <p className="text-sm text-gray-600">Save over 50% compared to weekly pricing!</p>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>All Creator Features</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Premium Support</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-electric-purple mr-2" />
              <span>Early Access to New Features</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-electric-purple hover:bg-electric-purple/90"
            onClick={() => handleSubscribe('business')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscribe Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;