import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./pricing/PlanCard";
import PlanToggle from "./pricing/PlanToggle";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { pricingPlans, creditPacks } from "@/data/pricingPlans";
import { Plan } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
const PricingSection = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const monthlyPlans = pricingPlans.filter(plan => plan.period === "month");
  const yearlyPlans = pricingPlans.filter(plan => plan.period === "year");
  const lifetimePlan = pricingPlans.find(plan => plan.period === "lifetime");
  const activePlans = isYearly ? yearlyPlans : monthlyPlans;
  const gridClasses = activePlans.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";
  const highlightCredits = creditPacks;
  const handleSubscribe = (plan: Plan) => {
    navigate("/payment", {
      state: {
        plan
      }
    });
  };
  return <section className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Plans Built For Viral Growth
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start your 7-day trial, unlock the extension, and keep your workflow in one subscription across web + browser.
          </p>
        </div>

        <PlanToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <div className="w-full mx-auto px-4 max-w-5xl">
          <div className={`grid gap-6 justify-items-center ${gridClasses}`}>
            {activePlans.map(plan => <div key={plan.name} className="w-full max-w-xl">
                <PlanCard plan={plan} onSubscribe={handleSubscribe} />
              </div>)}
          </div>
        </div>

        {lifetimePlan && <div className="mt-20 max-w-5xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-[32px] border-[3px] border-purple-200 bg-white shadow-xl">
              <div className="absolute top-6 right-6 rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Limited • 500 Seats Max
              </div>
              <div className="p-8 sm:p-10 md:p-12">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
                      {lifetimePlan.name}
                    </h3>
                    <p className="mt-3 text-base md:text-lg text-gray-600">
                      Pay once, own PostPro AI forever. Includes all future updates across web + extension.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-5xl md:text-6xl font-bold text-purple-600">
                      ${lifetimePlan.price}
                    </span>
                    {lifetimePlan.originalPrice && <span className="text-2xl text-gray-400 line-through">
                        ${lifetimePlan.originalPrice}
                      </span>}
                  </div>

                  <ul className="space-y-3">
                    {lifetimePlan.features.slice(0, 4).map(feature => <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                        <span className="text-base text-gray-700">{feature}</span>
                      </li>)}
                  </ul>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                      Seats refresh in
                    </p>
                    <div className="mt-3 inline-flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-purple-100 bg-purple-50/70 px-5 py-4 md:justify-start">
                      <CountdownTimer className="text-purple-600" />
                    </div>
                  </div>

                  <Button className="mt-2 w-full rounded-xl bg-purple-600 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-purple-700" onClick={() => handleSubscribe(lifetimePlan)}>
                    {lifetimePlan.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>}

        <div className="mt-16 max-w-5xl mx-auto px-4">
          <div className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-lg">
            <Badge className="bg-blue-600/10 text-blue-700">Pay-as-you-go</Badge>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              {highlightCredits.map(pack => (
                <div key={pack.name} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6">
                  <h4 className="text-lg font-semibold text-gray-900">{pack.name}</h4>
                  <p className="text-3xl font-bold text-blue-700 mt-2">${pack.price}</p>
                  <p className="text-sm text-gray-600">Credits never expire • Extension included</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li>1 credit = 1 enhancement + virality check</li>
                    {pack.savings && <li className="text-emerald-600 font-medium">{pack.savings}</li>}
                    <li>${pack.pricePerCredit}/credit</li>
                  </ul>
                  <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/payment", { state: { plan: {
                        name: `${pack.name} Credit Pack`,
                        price: pack.price,
                        period: "lifetime",
                        features: [
                          `${pack.credits} credits to use anytime`,
                          "Enhance + analyze with each credit",
                          "Extension + web access included"
                        ],
                        cta: `Buy ${pack.name}`
                      } as Plan } )}>
                    Buy Credits
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;