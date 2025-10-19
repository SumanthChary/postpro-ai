import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import PlanToggle from "./pricing/PlanToggle";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { Verified } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPlans = pricingPlans.filter((plan) => plan.period === "month");
  const yearlyPlans = pricingPlans.filter((plan) => plan.period === "year");
  const lifetimePlansRaw = pricingPlans.filter((plan) => plan.period === "lifetime");
  const oneTimePlans = lifetimePlansRaw.filter((plan) =>
    plan.name.toLowerCase().includes("one-time") || plan.badge?.toLowerCase().includes("one-time")
  );
  const lifetimePlans = lifetimePlansRaw.filter(
    (plan) => !oneTimePlans.some((oneTimePlan) => oneTimePlan.name === plan.name)
  );

  const activePlans = isYearly ? yearlyPlans : monthlyPlans;
  const gridClasses = activePlans.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";
  const lifetimeGridCols = oneTimePlans.length + lifetimePlans.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";

  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", {
      state: { plan }
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan to supercharge your social media presence.
          </p>
        </div>

        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <div className="w-full mx-auto px-4 max-w-5xl">
          <div
            className={`grid gap-6 justify-items-center ${gridClasses}`}
          >
            {activePlans.map((plan) => (
              <div key={plan.name} className="w-full max-w-xl">
                <PlanCard plan={plan} onSubscribe={handleSubscribe} />
              </div>
            ))}
          </div>
        </div>

        {(oneTimePlans.length > 0 || lifetimePlans.length > 0) && (
          <div className="mt-20 max-w-5xl mx-auto px-4">
            <div className="rounded-3xl border-2 border-red-200 bg-white shadow-sm">
              <div className="grid gap-10 p-10 md:grid-cols-5">
                <div className="md:col-span-2 text-center md:text-left">
                  <span className="text-sm font-semibold text-red-600 tracking-wide uppercase">
                    Limited Time • Limited to 300 Spots
                  </span>
                  <h3 className="mt-4 text-3xl font-bold text-gray-900 leading-tight">
                    One payment, everything forever.
                  </h3>
                  <p className="mt-3 text-gray-600 text-base">
                    Includes all future enhancements plus exclusive strategy resources. Offer disappears when the countdown hits zero.
                  </p>
                  <CountdownTimer className="mt-6 justify-center md:justify-start" />
                </div>

                <div className={`md:col-span-3 grid gap-6 ${lifetimeGridCols}`}>
                  {oneTimePlans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
                  ))}
                  {lifetimePlans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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