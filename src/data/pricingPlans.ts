import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Starter",
    price: "7",
    period: "month",
    features: [
      "Unlimited post enhancements on web + browser extension",
      "Virality predictor with 10 insights per day",
      "10 tone and persona presets tuned for LinkedIn",
      "Weekly trending hashtag suggestions",
      "Chrome + Firefox extension access included",
      "Standard support with 24-hour response"
    ],
    cta: "Start 7-day Trial",
    currency: "USD",
    postLimit: -1,
    badge: "For growing creators"
  },
  {
    name: "Pro",
    price: "14",
    period: "month",
    features: [
      "Unlimited enhancements everywhere + instant rewrite shortcuts",
      "Unlimited virality predictions with accuracy guardrails",
      "20+ advanced tones, persona swaps, and CTA boosters",
      "Real-time hashtag intelligence and audience targeting",
      "Advanced analytics, post history, and PDF exports",
      "Priority inbox support (under 4 hours) + roadmap voting"
    ],
    cta: "Start 7-day Trial",
    currency: "USD",
    postLimit: -1,
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "Starter Annual",
    price: "59",
    period: "year",
    features: [
      "Everything in Starter for 12 months",
      "Save 30% vs paying monthly",
      "Trial rolls into $59/year after 7 days",
      "Unlimited web + extension enhancements",
      "10 virality reports per day with insight summaries",
      "Standard support with 24-hour response"
    ],
    cta: "Start 7-day Trial",
    currency: "USD",
    postLimit: -1,
    badge: "Best Value",
    savings: "Save 30% annually"
  },
  {
    name: "Pro Annual",
    price: "119",
    period: "year",
    features: [
      "Everything in Pro locked in for the year",
      "Save 29% vs monthly billing",
      "Unlimited virality, analytics, and exports",
      "Advanced collaboration + campaign tagging",
      "Quarterly strategy reviews + VIP webinar access",
      "Priority inbox support (under 4 hours)"
    ],
    cta: "Start 7-day Trial",
    currency: "USD",
    postLimit: -1,
    badge: "Save 29%",
    originalPrice: "168",
    savings: "Save 29% vs monthly"
  },
  {
    name: "Lifetime Access",
    price: "149",
    period: "lifetime",
    features: [
      "All current and future Pro features forever",
      "Lifetime updates across web + extension",
      "Early access to experimental AI models",
      "Private creator circle + success playbooks",
      "VIP support line with quarterly check-ins",
      "License is yours even as pricing increases"
    ],
    cta: "Secure Lifetime Access",
    currency: "USD",
    postLimit: -1,
    badge: "Limited to 500 seats",
    originalPrice: "299",
    limitedQuantity: "Only 500 lifetime seats available"
  }
];

export const creditPacks = [
  {
    name: "10 Credits",
    price: "9.99",
    credits: 10,
    pricePerCredit: "0.99",
    popular: false
  },
  {
    name: "50 Credits",
    price: "39.99",
    credits: 50,
    pricePerCredit: "0.80",
    savings: "Save 19%",
    popular: true
  },
  {
    name: "100 Credits",
    price: "69.99",
    credits: 100,
    pricePerCredit: "0.70",
    savings: "Save 29%",
    popular: false
  }
];