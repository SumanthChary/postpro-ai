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
    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-8 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <div className="text-3xl font-bold text-foreground">{postsEnhanced.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Posts Enhanced</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            <div className="text-3xl font-bold text-foreground">{activeUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div className="text-3xl font-bold text-foreground">2.4x</div>
            <div className="text-sm text-muted-foreground">Avg. Engagement Boost</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
