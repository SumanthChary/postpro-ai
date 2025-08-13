-- Add indices for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_expires_at ON public.user_credits(expires_at);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON public.user_usage(user_id);

-- Add composite indices for commonly combined queries
CREATE INDEX IF NOT EXISTS idx_user_credits_user_balance_expiry ON public.user_credits(user_id, balance) WHERE balance > 0;
CREATE INDEX IF NOT EXISTS idx_subscribers_user_reset ON public.subscribers(user_id, monthly_reset_date);
