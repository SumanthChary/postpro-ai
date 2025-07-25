
import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Free",
    price: "0",
    period: "month",
    features: [
      "5 Post Enhancements",
      "Basic Post Analytics",
      "Manual Post Sharing",
      "Standard Support",
      "Real-Time Trending Hashtags"
    ],
    cta: "Start Free",
    credits: 5,
    currency: 'USD'
  },
  {
    name: "Plus",
    price: "3",
    period: "week",
    features: [
      "25 Post Enhancements/week",
      "Unlimited Auto-Share",
      "Advanced Analytics",
      "Priority Support",
      "Schedule up to 10 posts"
    ],
    cta: "Try Plus",
    popular: true,
    credits: 25,
    currency: 'USD',
    displayPrice: "~$5~ $3"
  },
  {
    name: "Monthly Plan",
    price: "8",
    period: "month",
    features: [
      "Unlimited Post Enhancements",
      "Advanced AI Tone & Style Suggestions",
      "Premium Templates (20+)",
      "Virality Score Predictor",
      "Trending Hashtag Generator",
      "CTA Generator",
      "A/B Testing for Posts",
      "Custom Templates",
      "Advanced AI Chatbot",
      "AI-Powered Smart Dashboard",
    ],
    popular: true,
    icon: "💎",
    cta: "Choose Plan",
    credits: 320 // Calculated based on $8 pricing (40 credits per dollar)
  },
  {
    name: "Yearly Plan",
    price: "80",
    period: "year",
    features: [
      "All Monthly Features + More!",
      "50% OFF - Save $96/year",
      "Premium Customer Support",
      "Advanced AI for Content Strategy",
      "Early Access to New Features",
      "Personal Branding Toolkit",
      "Monthly Bonus Credits",
      "Priority Support",
      "Advanced Analytics Dashboard",
      "Cross-Platform Sharing",
      "Teams Collaboration",
    ],
    icon: "🎉",
    cta: "Choose Plan",
    credits: 3200 // Calculated based on $80 pricing (40 credits per dollar)
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
      "White-label Options",
      "Custom Integrations",
      "24/7 Priority Support",
    ],
    icon: "💼",
    cta: "Contact Sales",
    credits: 19960 // Calculated based on $499 pricing (40 credits per dollar)
  },
];
