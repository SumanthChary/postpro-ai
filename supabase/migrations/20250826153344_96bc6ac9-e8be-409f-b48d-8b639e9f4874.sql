-- Create user_streaks table
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  streak_freeze_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create streak_rewards table
CREATE TABLE public.streak_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  streak_milestone INTEGER NOT NULL,
  reward_type TEXT NOT NULL,
  reward_value JSONB NOT NULL,
  reward_title TEXT NOT NULL,
  reward_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_streak_rewards table (claimed rewards)
CREATE TABLE public.user_streak_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_reward_id UUID NOT NULL REFERENCES public.streak_rewards(id) ON DELETE CASCADE,
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, streak_reward_id)
);

-- Enable RLS on all tables
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streak_rewards ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_streaks
CREATE POLICY "Users can view their own streaks" ON public.user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" ON public.user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON public.user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Functions can manage streaks" ON public.user_streaks
  FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for streak_rewards (viewable by all)
CREATE POLICY "Anyone can view streak rewards" ON public.streak_rewards
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage streak rewards" ON public.streak_rewards
  FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for user_streak_rewards
CREATE POLICY "Users can view their own claimed rewards" ON public.user_streak_rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can claim rewards" ON public.user_streak_rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Functions can manage user rewards" ON public.user_streak_rewards
  FOR ALL USING (true) WITH CHECK (true);

-- Create trigger for updating user_streaks updated_at
CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON public.user_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default streak rewards
INSERT INTO public.streak_rewards (streak_milestone, reward_type, reward_value, reward_title, reward_description) VALUES
(3, 'credits', '{"amount": 5}', '🔥 3-Day Streak', 'Keep the momentum going! 5 bonus credits'),
(7, 'credits', '{"amount": 10}', '⚡ Week Warrior', 'One week straight! 10 bonus credits'),
(14, 'credits', '{"amount": 25}', '💎 Two Week Champion', 'Incredible dedication! 25 bonus credits'),
(30, 'credits', '{"amount": 50}', '🏆 Monthly Master', 'A full month of consistency! 50 bonus credits'),
(60, 'feature', '{"feature": "premium_templates", "duration_days": 7}', '🎨 Template Access', '7 days of premium templates access'),
(100, 'credits', '{"amount": 100}', '🚀 Century Club', '100 days! You are unstoppable! 100 bonus credits'),
(365, 'feature', '{"feature": "lifetime_premium", "duration_days": -1}', '👑 Year Legend', 'Lifetime premium access - You are a PostPro legend!');

-- Create function to update streak
CREATE OR REPLACE FUNCTION public.update_user_streak(user_id_param UUID)
RETURNS TABLE(current_streak INTEGER, longest_streak INTEGER, is_new_record BOOLEAN, rewards_earned JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    streak_record RECORD;
    today_date DATE := CURRENT_DATE;
    yesterday_date DATE := CURRENT_DATE - INTERVAL '1 day';
    new_current_streak INTEGER;
    new_longest_streak INTEGER;
    is_record BOOLEAN := false;
    earned_rewards JSONB := '[]'::jsonb;
    reward_record RECORD;
BEGIN
    -- Get or create user streak record
    SELECT * INTO streak_record 
    FROM public.user_streaks 
    WHERE user_id = user_id_param;
    
    IF NOT FOUND THEN
        -- Create new streak record
        INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (user_id_param, 1, 1, today_date)
        RETURNING * INTO streak_record;
        new_current_streak := 1;
        new_longest_streak := 1;
        is_record := true;
    ELSE
        -- Check if already updated today
        IF streak_record.last_activity_date = today_date THEN
            RETURN QUERY SELECT streak_record.current_streak, streak_record.longest_streak, false, '[]'::jsonb;
            RETURN;
        END IF;
        
        -- Calculate new streak
        IF streak_record.last_activity_date = yesterday_date THEN
            -- Continue streak
            new_current_streak := streak_record.current_streak + 1;
        ELSE
            -- Reset streak (missed days)
            new_current_streak := 1;
        END IF;
        
        -- Update longest streak if needed
        new_longest_streak := GREATEST(streak_record.longest_streak, new_current_streak);
        is_record := new_longest_streak > streak_record.longest_streak;
        
        -- Update the record
        UPDATE public.user_streaks 
        SET current_streak = new_current_streak,
            longest_streak = new_longest_streak,
            last_activity_date = today_date,
            updated_at = now()
        WHERE user_id = user_id_param;
    END IF;
    
    -- Check for streak rewards to claim
    FOR reward_record IN 
        SELECT sr.* 
        FROM public.streak_rewards sr
        WHERE sr.streak_milestone <= new_current_streak
        AND NOT EXISTS (
            SELECT 1 FROM public.user_streak_rewards usr 
            WHERE usr.user_id = user_id_param 
            AND usr.streak_reward_id = sr.id
        )
        ORDER BY sr.streak_milestone DESC
    LOOP
        -- Claim the reward
        INSERT INTO public.user_streak_rewards (user_id, streak_reward_id)
        VALUES (user_id_param, reward_record.id);
        
        -- Add to earned rewards
        earned_rewards := earned_rewards || jsonb_build_object(
            'id', reward_record.id,
            'milestone', reward_record.streak_milestone,
            'type', reward_record.reward_type,
            'value', reward_record.reward_value,
            'title', reward_record.reward_title,
            'description', reward_record.reward_description
        );
        
        -- If it's credits, add them to user_credits
        IF reward_record.reward_type = 'credits' THEN
            INSERT INTO public.user_credits (user_id, balance, expires_at)
            VALUES (
                user_id_param, 
                (reward_record.reward_value->>'amount')::integer,
                now() + INTERVAL '365 days'
            );
        END IF;
    END LOOP;
    
    RETURN QUERY SELECT new_current_streak, new_longest_streak, is_record, earned_rewards;
END;
$$;