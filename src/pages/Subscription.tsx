
import { useState } from "react";
import Footer from "@/components/Footer";
import RedeemCodeDialog from "@/components/pricing/RedeemCodeDialog";
import SubscriptionHeader from "@/components/pricing/SubscriptionHeader";
import PlanToggle from "@/components/pricing/PlanToggle";
import PlansGrid from "@/components/pricing/PlansGrid";
import AdditionalInfo from "@/components/pricing/AdditionalInfo";

const Subscription = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-lavender/50 to-transparent">
      <div className="container mx-auto px-4 py-16">
        <SubscriptionHeader />
        
        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        
        <div className="flex justify-center mb-8">
          <RedeemCodeDialog />
        </div>

        <PlansGrid isYearly={isYearly} />

        <AdditionalInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
