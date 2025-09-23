-- Update subscription_limits with proper plan configurations
INSERT INTO public.subscription_limits (plan_name, monthly_post_limit, has_premium_templates, has_virality_score, has_ab_testing, has_advanced_ai, has_priority_support, credits_included)
VALUES 
  ('Starter Plan', 5, false, false, false, false, false, 0),
  ('BASIC MONTHLY', -1, true, true, false, true, true, 50),
  ('PRO ANNUAL', -1, true, true, true, true, true, 100),
  ('LIFETIME CREATOR', -1, true, true, true, true, true, -1),
  ('Unlimited Plan', -1, true, true, true, true, true, -1)
ON CONFLICT (plan_name) DO UPDATE SET
  monthly_post_limit = EXCLUDED.monthly_post_limit,
  has_premium_templates = EXCLUDED.has_premium_templates,
  has_virality_score = EXCLUDED.has_virality_score,
  has_ab_testing = EXCLUDED.has_ab_testing,
  has_advanced_ai = EXCLUDED.has_advanced_ai,
  has_priority_support = EXCLUDED.has_priority_support,
  credits_included = EXCLUDED.credits_included;