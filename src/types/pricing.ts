
export interface PlanFeature {
  text: string;
}

export interface Plan {
  name: string;
  price: string;
  period: "week" | "month" | "year" | "forever" | "lifetime";
  features: string[];
  cta: string;
  popular?: boolean;
  icon?: string;
  currency?: 'USD' | 'INR';
  displayPrice?: string;
  originalPrice?: string;
  discountPercentage?: number;
  postLimit?: number; // Monthly post limit (-1 for unlimited)
  badge?: string; // Badge text like "Best Value", "Limited Time"
  limitedQuantity?: string; // Text for limited quantity
}

export interface UserCredit {
  id: string;
  user_id: string;
  balance: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
