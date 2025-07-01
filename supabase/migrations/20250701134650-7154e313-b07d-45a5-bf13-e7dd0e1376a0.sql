
-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  plan_name TEXT,
  monthly_post_count INTEGER DEFAULT 0,
  monthly_reset_date TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription info
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for edge functions to update subscription info
CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

-- Create policy for edge functions to insert subscription info
CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create usage tracking table
CREATE TABLE public.user_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL, -- 'post_enhancement', 'template_use', etc.
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Enable RLS for usage tracking
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own usage
CREATE POLICY "select_own_usage" ON public.user_usage
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for functions to insert usage
CREATE POLICY "insert_usage" ON public.user_usage
FOR INSERT
WITH CHECK (true);

-- Create subscription limits table
CREATE TABLE public.subscription_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT NOT NULL UNIQUE,
  monthly_post_limit INTEGER,
  has_premium_templates BOOLEAN DEFAULT false,
  has_virality_score BOOLEAN DEFAULT false,
  has_ab_testing BOOLEAN DEFAULT false,
  has_advanced_ai BOOLEAN DEFAULT false,
  has_priority_support BOOLEAN DEFAULT false,
  credits_included INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default subscription limits
INSERT INTO public.subscription_limits (plan_name, monthly_post_limit, has_premium_templates, has_virality_score, has_ab_testing, has_advanced_ai, has_priority_support, credits_included) VALUES
('Free Plan', 3, false, false, false, false, false, 50),
('Monthly Plan', -1, true, true, true, true, false, 320),
('Yearly Plan', -1, true, true, true, true, true, 3200),
('Enterprise Plan', -1, true, true, true, true, true, 19960);

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.subscribers 
  SET monthly_post_count = 0,
      monthly_reset_date = date_trunc('month', now()) + interval '1 month'
  WHERE monthly_reset_date <= now();
END;
$$;
