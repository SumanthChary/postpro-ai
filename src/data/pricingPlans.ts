import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "BASIC MONTHLY",
    price: "9.99",
    period: "month",
    features: [
      "Unlimited LinkedIn post enhancements for maximum impact",
      "15+ professional tone options to match your executive presence",
      "89% accurate virality predictor so you know which posts will explode",
      "Real-time trending hashtag research to stay ahead of the curve",
      "Custom CTA generator that drives meaningful professional connections",
      "50+ proven templates used by industry thought leaders",
      "Advanced analytics showing engagement growth and content ROI",
      "AI strategy chat for intelligent content planning",
      "Priority email support within 4 hours",
      "Export to all major platforms with optimized formatting"
    ],
    cta: "Start Dominating LinkedIn",
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
      "Everything in Basic plus executive-level perks",
      "Save $60 vs monthly billing (5 months completely free)",
      "Price locked for 12 months with no hidden surprises",
      "Quarterly LinkedIn strategy updates from industry experts",
      "Early access to cutting-edge AI models before anyone else",
      "Priority feature requests to shape the platform you need",
      "Annual performance report showing your LinkedIn growth trajectory"
    ],
    cta: "Claim Pro Annual",
    currency: 'USD',
    postLimit: -1,
    popular: true,
    badge: "50% OFF",
    originalPrice: "119.88",
    savings: "Save $60",
    limitedQuantity: "Most popular with executives and consultants"
  },
  {
    name: "LIFETIME CREATOR",
    price: "89",
    period: "lifetime",
    features: [
      "All current and future Professional features forever",
      "Monthly strategy guides directly from the founder",
      "One-time personal profile optimization session",
      "Never pay again with lifetime access grandfathered pricing",
      "VIP community access with other successful professionals",
      "White-glove onboarding to maximize your LinkedIn results immediately"
    ],
    cta: "Secure Lifetime Access",
    currency: 'USD',
    postLimit: -1,
    badge: "200 spots left",
    limitedQuantity: "Limited launch deal"
  }
];