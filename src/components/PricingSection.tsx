import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import PlanToggle from "./pricing/PlanToggle";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { pricingPlans } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShieldCheck } from "lucide-react";

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
  const lifetimePlan = lifetimePlans[0];
  const simplifiedOneTime = oneTimePlans[0]
    ? {
        ...oneTimePlans[0],
        features: oneTimePlans[0].features.slice(0, 3),
      }
    : null;

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
            Plans Built For Viral Growth
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start with a 7-day trial, scale with unlimited enhancements, or lock in lifetime access today.
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

        {(lifetimePlan || oneTimePlans.length > 0) && (
          <div className="mt-20 max-w-5xl mx-auto px-4">
            <div className={`grid gap-8 ${lifetimePlan && oneTimePlans.length > 0 ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "lg:grid-cols-1"}`}>
              {lifetimePlan && (
                <div className="relative overflow-hidden rounded-[32px] border-[3px] border-red-200 bg-white shadow-xl">
                  <div className="absolute top-6 right-6 rounded-full bg-red-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Limited Time • 300 Spots
                  </div>
                  <div className="p-8 sm:p-10 md:p-12">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
                          {lifetimePlan.name}
                        </h3>
                        <p className="mt-3 text-base md:text-lg text-gray-600">
                          One payment, everything forever. Includes all future features.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-5xl md:text-6xl font-bold text-red-600">
                          ${lifetimePlan.price}
                        </span>
                        {lifetimePlan.originalPrice && (
                          <span className="text-2xl text-gray-400 line-through">
                            ${lifetimePlan.originalPrice}
                          </span>
                        )}
                      </div>

                      <ul className="space-y-3">
                        {lifetimePlan.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                            <span className="text-base text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                          Offer ends in:
                        </p>
                        <div className="mt-3 inline-flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4 md:justify-start">
                          <CountdownTimer className="text-red-600" />
                        </div>
                      </div>

                      <Button
                        className="mt-2 w-full rounded-xl bg-red-600 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-red-700"
                        onClick={() => handleSubscribe(lifetimePlan)}
                      >
                        {lifetimePlan.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {simplifiedOneTime && (
                <div className="flex flex-col gap-5 rounded-[32px] border-2 border-blue-100 bg-white/95 p-6 sm:p-8 shadow-lg">
                  <Badge className="w-fit bg-blue-600/10 text-blue-700">One-time unlock</Badge>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-gray-900">
                      Try the enhancer forever for just ${simplifiedOneTime.price}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Lifetime access without a subscription. Perfect for testing the full experience at your own pace.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {simplifiedOneTime.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
                    onClick={() => handleSubscribe(simplifiedOneTime)}
                  >
                    {simplifiedOneTime.cta}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-16 max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white/80 px-6 py-5 text-sm text-slate-600 shadow-sm sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <ShieldCheck className="h-4 w-4" /> Secure checkout
            </div>
            <div className="flex flex-wrap justify-center gap-4 font-medium text-slate-600">
              <span>PayPal</span>
              <span className="text-slate-300">•</span>
              <span>Razorpay</span>
              <span className="text-slate-300">•</span>
              <span>DoDo Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;