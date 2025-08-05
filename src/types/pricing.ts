
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
  badge?: string;
  urgency?: string;
  icon?: string;
  credits: number | string; // Allow both number and "unlimited"
  currency?: 'USD' | 'INR';
  displayPrice?: string;
}

export interface UserCredit {
  id: string;
  user_id: string;
  balance: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
