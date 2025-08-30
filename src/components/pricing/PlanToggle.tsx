import { useState } from "react";
interface PlanToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}
const PlanToggle = ({
  isYearly,
  setIsYearly
}: PlanToggleProps) => {
  return (
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 px-4">
          <span className={`text-xs sm:text-sm font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-10 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
              isYearly ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isYearly ? "translate-x-4 sm:translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-xs sm:text-sm font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 text-xs text-green-600 font-semibold">Save 29%</span>
          </span>
        </div>
  );
};
export default PlanToggle;