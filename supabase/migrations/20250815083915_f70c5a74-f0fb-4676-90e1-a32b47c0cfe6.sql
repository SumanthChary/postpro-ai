-- Create referrals table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referred_user_id UUID NOT NULL,
  referred_user_plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals table
CREATE POLICY "Users can view their own referrals as referrer" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id);

CREATE POLICY "Users can view referrals where they are the referred user" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referred_user_id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON public.referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals(created_at);

-- Add columns to profiles table if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS free_enhancements INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS plan_upgraded_via_referral BOOLEAN DEFAULT false;