import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Zap, Trophy, Target } from "lucide-react";

interface EngagementPopupProps {
  trigger: 'streak' | 'milestone' | 'achievement';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const EngagementPopup = ({ trigger, message, isVisible, onClose }: EngagementPopupProps) => {
  const getIcon = () => {
    switch (trigger) {
      case 'streak':
        return <Zap className="w-8 h-8 text-yellow-500" />;
      case 'milestone':
        return <Trophy className="w-8 h-8 text-orange-500" />;
      case 'achievement':
        return <Target className="w-8 h-8 text-green-500" />;
      default:
        return <Zap className="w-8 h-8 text-blue-500" />;
    }
  };

  const getColors = () => {
    switch (trigger) {
      case 'streak':
        return 'from-yellow-400 to-orange-500';
      case 'milestone':
        return 'from-orange-400 to-red-500';
      case 'achievement':
        return 'from-green-400 to-blue-500';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className={`p-4 max-w-sm bg-gradient-to-r ${getColors()} text-white shadow-2xl border-0`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {getIcon()}
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-1">Great job!</h4>
                  <p className="text-sm text-white/90">{message}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};