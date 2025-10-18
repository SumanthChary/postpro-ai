import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { Verified } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", {
      state: { plan }
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Own Your Enhancer Forever
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose between the $2.99 Post Enhancer and the $4.99 Post Enhancer Plus—pay once, keep the power forever.
          </p>
        </div>

        <div className="w-full mx-auto px-4 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {pricingPlans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center text-gray-600">
            <div className="flex items-center space-x-6">
              <div className="text-blue-600 font-semibold">PayPal</div>
              <div className="text-blue-600 font-semibold">Razorpay</div>
              <div className="flex items-center">
                <Verified className="w-5 h-5 text-green-500 mr-2" />
                <span>Secure one-time payment</span>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 italic">
              <p>"Pay once, keep shipping better posts forever"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;