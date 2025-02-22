
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Free Plan",
    price: "0",
    period: "forever",
    features: [
      "5 post enhancements/month",
      "Basic AI",
      "Manual posting",
      "Real-Time Trend Hashtags",
      "Standard Templates (5)",
    ],
    cta: "Start Free",
  },
  {
    name: "Weekly Plan",
    price: "7.99",
    period: "week",
    features: [
      "Unlimited enhancements",
      "AI tone/style",
      "Trending Hashtag suggestions",
      "Premium templates (20+ templates)",
    ],
    popular: true,
    icon: "🔥",
    cta: "Choose Plan",
  },
  {
    name: "Monthly Plan",
    price: "19.99",
    period: "month",
    features: [
      "All Weekly features",
      "Content analysis",
      "Custom templates",
      "Priority processing",
      "CTA Generator",
    ],
    icon: "🚀",
    cta: "Choose Plan",
  },
  {
    name: "Yearly Plan",
    price: "149.99",
    period: "year",
    features: [
      "All Monthly features",
      "Premium support",
      "Advanced AI",
      "Early feature access",
      "Personal Branding tools",
    ],
    icon: "🎉",
    cta: "Choose Plan",
  },
  {
    name: "Enterprise Plan",
    price: "Custom",
    period: "custom",
    features: [
      "API access",
      "Bulk enhancements",
      "Team collaboration",
      "Custom solutions",
      "Dedicated support",
    ],
    icon: "💼",
    cta: "Contact Sales",
  },
];
