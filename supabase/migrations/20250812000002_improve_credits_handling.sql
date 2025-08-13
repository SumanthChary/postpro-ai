-- Add constraints and trigger for user_credits
ALTER TABLE public.user_credits
ADD CONSTRAINT positive_balance CHECK (balance >= 0),
ADD CONSTRAINT valid_expiry CHECK (expires_at > created_at);

-- Create function to clean up expired credits
CREATE OR REPLACE FUNCTION cleanup_expired_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Archive expired credits
  WITH expired_credits AS (
    DELETE FROM public.user_credits
    WHERE expires_at < now() AND balance > 0
    RETURNING *
  )
  INSERT INTO public.credit_history (user_id, amount, action, reason)
  SELECT user_id, balance, 'expired', 'Credits expired'
  FROM expired_credits;
END;
$$;

-- Create credit history table
CREATE TABLE IF NOT EXISTS public.credit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  action TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on credit history
ALTER TABLE public.credit_history ENABLE ROW LEVEL SECURITY;

-- Create policies for credit history
CREATE POLICY "Users can view their own credit history"
ON public.credit_history FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Service role can manage credit history"
ON public.credit_history FOR ALL
USING (true)
WITH CHECK (true);

-- Create a cron job to clean up expired credits daily
SELECT cron.schedule(
  'cleanup-expired-credits',
  '0 1 * * *', -- Run at 1 AM every day
  $$
    SELECT cleanup_expired_credits();
  $$
);
