import { useState } from "react";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-element absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-r from-accent/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="floating-element-delayed absolute top-40 right-[15%] w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="floating-element absolute bottom-32 left-[20%] w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>

      <div className="relative z-10 container-custom pt-32 pb-20">
        {/* Status Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-indigo-500/10 border border-accent/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-soft"></div>
            <span className="text-sm font-medium text-foreground">✨ Transform your content with AI magic</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="font-space text-5xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up">
            Transform Your{" "}
            <span className="text-gradient">Social Media</span>{" "}
            Into a{" "}
            <span className="text-gradient">Growth Engine</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up-delay-1">
            Create captivating LinkedIn, Twitter & Instagram posts that drive engagement, 
            build authority, and convert followers into customers. Join 10,000+ professionals 
            who've transformed their social presence.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 fade-in-up-delay-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft border border-gray-200/60">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">AI-Powered Content</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft border border-gray-200/60">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft border border-gray-200/60">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">10x Engagement</span>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border-2 border-white/30 shadow-large">
            {/* Demo Header */}
            <div className="text-center mb-8">
              <h2 className="font-space text-2xl md:text-3xl font-bold mb-3">
                Try It Live — See The Magic Happen
              </h2>
              <p className="text-muted-foreground">
                Paste any social media post below and watch AI transform it into engaging content
              </p>
            </div>

            {/* Post Enhancer Component */}
            <div className="relative">
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

        {/* Trust Indicators */}
        <div className="text-center mt-16 fade-in-up">
          <p className="text-sm text-muted-foreground mb-6">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white rounded-lg px-6 py-3 shadow-soft">
              <span className="font-semibold text-gray-600">Microsoft</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-soft">
              <span className="font-semibold text-gray-600">Google</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-soft">
              <span className="font-semibold text-gray-600">Amazon</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-soft">
              <span className="font-semibold text-gray-600">Meta</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-indigo-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-large transform transition-all duration-300 hover:scale-105 cursor-pointer">
            <span>Start Growing Your Audience</span>
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;