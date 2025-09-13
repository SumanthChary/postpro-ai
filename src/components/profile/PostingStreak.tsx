import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Target } from "lucide-react";

interface PostingStreakProps {
  userId: string;
}

export const PostingStreak = ({ userId }: PostingStreakProps) => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(15);
  const [todayPosted, setTodayPosted] = useState(true);
  const [weeklyGoal] = useState(5);
  const [weeklyProgress, setWeeklyProgress] = useState(3);

  const streakProgress = (weeklyProgress / weeklyGoal) * 100;

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { label: "Fire Master", color: "bg-red-500", icon: <Flame className="w-3 h-3" /> };
    if (streak >= 14) return { label: "Consistent", color: "bg-orange-500", icon: <Trophy className="w-3 h-3" /> };
    if (streak >= 7) return { label: "Building", color: "bg-yellow-500", icon: <Target className="w-3 h-3" /> };
    return { label: "Getting Started", color: "bg-gray-500", icon: <Target className="w-3 h-3" /> };
  };

  const badge = getStreakBadge(currentStreak);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Posting Streak</h3>
        <Badge className={`${badge.color} text-white`}>
          {badge.icon}
          {badge.label}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`w-5 h-5 ${todayPosted ? 'text-orange-500' : 'text-gray-300'}`} />
            <span className="text-2xl font-bold text-gray-900">{currentStreak}</span>
            <span className="text-gray-600">days</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Best: {longestStreak} days</p>
            <p className={`text-xs ${todayPosted ? 'text-green-600' : 'text-red-500'}`}>
              {todayPosted ? '✓ Posted today' : '⚠ Not posted today'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Weekly Goal Progress</span>
            <span className="font-medium">{weeklyProgress}/{weeklyGoal} posts</span>
          </div>
          <Progress value={streakProgress} className="h-2" />
        </div>

        {!todayPosted && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              🔥 Keep your streak alive! Create a post today to maintain your {currentStreak}-day streak.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};