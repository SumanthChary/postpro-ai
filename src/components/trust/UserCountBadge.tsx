import { Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface UserCountBadgeProps {
  variant?: "small" | "large";
  animated?: boolean;
}

const UserCountBadge = ({ variant = "small", animated = true }: UserCountBadgeProps) => {
  const [count, setCount] = useState(47);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCount(prev => Math.min(prev + Math.floor(Math.random() * 3), 52));
          setIsAnimating(false);
        }, 300);
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [animated]);

  if (variant === "large") {
    return (
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className={`font-bold text-lg text-gray-900 transition-all duration-300 ${isAnimating ? 'scale-110 text-green-600' : ''}`}>
            {count}+ Creators
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            Growing daily
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm">
      <Users className="w-4 h-4 text-green-600" />
      <span className={`font-semibold text-sm text-gray-900 transition-all duration-300 ${isAnimating ? 'text-green-600' : ''}`}>
        {count}+ creators
      </span>
    </div>
  );
};

export default UserCountBadge;