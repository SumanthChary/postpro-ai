import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FlameIcon } from "lucide-react";

interface HeaderStreakCounterProps {
  userId: string | null;
}

export const HeaderStreakCounter = ({ userId }: HeaderStreakCounterProps) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch user usage data to calculate real streaks
        const { data: usageData, error: usageError } = await supabase
          .from('user_usage')
          .select('created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (usageError) throw usageError;

        let streakCount = 0;
        
        if (usageData && usageData.length > 0) {
          // Get unique dates from usage data
          const dates = usageData.map(u => new Date(u.created_at).toDateString());
          const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
          
          // Calculate current streak
          const today = new Date();
          
          for (let i = 0; i < uniqueDates.length; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            
            if (uniqueDates.includes(checkDate.toDateString())) {
              streakCount++;
            } else {
              break;
            }
          }
        }
        
        setCurrentStreak(streakCount);
      } catch (error) {
        console.error('Error fetching streak:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
    
    // Set up real-time subscription for user_usage changes
    const channel = supabase
      .channel('header-streak-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_usage',
          filter: `user_id=eq.${userId}`
        },
        () => {
          fetchStreak(); // Refetch when new usage is added
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (loading || !userId) return null;

  const getStreakColor = () => {
    if (currentStreak === 0) return "text-gray-400";
    if (currentStreak < 3) return "text-orange-500";
    if (currentStreak < 7) return "text-orange-600";
    if (currentStreak < 14) return "text-red-500";
    return "text-red-600";
  };

  const getFlameAnimation = () => {
    if (currentStreak === 0) return "";
    if (currentStreak < 3) return "animate-pulse";
    if (currentStreak < 7) return "animate-bounce";
    return "animate-pulse";
  };

  return (
    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
      <FlameIcon 
        className={`w-4 h-4 ${getStreakColor()} ${getFlameAnimation()}`}
      />
      <span className={`text-sm font-bold ${getStreakColor()}`}>
        {currentStreak}
      </span>
    </div>
  );
};