-- Add function to handle expired subscriptions
CREATE OR REPLACE FUNCTION handle_expired_subscriptions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update expired subscriptions to free plan
  UPDATE public.subscribers
  SET plan_name = 'Free Plan',
      subscribed = false,
      subscription_tier = NULL,
      monthly_post_count = 0,
      monthly_reset_date = date_trunc('month', now()) + interval '1 month'
  WHERE subscription_end < now() AND plan_name != 'Free Plan';

  -- Insert trigger event for notification
  INSERT INTO public.user_notifications (user_id, type, message)
  SELECT user_id, 'subscription_expired', 'Your subscription has expired. You have been moved to the Free Plan.'
  FROM public.subscribers
  WHERE subscription_end < now() AND plan_name != 'Free Plan';
END;
$$;

-- Create notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on notifications table
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.user_notifications FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Service role can manage notifications"
ON public.user_notifications FOR ALL
USING (true)
WITH CHECK (true);

-- Create a cron job to run the expired subscriptions handler daily
SELECT cron.schedule(
  'handle-expired-subscriptions',
  '0 0 * * *', -- Run at midnight every day
  $$
    SELECT handle_expired_subscriptions();
  $$
);
