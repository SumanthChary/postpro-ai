-- Fix the subscription limits data
UPDATE public.subscription_limits SET plan_name = 'Starter Plan' WHERE plan_name = 'Free Plan';

-- Add foreign key relationship between subscribers and subscription_limits
ALTER TABLE public.subscribers ADD CONSTRAINT fk_subscribers_plan_name 
FOREIGN KEY (plan_name) REFERENCES public.subscription_limits (plan_name);

-- Update enhance-post edge function userService to work with new system
-- First ensure subscription_limits table has the correct data
INSERT INTO public.subscription_limits (plan_name, monthly_post_limit, has_premium_templates, has_virality_score, has_ab_testing, has_advanced_ai, has_priority_support, credits_included) VALUES
('Starter Plan', 5, false, false, false, false, false, 50)
ON CONFLICT (plan_name) DO UPDATE SET 
  monthly_post_limit = 5,
  credits_included = 50;