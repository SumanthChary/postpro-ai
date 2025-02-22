
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: [
      "3-5 LinkedIn posts optimization per week",
      "Basic tone analysis",
      "Real-Time Trend Hashtags",
    ],
    cta: "Start Free",
  },
  {
    name: "Creator Plan",
    price: "4.99",
    period: "week",
    features: [
      "Unlimited Post Enhancements",
      "AI Post Writer",
      "Advanced tone analysis",
    ],
    popular: true,
    cta: "Choose Plan",
  },
  {
    name: "Business Plan",
    price: "99",
    period: "year",
    features: [
      "All Creator Features",
      "Premium Support",
      "Early access to new features",
    ],
    cta: "Choose Plan",
  },
];
