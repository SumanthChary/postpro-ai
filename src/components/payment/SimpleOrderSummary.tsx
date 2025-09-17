import { Check } from "lucide-react";
import { Plan } from "@/types/pricing";

interface SimpleOrderSummaryProps {
  planDetails: Plan;
}

export const SimpleOrderSummary = ({ planDetails }: SimpleOrderSummaryProps) => {
  const features = [
    "Enhanced post creation with AI",
    "Unlimited post enhancement",
    "Advanced virality scoring",
    "Priority customer support",
    "60-day money-back guarantee",
    "Cancel anytime"
  ];

  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground">{planDetails.name}</h4>
          <p className="text-sm text-muted-foreground">Professional AI post enhancement</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">Monthly subscription</span>
            <span className="font-semibold text-foreground">${planDetails.price}/month</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold text-primary">${planDetails.price}/month</span>
          </div>
        </div>
      </div>
    </div>
  );
};