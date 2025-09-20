import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Zap, TrendingUp, Award, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StreaksSectionProps {
  userId: string;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalPosts: number;
  streakStartDate: string;
  lastPostDate: string;
  weeklyGoal: number;
  monthlyGoal: number;
  achievements: string[];
}

export const StreaksSection = ({ userId }: StreaksSectionProps) => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalPosts: 0,
    streakStartDate: '',
    lastPostDate: '',
    weeklyGoal: 7,
    monthlyGoal: 30,
    achievements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreakData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);

        // Fetch user usage data to calculate streaks
        const { data: usageData, error: usageError } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (usageError) throw usageError;

        // Calculate streak data
        const calculateStreaks = (data: any[]) => {
          if (!data || data.length === 0) {
            return {
              currentStreak: 0,
              longestStreak: 0,
              totalPosts: 0,
              streakStartDate: '',
              lastPostDate: '',
              achievements: []
            };
          }

          const today = new Date();
          const posts = data.map(d => new Date(d.created_at));
          const uniqueDays = [...new Set(posts.map(date => date.toDateString()))];
          
          let currentStreak = 0;
          let longestStreak = 0;
          let tempStreak = 0;
          
          // Calculate current streak
          let checkDate = new Date(today);
          while (uniqueDays.includes(checkDate.toDateString()) || 
                 uniqueDays.includes(new Date(checkDate.getTime() - 24 * 60 * 60 * 1000).toDateString())) {
            if (uniqueDays.includes(checkDate.toDateString())) {
              currentStreak++;
            }
            checkDate.setDate(checkDate.getDate() - 1);
            if (currentStreak === 0 && !uniqueDays.includes(checkDate.toDateString())) break;
          }

          // Calculate longest streak
          const sortedDays = uniqueDays.sort();
          for (let i = 0; i < sortedDays.length; i++) {
            tempStreak = 1;
            for (let j = i + 1; j < sortedDays.length; j++) {
              const prevDate = new Date(sortedDays[j - 1]);
              const currDate = new Date(sortedDays[j]);
              const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays <= 1) {
                tempStreak++;
              } else {
                break;
              }
            }
            longestStreak = Math.max(longestStreak, tempStreak);
          }

          // Generate achievements
          const achievements = [];
          if (currentStreak >= 3) achievements.push("3-Day Streak Master");
          if (currentStreak >= 7) achievements.push("Weekly Warrior");
          if (currentStreak >= 14) achievements.push("Fortnight Champion");
          if (currentStreak >= 30) achievements.push("Monthly Legend");
          if (longestStreak >= 10) achievements.push("Consistency Expert");
          if (data.length >= 50) achievements.push("Content Creator");
          if (data.length >= 100) achievements.push("Posting Pro");

          return {
            currentStreak: Math.max(currentStreak, 0),
            longestStreak: Math.max(longestStreak, 0),
            totalPosts: data.length,
            streakStartDate: data.length > 0 ? data[data.length - 1].created_at : '',
            lastPostDate: data.length > 0 ? data[0].created_at : '',
            achievements
          };
        };

        const calculatedData = calculateStreaks(usageData);
        setStreakData({
          ...calculatedData,
          weeklyGoal: 7,
          monthlyGoal: 30
        });

      } catch (error) {
        console.error('Error fetching streak data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, [userId]);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "from-orange-500 to-red-500";
    if (streak >= 14) return "from-green-500 to-blue-500";
    if (streak >= 7) return "from-blue-500 to-green-500";
    if (streak >= 3) return "from-blue-400 to-blue-600";
    return "from-gray-400 to-gray-600";
  };

  const getAchievementIcon = (achievement: string) => {
    if (achievement.includes("Streak") || achievement.includes("Weekly") || achievement.includes("Fortnight") || achievement.includes("Monthly")) {
      return <Target className="w-4 h-4" />;
    }
    if (achievement.includes("Consistency")) {
      return <TrendingUp className="w-4 h-4" />;
    }
    if (achievement.includes("Creator") || achievement.includes("Pro")) {
      return <Award className="w-4 h-4" />;
    }
    return <Zap className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-lg border border-blue-200/50 shadow-2xl rounded-3xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-lg border border-blue-200/50 shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-cabinet">Your Posting Streaks</h2>
        <Zap className="w-6 h-6 text-orange-500" />
      </div>

      {/* Main Streak Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <Card className={`p-4 sm:p-6 bg-gradient-to-br ${getStreakColor(streakData.currentStreak)} text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl`}>
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Current
            </Badge>
          </div>
          <div className="text-2xl sm:text-3xl font-bold mb-1">
            {streakData.currentStreak}
          </div>
          <div className="text-sm sm:text-base text-white/90">
            Day{streakData.currentStreak !== 1 ? 's' : ''} Streak
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-6 h-6 sm:w-8 sm:h-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Record
            </Badge>
          </div>
          <div className="text-2xl sm:text-3xl font-bold mb-1">
            {streakData.longestStreak}
          </div>
          <div className="text-sm sm:text-base text-white/90">
            Longest Streak
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Total
            </Badge>
          </div>
          <div className="text-2xl sm:text-3xl font-bold mb-1">
            {streakData.totalPosts}
          </div>
          <div className="text-sm sm:text-base text-white/90">
            Posts Enhanced
          </div>
        </Card>
      </div>

      {/* Progress Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Weekly Goal</h3>
            </div>
            <span className="text-sm font-medium text-blue-700">
              {Math.min(streakData.currentStreak, 7)}/{streakData.weeklyGoal}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((streakData.currentStreak / streakData.weeklyGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Monthly Goal</h3>
            </div>
            <span className="text-sm font-medium text-green-700">
              {Math.min(streakData.currentStreak, 30)}/{streakData.monthlyGoal}
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((streakData.currentStreak / streakData.monthlyGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      {streakData.achievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            Your Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {streakData.achievements.map((achievement, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 hover:from-orange-200 hover:to-orange-300 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              >
                {getAchievementIcon(achievement)}
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Keep Going!</h4>
            <p className="text-sm text-blue-700">
              {streakData.currentStreak === 0 
                ? "Start your posting streak today and build momentum for your LinkedIn success!"
                : `Amazing! You're on a ${streakData.currentStreak}-day streak. Consistency is the key to LinkedIn mastery!`
              }
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};