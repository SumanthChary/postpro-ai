
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "FREE", 
    price: "0",
    period: "month",
    features: [
      "5 posts per month",
      "Basic templates only",
      "Community support"
    ],
    cta: "Start Free",
    icon: "🆓",
    currency: 'USD',
    postLimit: 5
  },
  {
    name: "PRO MONTHLY",
    price: "39", 
    period: "month",
    features: [
      "Unlimited posts & content",
      "AI virality prediction",
      "Advanced templates & frameworks",
      "Priority support",
      "Analytics dashboard",
      "Content calendar"
    ],
    cta: "Start Creating Authority",
    icon: "💼",
    currency: 'USD', 
    postLimit: -1,
    popular: true
  },
  {
    name: "PRO ANNUAL",
    price: "399",
    period: "year", 
    features: [
      "Everything in Pro Monthly",
      "Advanced audience insights", 
      "Personal brand consultant",
      "Exclusive content frameworks",
      "Priority feature access"
    ],
    cta: "Save $69 Annually",
    icon: "⭐",
    currency: 'USD',
    postLimit: -1,
    badge: "Best Value",
    savings: "Save $69",
    originalPrice: "468"
  },
  {
    name: "LIFETIME",
    price: "99",
    period: "lifetime",
    features: [
      "Everything forever",
      "Lifetime updates", 
      "VIP support channel",
      "Future feature access",
      "Exclusive community"
    ],
    cta: "Get Lifetime Access",
    icon: "💎",
    currency: 'USD',
    postLimit: -1,
    badge: "Limited Time",
    limitedQuantity: "Limited to 1,000 customers"
  }
];
