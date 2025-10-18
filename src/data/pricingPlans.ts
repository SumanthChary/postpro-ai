import { Plan } from "@/types/pricing";

export const pricingPlans: Plan[] = [
  {
    name: "Post Enhancer",
    price: "2.99",
    period: "lifetime",
    features: [
      "Unlimited AI post enhancing"
    ],
  cta: "Unlock for $2.99",
    currency: "USD",
    postLimit: -1,
    badge: "Lifetime access",
    limitedQuantity: "One-time payment"
  },
  {
    name: "Post Enhancer Plus",
    price: "4.99",
    period: "lifetime",
    features: [
      "Unlimited AI post enhancing",
      "Virality predictor insights"
    ],
  cta: "Unlock for $4.99",
    currency: "USD",
    postLimit: -1,
    badge: "Best value",
    limitedQuantity: "One-time payment",
    popular: true
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