
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
  {
    name: "Yearly Plan",
    price: "80",
    period: "year",
    features: [
      "All Pro Features + More!",
      "50% OFF - Save $160/year",
      "Premium Customer Support",
      "Advanced Content Strategy",
      "Early Access Features",
      "Personal Branding Tools",
      "Monthly Bonus Credits",
      "VIP Support Access",
      "Advanced Analytics",
      "Cross-Platform Analytics"
    ],
    icon: "🎉",
    cta: "Choose Plan",
    credits: 4000 // Yearly credits (50 credits per dollar)
  },
  {
    name: "Enterprise Plan",
    price: "299",
    period: "month",
    features: [
      "All Yearly Features + More!",
      "Unlimited Enhancements",
      "Custom Brand Solutions",
      "Dedicated Support Manager",
      "Custom Analytics Reports",
      "White-label Options",
      "Priority Feature Requests",
      "1-on-1 Strategy Sessions",
      "24/7 VIP Support"
    ],
    icon: "💼",
    cta: "Contact Sales",
    credits: 15000 // Monthly credits (50 credits per dollar)
  },
];
