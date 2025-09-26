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

  const getStreakDisplay = () => {
    if (currentStreak === 0) {
      return {
        bgClass: "bg-gradient-to-r from-gray-50 to-gray-100",
        borderClass: "border-gray-200",
        textClass: "text-gray-500",
        flameClass: "text-gray-400"
      };
    }
    if (currentStreak < 3) {
      return {
        bgClass: "bg-gradient-to-r from-blue-50 to-indigo-50",
        borderClass: "border-blue-200",
        textClass: "text-blue-600",
        flameClass: "text-blue-500"
      };
    }
    if (currentStreak < 7) {
      return {
        bgClass: "bg-gradient-to-r from-blue-100 to-indigo-100",
        borderClass: "border-blue-300",
        textClass: "text-blue-700",
        flameClass: "text-blue-600"
      };
    }
    if (currentStreak < 14) {
      return {
        bgClass: "bg-gradient-to-r from-indigo-100 to-purple-100",
        borderClass: "border-indigo-300",
        textClass: "text-indigo-700",
        flameClass: "text-indigo-600"
      };
    }
    return {
      bgClass: "bg-gradient-to-r from-purple-100 to-pink-100",
      borderClass: "border-purple-300",
      textClass: "text-purple-700",
      flameClass: "text-purple-600"
    };
  };

  const streakDisplay = getStreakDisplay();

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${streakDisplay.bgClass} ${streakDisplay.borderClass} border shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center gap-1">
        <FlameIcon 
          className={`w-4 h-4 ${streakDisplay.flameClass} transition-colors duration-200`}
        />
        <span className={`text-sm font-semibold ${streakDisplay.textClass} transition-colors duration-200`}>
          {currentStreak}
        </span>
      </div>
      <div className={`text-xs font-medium ${streakDisplay.textClass} opacity-75 hidden sm:block`}>
        {currentStreak === 0 ? 'Start your streak!' : 
         currentStreak === 1 ? 'day streak' : 
         'days streak'}
      </div>
    </div>
  );
};