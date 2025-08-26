import { useState, useEffect } from 'react';
import { useStreak } from '@/hooks/useStreak';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Flame, Trophy, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreakCounterProps {
  className?: string;
  showFull?: boolean;
}

export const StreakCounter = ({ className = '', showFull = false }: StreakCounterProps) => {
  const { streak, loading, updateStreak } = useStreak();
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  useEffect(() => {
    if (streak?.recentRewards && streak.recentRewards.length > 0) {
      setShowRewardAnimation(true);
      const timer = setTimeout(() => setShowRewardAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [streak?.recentRewards]);

  if (loading || !streak) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const getStreakIcon = () => {
    if (streak.currentStreak >= 30) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (streak.currentStreak >= 14) return <Star className="w-4 h-4 text-purple-500" />;
    if (streak.currentStreak >= 7) return <Zap className="w-4 h-4 text-blue-500" />;
    return <Flame className="w-4 h-4 text-orange-500" />;
  };

  const getStreakColor = () => {
    if (streak.currentStreak >= 30) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (streak.currentStreak >= 14) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (streak.currentStreak >= 7) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-orange-500 to-red-500';
  };

  if (!showFull) {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
        >
          <Badge className={`${getStreakColor()} text-white border-0 px-3 py-1`}>
            {getStreakIcon()}
            <span className="ml-1 font-semibold">{streak.currentStreak}</span>
          </Badge>
        </motion.div>
        
        <AnimatePresence>
          {showRewardAnimation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-8 left-0 right-0 text-center"
            >
              <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                +{streak.recentRewards?.[0]?.value?.amount || 0} credits!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${getStreakColor()}`}>
            {getStreakIcon()}
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {streak.currentStreak} Day Streak
            </div>
            <div className="text-sm text-gray-600">
              Best: {streak.longestStreak} days
            </div>
          </div>
        </div>
        
        {streak.nextReward && (
          <div className="text-right">
            <div className="text-xs text-gray-500">Next reward in</div>
            <div className="text-sm font-semibold text-gray-700">
              {streak.nextReward.daysLeft} days
            </div>
          </div>
        )}
      </div>
      
      {streak.recentRewards && streak.recentRewards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-gray-100"
        >
          <div className="text-xs text-green-600 font-semibold">
            🎉 New reward: {streak.recentRewards[0].title}
          </div>
        </motion.div>
      )}
    </Card>
  );
};