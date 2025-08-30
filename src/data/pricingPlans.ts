
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "FREE",
    price: "0",
    period: "month",
    features: [
      "5 posts per month",
      "Basic templates only"
    ],
    cta: "Get Started",
    icon: "🆓",
    currency: 'USD',
    postLimit: 5
  },
  {
    name: "PRO MONTHLY",
    price: "39",
    period: "month",
    features: [
      "Unlimited posts",
      "All premium features",
      "Priority support",
      "Advanced analytics"
    ],
    cta: "Upgrade to Pro",
    icon: "💼",
    currency: 'USD',
    postLimit: -1 // -1 means unlimited
  },
  {
    name: "PRO ANNUAL",
    price: "399",
    originalPrice: "468",
    period: "year",
    features: [
      "Everything in Pro Monthly",
      "Save $69/year (29% discount)",
      "Bonus annual-only features",
      "Extended priority support"
    ],
    cta: "Save with Annual",
    popular: true,
    icon: "⭐",
    currency: 'USD',
    postLimit: -1,
    badge: "Best Value"
  },
  {
    name: "LIFETIME",
    price: "99",
    period: "lifetime",
    features: [
      "Everything forever",
      "Exclusive support",
      "Future features included",
      "Lifetime updates"
    ],
    cta: "Get Lifetime Access",
    icon: "💎",
    currency: 'USD',
    postLimit: -1,
    badge: "Limited Time",
    limitedQuantity: "Limited to 1,000 customers"
  }
];
