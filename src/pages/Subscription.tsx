
import { useState } from "react";
import Footer from "@/components/Footer";
import SubscriptionHeader from "@/components/pricing/SubscriptionHeader";
import PlanToggle from "@/components/pricing/PlanToggle";
import PlansGrid from "@/components/pricing/PlansGrid";
import AdditionalInfo from "@/components/pricing/AdditionalInfo";

const Subscription = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      <div className="container mx-auto px-4 py-16">
        <SubscriptionHeader />
        
        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <PlansGrid isYearly={isYearly} />

        <AdditionalInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
