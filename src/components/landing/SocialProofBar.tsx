import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
const SocialProofBar = () => {
  const [postsEnhanced, setPostsEnhanced] = useState(12847);
  const [activeUsers, setActiveUsers] = useState(432);
  useEffect(() => {
    // Simulate real-time counter growth
    const interval = setInterval(() => {
      setPostsEnhanced(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-4 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-foreground/80">
              <span className="font-semibold text-foreground">{postsEnhanced.toLocaleString()}</span> posts enhanced today
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground/80">
              <span className="font-semibold text-foreground">{activeUsers}</span> professionals online now
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-foreground/80">
              Average <span className="font-semibold text-foreground">287%</span> engagement boost
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;