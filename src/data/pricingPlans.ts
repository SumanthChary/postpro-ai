
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
    limitedQuantity: "No credit card required"
  },
  {
    name: "BASIC MONTHLY",
    price: "9.99",
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
    cta: "Get Basic Plan",
    icon: "💼",
    currency: 'USD',
    postLimit: -1,
    badge: "50% OFF",
    originalPrice: "19.99"
  },
  {
    name: "PRO ANNUAL",
    price: "59",
    period: "year",
    features: [
      "All Basic features + annual perks:",
      "Save $60 vs monthly billing (5 months free)",
      "Price locked for 12 months – no surprises",
      "Quarterly LinkedIn strategy updates",
      "Early-access to new AI models",
      "Priority feature requests"
    ],
    cta: "Get Pro Annual",
    icon: "📅",
    currency: 'USD',
    postLimit: -1,
    popular: true,
    badge: "50% OFF",
    originalPrice: "119.88",
    savings: "Save $60",
    limitedQuantity: "Most popular with executives & consultants"
  },
  {
    name: "LIFETIME CREATOR",
    price: "89",
    period: "lifetime",
    features: [
      "All current & future Professional features, forever",
      "Monthly Strategy guides by founder",
      "Personal profile growth (one-time)",
      "Never pay again – grandfathered for life"
    ],
    cta: "Get Lifetime Access",
    icon: "💎",
    currency: 'USD',
    postLimit: -1,
    badge: "200 spots left",
    limitedQuantity: "Limited launch deal"
  }
];
