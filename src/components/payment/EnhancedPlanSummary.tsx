import { Plan } from "@/types/pricing";
import { Check } from "lucide-react";

interface EnhancedPlanSummaryProps {
  planDetails: Plan;
  appliedCoupon?: { code: string; discount: number } | null;
}

export const EnhancedPlanSummary = ({ planDetails, appliedCoupon }: EnhancedPlanSummaryProps) => {
  const formatPeriod = (period: string) => {
    if (period === "lifetime") return "one-time";
    return period;
  };

  const originalPrice = parseFloat(planDetails.price);
  const discountAmount = appliedCoupon ? (originalPrice * appliedCoupon.discount) / 100 : 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="space-y-6">
        {/* Plan Header */}
        <div className="text-center pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{planDetails.name}</h2>
          {planDetails.badge && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {planDetails.badge}
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center space-y-2">
          {planDetails.originalPrice && (
            <div className="text-lg text-gray-500 line-through">
              ${planDetails.originalPrice}
            </div>
          )}
          
          <div className="space-y-1">
            {appliedCoupon && (
              <div className="text-lg text-gray-600 line-through">
                ${originalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-3xl font-bold text-gray-900">
              ${finalPrice.toFixed(2)}
              <span className="text-lg text-gray-600 font-normal ml-1">
                /{formatPeriod(planDetails.period)}
              </span>
            </div>
          </div>

          {appliedCoupon && (
            <div className="text-green-600 text-sm font-medium">
              You save ${discountAmount.toFixed(2)} with {appliedCoupon.code}
            </div>
          )}
        </div>

        {/* What's Included */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">What's included:</h3>
          <div className="space-y-3">
            {(planDetails.features || []).map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-800">30-Day Money Back Guarantee</h4>
              <p className="text-xs text-green-700 mt-1">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};