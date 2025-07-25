-- Create scheduled shares table
CREATE TABLE public.scheduled_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  platforms TEXT[] NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scheduled_shares ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own scheduled shares
CREATE POLICY "users_can_view_own_scheduled_shares"
ON public.scheduled_shares
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for users to insert their own scheduled shares
CREATE POLICY "users_can_insert_own_scheduled_shares"
ON public.scheduled_shares
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own scheduled shares
CREATE POLICY "users_can_update_own_scheduled_shares"
ON public.scheduled_shares
FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy for users to delete their own scheduled shares
CREATE POLICY "users_can_delete_own_scheduled_shares"
ON public.scheduled_shares
FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_scheduled_shares_user_id ON public.scheduled_shares(user_id);
CREATE INDEX idx_scheduled_shares_status ON public.scheduled_shares(status);
CREATE INDEX idx_scheduled_shares_scheduled_time ON public.scheduled_shares(scheduled_time);
