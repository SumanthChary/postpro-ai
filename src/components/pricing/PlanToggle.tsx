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
        <div className="flex justify-center items-center gap-3 mb-8 px-4">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
              isYearly ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              Save 50%
            </span>
          </div>
        </div>
  );
};
export default PlanToggle;