
export interface PlanFeature {
  text: string;
}

export interface Plan {
  name: string;
  price: string;
  period: "week" | "month" | "year" | "forever";
  features: string[];
  cta: string;
  popular?: boolean;
  icon?: string;
  credits?: number; // Credits field for the plan
  currency?: 'USD' | 'INR'; // Added currency field
  displayPrice?: string; // Added display price field for converted amounts
}

export interface UserCredit {
  id: string;
  user_id: string;
  balance: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
