import { useState } from "react";
interface PlanToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}
const PlanToggle = ({
  isYearly,
  setIsYearly
}: PlanToggleProps) => {
  return <div className="flex justify-center items-center gap-4 mb-8">
      <span className={`text-lg ${!isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Monthly</span>
      <button onClick={() => setIsYearly(!isYearly)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${isYearly ? "bg-blue-600" : "bg-gray-200"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? "translate-x-6" : "translate-x-1"}`} />
      </button>
      <span className={`text-lg ${isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Yearly</span>
    </div>;
};
export default PlanToggle;