import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [enhancedPost, setEnhancedPost] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = () => {
    setIsEnhancing(true);
    // Simulate API call
    setTimeout(() => {
      setEnhancedPost("🚀 Just launched my new project! Excited to see where this goes. 💼 #entrepreneur #innovation #growth");
      setIsEnhancing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Turn Every Social Post Into Your{" "}
              <span className="block">Next Big Break</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The AI-powered content enhancer that transforms average posts into viral-worthy content
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Join 12,847+ creators</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Featured in</span>
                <Badge variant="secondary" className="font-semibold">TechCrunch</Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {/* Problem Statement */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
                Tired of posts that get lost in the feed? 📉
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Input */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Post</h3>
                  <Textarea
                    placeholder="Paste your social media post here... (e.g., 'Just launched my new project! Excited to see where this goes.')"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    className="min-h-[200px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Enhancement Features */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                    😊 Add Emojis
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                    # Optimize Hashtags
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    🚀 Boost Engagement
                  </Badge>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={handleEnhance}
                  disabled={!post.trim() || isEnhancing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg"
                >
                  {isEnhancing ? "✨ ENHANCING..." : "✨ ENHANCE MY POST FREE"}
                </Button>

                <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                  🔒 Your content stays private and secure
                </p>
              </div>

              {/* Right Column - Output */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Enhanced Version</h3>
                  <div className="min-h-[200px] p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    {enhancedPost ? (
                      <p className="text-gray-900 whitespace-pre-wrap">{enhancedPost}</p>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p>Your enhanced post will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Process Steps */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-blue-600 font-semibold">1</span>
                    </div>
                    <p>Paste</p>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-blue-600 font-semibold">2</span>
                    </div>
                    <p>AI Enhances</p>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-blue-600 font-semibold">3</span>
                    </div>
                    <p>Get Results</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center mt-12">
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>15 people enhancing posts right now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;