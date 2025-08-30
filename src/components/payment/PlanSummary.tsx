import { Plan } from "@/types/pricing";

interface PlanSummaryProps {
  planDetails: Plan;
}

export const PlanSummary = ({ planDetails }: PlanSummaryProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{planDetails.name}</h2>
      <p className="text-2xl font-bold text-blue-600">${planDetails.price}/{planDetails.period}</p>
      <div className="mt-2 text-sm text-gray-600">
        <p>Features included in this plan</p>
      </div>
    </div>
  );
};