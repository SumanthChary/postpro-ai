-- Allow referral system function to insert referrals
CREATE POLICY "Allow referral system to insert referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

-- Allow referral system function to update referrals  
CREATE POLICY "Allow referral system to update referrals" 
ON public.referrals 
FOR UPDATE 
USING (true);