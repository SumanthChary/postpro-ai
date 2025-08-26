import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { motion, AnimatePresence } from "framer-motion";
import { StreakCounter } from "@/components/streaks/StreakCounter";

interface HeroSectionProps {
  isAuthenticated?: boolean;
  username?: string;
}

const tickerData = [
  { name: "Sarah", metric: "15K views", emoji: "🔥" },
  { name: "Mike", metric: "89% engagement", emoji: "⚡" },
  { name: "Jessica", metric: "went viral", emoji: "🚀" },
  { name: "Alex", metric: "3x more likes", emoji: "❤️" },
  { name: "Emma", metric: "50K impressions", emoji: "📈" },
];

const HeroSectionNew = ({ isAuthenticated = false, username }: HeroSectionProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-56 h-56 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Section */}
          <div className="text-center mb-16">
            {isAuthenticated && username ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                    Welcome back,
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                      {username}
                    </span>
                  </h1>
                  <StreakCounter className="mt-4" />
                </div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Ready to create another viral post? Let's transform your ideas into engagement magnets.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight leading-none mb-6">
                  Get{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Noticed
                  </span>
                </h1>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                  Transform rough ideas into posts that build your professional authority
                </p>
              </motion.div>
            )}

            {/* Live Success Ticker */}
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500 font-medium">LIVE:</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTickerIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="ml-3 flex items-center space-x-1"
                    >
                      <span className="text-lg">
                        {tickerData[currentTickerIndex].emoji}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {tickerData[currentTickerIndex].name}:
                      </span>
                      <span className="text-blue-600 font-bold">
                        {tickerData[currentTickerIndex].metric}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch 2-Min Demo
              </Button>
            </motion.div>
          </div>

          {/* Post Enhancer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Creating Your Viral Post
                </h2>
                <p className="text-gray-600">
                  Just paste your rough idea and watch AI transform it into an engagement magnet
                </p>
              </div>
              
              <PostEnhancer 
                post={post} 
                setPost={setPost} 
                category={category} 
                setCategory={setCategory} 
                styleTone={styleTone} 
                setStyleTone={setStyleTone} 
              />
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">12K+</span>
              </div>
              <p className="text-gray-600 text-sm">Active Creators</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">2.3M+</span>
              </div>
              <p className="text-gray-600 text-sm">Posts Created</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-purple-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">89%</span>
              </div>
              <p className="text-gray-600 text-sm">See Higher Engagement</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-orange-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">5+</span>
              </div>
              <p className="text-gray-600 text-sm">Hours Saved Weekly</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionNew;