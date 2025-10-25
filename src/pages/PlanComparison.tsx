import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { pricingPlans } from "@/data/pricingPlans";

const PlanComparison = () => {
  const navigate = useNavigate();

  const starter = pricingPlans.find((plan) => plan.name === "Starter");
  const pro = pricingPlans.find((plan) => plan.name === "Pro");
  const lifetime = pricingPlans.find((plan) => plan.name === "Lifetime Access");

  const rows = [
    {
      feature: "Unlimited AI post enhancements (web + extension)",
      starter: "Included",
      pro: "Included",
      lifetime: "Included forever"
    },
    {
      feature: "Virality predictor",
      starter: "10 reports / day",
      pro: "Unlimited",
      lifetime: "Unlimited"
    },
    {
      feature: "Advanced analytics & PDF exports",
      starter: false,
      pro: true,
      lifetime: true
    },
    {
      feature: "Priority support",
      starter: "24-hour email",
      pro: "4-hour inbox",
      lifetime: "VIP priority"
    },
    {
      feature: "Lifetime updates + VIP community",
      starter: false,
      pro: false,
      lifetime: true
    }
  ];

  const plans = [
    { label: "Starter", plan: starter },
    { label: "Pro", plan: pro },
    { label: "Lifetime", plan: lifetime }
  ].filter(({ plan }) => Boolean(plan));

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">
        Compare <span className="text-blue-600">PostPro AI plans</span>
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
        Choose the level of access that fits your publishing cadence. Every plan unlocks the browser extension so your workflow stays seamless.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse rounded-3xl overflow-hidden">
          <thead>
            <tr className="bg-blue-50">
              <th className="text-left px-4 py-4 text-sm font-semibold text-gray-600">Feature</th>
              {plans.map(({ label, plan }) => (
                <th key={label} className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                  <div className="text-gray-900 text-lg font-bold">{plan?.name}</div>
                  <div className="text-blue-600 text-sm font-semibold">
                    ${plan?.price}
                    {plan?.period === "month" && <span className="text-gray-500 font-normal"> /month</span>}
                    {plan?.period === "year" && <span className="text-gray-500 font-normal"> /year</span>}
                    {plan?.period === "lifetime" && <span className="text-gray-500 font-normal"> once</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-slate-100">
                <td className="px-4 py-4 text-sm font-medium text-gray-700">{row.feature}</td>
                {plans.map(({ label }) => {
                  const value = (row as Record<string, unknown>)[label.toLowerCase()];
                  if (value === true) {
                    return (
                      <td key={`${row.feature}-${label}`} className="px-4 py-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      </td>
                    );
                  }
                  if (value === false) {
                    return (
                      <td key={`${row.feature}-${label}`} className="px-4 py-4 text-center text-gray-400">
                        <Minus className="mx-auto h-5 w-5" />
                      </td>
                    );
                  }
                  return (
                    <td key={`${row.feature}-${label}`} className="px-4 py-4 text-center text-sm text-gray-600">
                      {value as string}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mt-12">
        {plans.map(({ plan }) => (
          plan && (
            <div key={plan.name} className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{plan.cta}</p>
              <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/payment", { state: { plan } })}>
                Choose {plan.name}
              </Button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default PlanComparison;
