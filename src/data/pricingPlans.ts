import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "STARTER",
    price: "2.99",
    period: "month",
    features: [
      "30 LinkedIn post enhancements per month",
      "5 professional tone options",
      "Basic AI enhancement",
      "Email support (48-72 hours)",
      "Export to LinkedIn"
    ],
    cta: "Start with Starter",
    currency: 'USD',
    postLimit: 30,
    badge: "Best for Beginners"
  },
  {
    name: "PROFESSIONAL",
    price: "9.99",
    period: "month",
    features: [
      "UNLIMITED LinkedIn post enhancements",
      "15+ professional tone options to match your executive presence",
      "89% accurate virality predictor",
      "Real-time trending hashtag research",
      "Custom CTA generator for professional connections",
      "50+ proven templates from industry leaders",
      "Advanced analytics with engagement insights",
      "AI strategy chat for content planning",
      "Priority email support within 4-12 hours",
      "Export to all major platforms with optimized formatting"
    ],
    cta: "Go Professional",
    currency: 'USD',
    postLimit: -1,
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "PRO ANNUAL",
    price: "79",
    period: "year",
    features: [
      "Everything in Professional Plan",
      "Save $40 vs monthly billing (2 months free)",
      "Price locked for 12 months",
      "Quarterly LinkedIn strategy updates",
      "Early access to new AI models",
      "Priority feature requests",
      "Annual performance report"
    ],
    cta: "Claim Annual Deal",
    currency: 'USD',
    postLimit: -1,
    badge: "Save $40",
    originalPrice: "119.88",
    savings: "Save $40",
    limitedQuantity: "Best value for committed professionals"
  },
  {
    name: "LIFETIME CREATOR",
    price: "149",
    period: "lifetime",
    features: [
      "All current and future Professional features forever",
      "Monthly strategy guides from the founder",
      "One-time personal profile optimization ($97 value)",
      "Never pay again - lifetime access guaranteed",
      "VIP community access with successful professionals",
      "White-glove onboarding for immediate results"
    ],
    cta: "Secure Lifetime Access",
    currency: 'USD',
    postLimit: -1,
    badge: "Limited to 300 spots",
    originalPrice: "299",
    limitedQuantity: "Limited lifetime deal"
  }
];

export const creditPacks = [
  {
    name: "10 Credits",
    price: "5.99",
    credits: 10,
    pricePerCredit: "0.60",
    popular: false
  },
  {
    name: "25 Credits",
    price: "12.99",
    credits: 25,
    pricePerCredit: "0.52",
    savings: "Save 13%",
    popular: false
  },
  {
    name: "50 Credits",
    price: "19.99",
    credits: 50,
    pricePerCredit: "0.40",
    savings: "Save 33%",
    popular: true
  }
];