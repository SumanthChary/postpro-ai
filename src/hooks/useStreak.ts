import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StreakReward {
  id: string;
  milestone: number;
  type: string;
  value: any;
  title: string;
  description: string;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  nextReward?: {
    milestone: number;
    daysLeft: number;
    title: string;
  };
  recentRewards?: StreakReward[];
}

export const useStreak = () => {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStreak = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user streak data
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get next reward
      const { data: nextRewardData } = await supabase
        .from('streak_rewards')
        .select('*')
        .gt('streak_milestone', streakData?.current_streak || 0)
        .order('streak_milestone', { ascending: true })
        .limit(1)
        .single();

      const streakInfo: StreakData = {
        currentStreak: streakData?.current_streak || 0,
        longestStreak: streakData?.longest_streak || 0,
        lastActivityDate: streakData?.last_activity_date || null,
        nextReward: nextRewardData ? {
          milestone: nextRewardData.streak_milestone,
          daysLeft: nextRewardData.streak_milestone - (streakData?.current_streak || 0),
          title: nextRewardData.reward_title
        } : undefined
      };

      setStreak(streakInfo);
    } catch (error) {
      console.error('Error fetching streak:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Call the streak update function
      const { data, error } = await supabase.rpc('update_user_streak', {
        user_id_param: user.id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        
        // Parse rewards if they exist
        const rewardsArray = Array.isArray(result.rewards_earned) ? 
          result.rewards_earned.map((reward: any) => ({
            id: reward.id,
            milestone: reward.milestone,
            type: reward.type,
            value: reward.value,
            title: reward.title,
            description: reward.description
          })) : [];

        // Update local state
        setStreak(prev => ({
          ...prev,
          currentStreak: result.current_streak,
          longestStreak: result.longest_streak,
          lastActivityDate: new Date().toISOString().split('T')[0],
          recentRewards: rewardsArray
        }));

        // Show rewards toast
        if (rewardsArray.length > 0) {
          rewardsArray.forEach((reward: StreakReward) => {
            toast({
              title: "🎉 Streak Reward!",
              description: `${reward.title}: ${reward.description}`,
              duration: 5000,
            });
          });
        }

        // Show new record toast
        if (result.is_new_record) {
          toast({
            title: "🏆 New Personal Record!",
            description: `${result.current_streak} days - Your longest streak yet!`,
            duration: 4000,
          });
        }
      }

      // Refresh streak data
      await fetchStreak();
    } catch (error) {
      console.error('Error updating streak:', error);
      toast({
        title: "Error",
        description: "Failed to update streak. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  return {
    streak,
    loading,
    fetchStreak,
    updateStreak
  };
};