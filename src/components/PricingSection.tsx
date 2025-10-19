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
            Choose Your Perfect Post Enhancer Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Flexible plans for every LinkedIn creator. Start monthly, commit annually for huge savings, or secure lifetime access while the deal lasts.
          </p>
        </div>

        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <div className="w-full mx-auto px-4 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(isYearly ? yearlyPlans : monthlyPlans).map((plan) => (
              <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
            ))}
          </div>
        </div>

        {oneTimePlans.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-3xl shadow-sm p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8">
                <div className="max-w-xl">
                  <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
                    New One-Time Unlock
                  </span>
                  <h3 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
                    Try the Post Enhancer forever for just $4.99
                  </h3>
                  <p className="mt-3 text-gray-600 text-base md:text-lg">
                    Perfect if you want lifetime access without a subscription. Pay once, keep generating better posts anytime inspiration hits.
                  </p>
                </div>

                <div className="w-full md:w-auto grid gap-6 sm:grid-cols-2 md:grid-cols-1">
                  {oneTimePlans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {lifetimePlans.length > 0 && (
          <div className="mt-20 bg-white/70 backdrop-blur rounded-3xl border border-gray-100 shadow-sm">
            <div className="grid md:grid-cols-5 gap-10 p-10 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <span className="text-sm font-semibold text-orange-600 tracking-wide uppercase">
                  Limited Lifetime Offer
                </span>
                <h3 className="mt-4 text-3xl font-bold text-gray-900 leading-tight">
                  Pay once, keep every future upgrade
                </h3>
                <p className="mt-3 text-gray-600 text-base">
                  Lifetime Creator is back for a short time only. Lock in permanent access to every current and upcoming feature with a single payment.
                </p>
                <CountdownTimer className="mt-6 justify-center md:justify-start" />
              </div>

              <div className="md:col-span-3 grid gap-6 md:grid-cols-2">
                {lifetimePlans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} onSubscribe={handleSubscribe} />
                ))}
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