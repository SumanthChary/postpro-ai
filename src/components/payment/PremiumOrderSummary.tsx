import { Plan } from "@/types/pricing";

interface PremiumOrderSummaryProps {
  planDetails: Plan;
  appliedCoupon?: { code: string; discount: number } | null;
}

export const PremiumOrderSummary = ({
  planDetails,
  appliedCoupon,
}: PremiumOrderSummaryProps) => {
  const originalPrice = parseFloat(planDetails.price);
  const discountAmount = appliedCoupon ? (originalPrice * appliedCoupon.discount) / 100 : 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="payment-card-premium p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {/* Plan Details */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {planDetails.name}
            </h3>
            <p className="text-gray-600 text-sm">Monthly subscription</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ${finalPrice.toFixed(2)}/month
            </div>
            {appliedCoupon && (
              <div className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Discount Row */}
        {appliedCoupon && (
          <div className="flex items-center justify-between py-2 border-t border-gray-200">
            <div className="text-sm text-green-600 font-medium">
              Discount ({appliedCoupon.code} - {appliedCoupon.discount}% off)
            </div>
            <div className="text-sm text-green-600 font-medium">
              -${discountAmount.toFixed(2)}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">Total</div>
            <div className="text-xl font-bold text-blue-600">
              ${finalPrice.toFixed(2)}
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Billed monthly • Cancel anytime
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h4>
        <div className="space-y-3">
          {(planDetails.features || []).map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};