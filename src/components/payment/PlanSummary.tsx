import { Plan } from "@/types/pricing";

interface PlanSummaryProps {
  planDetails: Plan;
}

export const PlanSummary = ({ planDetails }: PlanSummaryProps) => {
  const formatPeriod = (period: string) => {
    if (period === "lifetime") return "one-time";
    return period;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{planDetails.name}</h2>
          {planDetails.badge && (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mt-1">
              {planDetails.badge}
            </span>
          )}
        </div>
        <div className="text-right">
          {planDetails.originalPrice && (
            <div className="text-sm text-gray-500 line-through">${planDetails.originalPrice}</div>
          )}
          <div className="text-2xl font-bold text-gray-900">
            ${planDetails.price}
            <span className="text-base text-gray-600 font-normal">/{formatPeriod(planDetails.period)}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">What's included:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {planDetails.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
          {planDetails.features.length > 3 && (
            <li className="text-gray-500">+ {planDetails.features.length - 3} more features</li>
          )}
        </ul>
      </div>
    </div>
  );
};