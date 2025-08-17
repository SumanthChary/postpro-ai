
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Pro Monthly",
    price: "20",
    period: "month",
    features: [
      "Unlimited post generation",
      "All social platforms",
      "Engagement analytics",
      "Email support"
    ],
    cta: "Start Free Trial",
    credits: 1000,
    currency: 'USD'
  },
  {
    name: "Annual Plan",
    price: "120",
    originalPrice: "240",
    period: "year",
    features: [
      "Everything in Pro Monthly",
      "Save $120 annually",
      "Priority support",
      "Advanced templates"
    ],
    cta: "Start Free Trial",
    popular: true,
    credits: 12000,
    currency: 'USD'
  },
  {
    name: "Lifetime Deal",
    price: "49",
    period: "lifetime",
    features: [
      "Pay once, use forever",
      "All Pro features included",
      "VIP community access",
      "Exclusive masterclasses/guide",
      "Priority feature requests"
    ],
    cta: "Get Lifetime Access",
    icon: "🔥",
    credits: 10000,
    currency: 'USD'
  }
];
