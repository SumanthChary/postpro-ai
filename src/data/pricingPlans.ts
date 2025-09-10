
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "START FREE",
    price: "0",
    period: "week",
    features: [
      "Unlimited post enhancements for 7 days",
      "All 15+ tone and style options",
      "Virality score predictions",
      "Access to all 50+ professional templates",
      "Complete analytics dashboard",
      "AI strategy chat",
      "Priority email support"
    ],
    cta: "Start 7-Day Free Trial",
    icon: "🆓",
    currency: 'USD',
    postLimit: -1,
    badge: "7 Days Only",
    limitedQuantity: "No credit card required"
  },
  {
    name: "PROFESSIONAL",
    price: "39",
    period: "month",
    features: [
      "Unlimited LinkedIn post enhancements",
      "15+ tone options (professional, casual, thought-leader, etc.)",
      "Virality predictor with 89% accuracy",
      "Real-time trending hashtag research",
      "Custom CTA generator for every post",
      "50+ Specific templates",
      "Advanced analytics: engagement tracking, optimal timing, content ROI",
      "AI strategy chat for content planning",
      "Email support within 4 hours",
      "Export posts to all major platforms"
    ],
    cta: "Get Professional",
    icon: "💼",
    currency: 'USD',
    postLimit: -1,
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "LIFETIME CREATOR",
    price: "149",
    period: "lifetime",
    features: [
      "All current Professional features (valued at $468/year)",
      "All future feature updates included automatically",
      "Monthly growth strategy updates with founder",
      "Personal branding Tool (one-time, $297 value)",
      "Grandfathered pricing - never pay again",
      "Priority feature requests",
      "Early access to new AI features"
    ],
    cta: "Get Lifetime Access",
    icon: "💎",
    currency: 'USD',
    postLimit: -1,
    badge: "Best Value",
    originalPrice: "468",
    savings: "Save $319/year"
  }
];
