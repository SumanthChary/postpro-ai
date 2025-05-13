
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  const [showTryNow, setShowTryNow] = useState(false);

  const handleTryNowClick = () => {
    setShowTryNow(true);
    // Smooth scroll to the post enhancer
    setTimeout(() => {
      document.getElementById('post-enhancer')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="relative">
      {/* 3D Element - Replace with your Spline component when ready */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -z-10 hidden lg:block">
        <div className="w-96 h-96 bg-gradient-to-r from-electric-purple/20 to-bright-teal/20 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Live Stats Counter */}
        <div className="mb-6 text-center animate-pulse">
          <span className="bg-light-lavender px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-electric-purple" />
            <span>Over 9,234 posts enhanced this week</span>
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-4 sm:mb-6 tracking-tight leading-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Social Media Presence
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-custom-text mb-6 sm:mb-8 leading-relaxed font-body px-4 sm:px-0">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
          
          {/* CTA Button */}
          {!showTryNow && (
            <Button 
              onClick={handleTryNowClick} 
              size="lg" 
              className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 transition-all text-white font-semibold px-8 py-6 text-lg h-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try Live Preview
            </Button>
          )}
        </div>

        {/* Why Creators Love Section */}
        {!showTryNow && (
          <Card className="max-w-3xl mx-auto p-6 mb-10 bg-white/80 backdrop-blur">
            <h3 className="text-center font-bold text-xl mb-4">Why Creators Love PostPro AI ❤️</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <span className="text-bright-teal font-bold">✔</span>
                <p>Makes writing daily posts effortless</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-bright-teal font-bold">✔</span>
                <p>Gets more likes, comments, and shares</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-bright-teal font-bold">✔</span>
                <p>Builds your personal brand while you sleep</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-bright-teal font-bold">✔</span>
                <p>No fluff. Just real, converting content</p>
              </div>
            </div>
          </Card>
        )}

        {/* Post Enhancer */}
        <div id="post-enhancer">
          <PostEnhancer
            post={post}
            setPost={setPost}
            category={category}
            setCategory={setCategory}
            styleTone={styleTone}
            setStyleTone={setStyleTone}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
