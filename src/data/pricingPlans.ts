
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Free",
    price: "0",
    period: "month",
    features: [
      "3 Post Enhancements/day",
      "Basic Analytics Dashboard",
      "Standard Support",
      "Basic Templates",
      "Community Access"
    ],
    cta: "Start Free",
    credits: 3,
    currency: 'USD'
  },
  {
    name: "Professional",
    price: "20",
    originalPrice: "33",
    discountPercentage: 40,
    period: "month",
    features: [
      "1000 Monthly AI Enhancements",
      "Advanced Tone & Style Mastery",
      "50+ Professional Templates",
      "Viral Score Intelligence",
      "Real-Time Hashtag Research",
      "Strategic Post Planning",
      "A/B Testing for Posts",
      "Custom Brand Settings",
      "Priority Support",
      "Enhanced Analytics"
    ],
    cta: "Start Professional Plan",
    popular: true,
    credits: 1000, // Monthly credits (50 credits per dollar)
    currency: 'USD'
  },
  {
    name: "Lifetime Creator",
    price: "45",
    originalPrice: "75",
    discountPercentage: 40,
    period: "lifetime",
    features: [
      "500 Post Enhancements",
      "Advanced Tone & Style Options",
      "Premium Templates (20+)",
      "Virality Score Predictor",
      "Trending Hashtag Generator",
      "CTA Generator",
      "A/B Testing for Posts",
      "Custom Templates",
      "Enhanced Analytics",
      "Priority Support"
    ],
    popular: true,
    icon: "💎",
    cta: "Choose Plan",
    credits: 500 // Lifetime credits
  },
];
