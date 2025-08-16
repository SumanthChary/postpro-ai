-- Add Whop integration columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS whop_user_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS whop_access_token TEXT,
ADD COLUMN IF NOT EXISTS whop_refresh_token TEXT;

-- Add Whop integration columns to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS whop_subscription_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS whop_payment_id TEXT,
ADD COLUMN IF NOT EXISTS whop_community_id TEXT;

-- Create index for faster Whop user lookups
CREATE INDEX IF NOT EXISTS idx_profiles_whop_user_id ON public.profiles(whop_user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_whop_subscription_id ON public.subscribers(whop_subscription_id);

-- Create Whop app installations table
CREATE TABLE IF NOT EXISTS public.whop_installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL,
  community_id TEXT NOT NULL,
  installed_by TEXT NOT NULL,
  settings JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on whop_installations
ALTER TABLE public.whop_installations ENABLE ROW LEVEL SECURITY;

-- Create policies for whop_installations
CREATE POLICY "whop_installations_select" ON public.whop_installations
  FOR SELECT
  USING (true);

CREATE POLICY "whop_installations_insert" ON public.whop_installations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "whop_installations_update" ON public.whop_installations
  FOR UPDATE
  USING (true);

-- Create trigger for updated_at on whop_installations
CREATE TRIGGER update_whop_installations_updated_at
  BEFORE UPDATE ON public.whop_installations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();