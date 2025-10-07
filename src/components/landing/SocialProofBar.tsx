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
  return;
};
export default SocialProofBar;