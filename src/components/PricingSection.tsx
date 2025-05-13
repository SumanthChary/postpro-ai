
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import SeeFullFeaturesButton from "./pricing/SeeFullFeaturesButton";
import RedeemCodeDialog from "./pricing/RedeemCodeDialog";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { Card } from "./ui/card";
import { Timer } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0 });
  
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", { state: { plan } });
  };

  const handleSeeFullFeatures = () => {
    navigate("/subscription");
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59 };
        }
        return prevTime;
      });
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-2">Choose Your Perfect Plan</h2>
      <p className="text-center mb-4 max-w-md mx-auto">Don't just post. <span className="text-electric-purple font-medium">Grow your audience</span> with AI-enhanced content.</p>
      
      {/* Limited Time Banner */}
      <Card className="mx-auto max-w-md mb-8 p-3 border-electric-purple bg-light-lavender/30">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-electric-purple">
          <Timer className="w-4 h-4" />
          <span>Special offer expires in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            onSubscribe={handleSubscribe} 
          />
        ))}
      </div>
      
      <div className="max-w-md mx-auto text-center mt-8">
        <p className="text-sm text-gray-600 mb-4">
          "I was struggling with daily content. Now I schedule a week's worth of posts in just 30 minutes!" - Sarah K.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <SeeFullFeaturesButton onClick={handleSeeFullFeatures} />
          <RedeemCodeDialog />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
