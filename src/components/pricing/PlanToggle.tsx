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
    <div className="flex justify-center items-center gap-4 mb-8">
      <span className={`text-lg font-medium transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isYearly ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
            isYearly ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className={`text-lg font-medium transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
        Yearly
        <span className="ml-2 text-sm text-green-600 font-semibold">Save 29%</span>
      </span>
    </div>
  );
};
export default PlanToggle;