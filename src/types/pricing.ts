
export interface PlanFeature {
  text: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
  icon?: string;
  credits?: number; // Added credits field for the plan
}

export interface UserCredit {
  id: string;
  user_id: string;
  balance: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
