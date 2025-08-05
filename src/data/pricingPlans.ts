
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Professional Plan",
    price: "15",
    period: "month",
    features: [
      "Unlimited Premium AI Enhancements",
      "Advanced Tone & Style Mastery",
      "50+ Professional Templates",
      "Viral Score Intelligence",
      "Real-Time Trending Hashtag Research",
      "Strategic CTA Generator",
      "A/B Testing for Maximum Engagement",
      "Custom Brand Voice Training",
      "Advanced AI Content Strategist",
      "Priority Support & Consultation",
    ],
    popular: true,
    icon: "🚀",
    cta: "Start Professional Plan",
    credits: "unlimited"
  },
  {
    name: "Lifetime Creator Deal",
    price: "45",
    period: "lifetime",
    features: [
      "500 Premium AI Enhancements",
      "All Professional Features Included",
      "Lifetime Access - No Recurring Fees",
      "Advanced Analytics Dashboard",
      "Cross-Platform Content Optimization",
      "Personal Branding Toolkit",
      "Early Access to New Features",
      "Premium Template Library",
      "Community Access & Networking",
      "Limited Time Launch Offer",
    ],
    icon: "💎",
    badge: "Best Value - Save $135/year",
    urgency: "Only 127 lifetime deals remaining",
    cta: "Secure Lifetime Access",
    credits: 500
  }
];
