-- Ensure proper subscription limits exist
INSERT INTO public.subscription_limits (plan_name, monthly_post_limit, has_premium_templates, has_virality_score, has_ab_testing, has_advanced_ai, has_priority_support, credits_included)
VALUES 
('Starter Plan', 5, false, false, false, false, false, 0)
ON CONFLICT (plan_name) DO UPDATE SET
  monthly_post_limit = 5,
  has_premium_templates = false,
  has_virality_score = false,
  has_ab_testing = false,
  has_advanced_ai = false,
  has_priority_support = false,
  credits_included = 0;

-- Update any existing users with unlimited access back to starter plan (except admin)
UPDATE public.subscribers 
SET plan_name = 'Starter Plan', monthly_post_count = 0
WHERE email != 'enjoywithpandu@gmail.com' 
AND (plan_name = 'Unlimited Plan' OR plan_name IS NULL OR plan_name = '');

-- Ensure admin user has unlimited plan
INSERT INTO public.subscription_limits (plan_name, monthly_post_limit, has_premium_templates, has_virality_score, has_ab_testing, has_advanced_ai, has_priority_support, credits_included)
VALUES 
('Unlimited Plan', -1, true, true, true, true, true, -1)
ON CONFLICT (plan_name) DO UPDATE SET
  monthly_post_limit = -1,
  has_premium_templates = true,
  has_virality_score = true,
  has_ab_testing = true,
  has_advanced_ai = true,
  has_priority_support = true,
  credits_included = -1;