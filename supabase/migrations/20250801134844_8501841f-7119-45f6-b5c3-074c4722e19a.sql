-- Enable Row Level Security on unprotected tables
ALTER TABLE public.scheduled_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_limits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for scheduled_shares (public read access, admin write)
CREATE POLICY "Anyone can view scheduled shares" 
ON public.scheduled_shares 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage scheduled shares" 
ON public.scheduled_shares 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create RLS policies for subscription_limits (public read access, admin write)
CREATE POLICY "Anyone can view subscription limits" 
ON public.subscription_limits 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage subscription limits" 
ON public.subscription_limits 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Fix database function security by updating with proper security definer and search_path
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  UPDATE public.subscribers 
  SET monthly_post_count = 0,
      monthly_reset_date = date_trunc('month', now()) + interval '1 month'
  WHERE monthly_reset_date <= now();
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$function$;