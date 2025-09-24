-- Fix database constraint issues for better performance
-- Add proper unique constraints to prevent conflicts

-- Fix subscribers table constraint issue
ALTER TABLE public.subscribers ADD CONSTRAINT subscribers_user_id_unique UNIQUE (user_id);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id_created_at ON public.user_usage(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_subscription_limits_plan_name ON public.subscription_limits(plan_name);

-- Optimize user_usage table for faster queries
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id_desc ON public.user_usage(user_id, created_at DESC);

-- Add foreign key constraints for better performance
ALTER TABLE public.subscribers 
ADD CONSTRAINT fk_subscribers_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Ensure proper RLS policies are in place for performance
DROP POLICY IF EXISTS "Users can view their own subscriber data" ON public.subscribers;
CREATE POLICY "Users can view their own subscriber data" 
ON public.subscribers FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own subscriber data" ON public.subscribers;
CREATE POLICY "Users can update their own subscriber data" 
ON public.subscribers FOR ALL 
USING (auth.uid() = user_id);