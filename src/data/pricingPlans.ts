
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Free Plan",
    price: "0",
    period: "forever",
    features: [
      "5 Post Enhancements/Month",
      "Basic AI Features",
      "Manual Posting",
      "Real-Time Trending Hashtags",
      "Watermark on AI-Enhanced Posts",
    ],
    cta: "Start Free",
    credits: 50
  },
  {
    name: "Weekly Plan",
    price: "5.99",
    period: "week",
    features: [
      "Unlimited Post Enhancements",
      "AI Tone & Style Suggestions",
      "Trending Hashtag Generator",
      "Premium Templates (20+)",
      "Virality Score Predictor",
    ],
    popular: true,
    icon: "🔥",
    cta: "Choose Plan",
    credits: 200
  },
  {
    name: "Monthly Plan",
    price: "24.99",
    period: "month",
    features: [
      "All Weekly Features + More!",
      "Advanced AI Chatbot",
      "AI-Powered Smart Dashboard",
      "A/B Testing for Posts",
      "CTA Generator",
      "Custom Templates",
    ],
    icon: "💎",
    cta: "Choose Plan",
    credits: 500
  },
  {
    name: "Yearly Plan",
    price: "129.99",
    period: "year",
    features: [
      "All Monthly Features + More!",
      "Premium Customer Support",
      "Advanced AI for Content Strategy",
      "Early Access to New Features",
      "Personal Branding Toolkit",
      "Monthly Bonus Credits",
    ],
    icon: "🎉",
    cta: "Choose Plan",
    credits: 2000
  },
  {
    name: "Enterprise Plan",
    price: "499",
    period: "month",
    features: [
      "All Yearly Features + More!",
      "API Access for Bulk Enhancements",
      "Team Collaboration & Multi-Account",
      "Dedicated Account Manager",
      "Custom Solutions",
      "Custom Credit Allocation",
    ],
    icon: "💼",
    cta: "Contact Sales",
    credits: 5000
  },
];
