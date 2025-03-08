
import { AlertCircle } from "lucide-react";

interface PaymentNoticeProps {
  showCreditsInfo?: boolean;
}

export const PaymentNotice = ({ showCreditsInfo = false }: PaymentNoticeProps) => {
  return (
    <div className="bg-yellow-50 p-4 rounded-md">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-yellow-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Secure Payment
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Your subscription will start immediately after successful payment.
              You can cancel anytime from your account settings.
            </p>
            {showCreditsInfo && (
              <p className="mt-1">
                Credits expire after 3 months and can be used for premium features.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
