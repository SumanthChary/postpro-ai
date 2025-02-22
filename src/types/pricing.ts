
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
}
