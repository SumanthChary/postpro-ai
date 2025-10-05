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
    <section className="py-8 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{postsEnhanced.toLocaleString()}+</p>
              <p className="text-sm text-muted-foreground">Posts Enhanced</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active Professionals</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">89%</p>
              <p className="text-sm text-muted-foreground">Avg. Engagement Boost</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
