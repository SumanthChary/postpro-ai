import { useState, useEffect } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import NeuralBackground from "@/components/ui/neural-background";
import QuantumButton from "@/components/ui/quantum-button";
import { Sparkles, Zap, Brain, Rocket } from "lucide-react";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Neural Network Background */}
      {mounted && <NeuralBackground />}
      
      {/* Revolutionary floating orbs with AI essence */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 animate-float"
           style={{
             background: 'radial-gradient(circle, hsl(263, 70%, 64%, 0.4) 0%, transparent 70%)',
             filter: 'blur(60px)',
           }} />
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full opacity-20 animate-float"
           style={{
             background: 'radial-gradient(circle, hsl(193, 82%, 55%, 0.4) 0%, transparent 70%)',
             filter: 'blur(80px)',
             animationDelay: '2s'
           }} />
      <div className="absolute bottom-20 left-1/2 w-80 h-80 rounded-full opacity-25 animate-float"
           style={{
             background: 'radial-gradient(circle, hsl(290, 84%, 60%, 0.4) 0%, transparent 70%)',
             filter: 'blur(70px)',
             animationDelay: '4s'
           }} />
      
      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-12">
        {/* Revolutionary Hero Text */}
        <div className="max-w-6xl mx-auto text-center mb-16 px-6">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8 group hover:border-primary/40 transition-all duration-300">
            <Brain className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Powered by Advanced AI</span>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-[0.9]">
            <span className="block mb-2">Transform Your</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Social Presence
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-4 text-foreground/60 font-normal">
              with AI Magic ✨
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Revolutionary AI that transforms ordinary posts into viral content. 
            <span className="text-accent font-medium"> 10x your engagement</span> with neural-powered enhancement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <QuantumButton variant="neural" size="lg" glowing className="group">
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Start Creating Magic
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </QuantumButton>
            <QuantumButton variant="secondary" size="lg">
              <Brain className="w-5 h-5" />
              Watch AI in Action
            </QuantumButton>
          </div>

          {/* Live Metrics */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>2M+ Posts Enhanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>500% Avg. Engagement Boost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neural-glow rounded-full animate-pulse" />
              <span>AI Processing Live</span>
            </div>
          </div>
        </div>

        {/* Revolutionary Post Enhancer Interface */}
        <div className="flex justify-center px-4">
          <div className="relative max-w-6xl w-full">
            {/* Glass Morphism Container */}
            <div className="backdrop-blur-xl bg-card/60 rounded-3xl border border-card-border p-8 shadow-neural relative overflow-hidden group hover:shadow-[0_0_60px_hsl(263_70%_64%_/_0.4)] transition-all duration-700">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
              
              {/* Neural grid overlay */}
              <div className="absolute inset-0 opacity-[0.02]"
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                     backgroundSize: '24px 24px'
                   }} />
              
              {/* Content */}
              <div className="relative z-10">
                <PostEnhancer 
                  post={post} 
                  setPost={setPost} 
                  category={category} 
                  setCategory={setCategory} 
                  styleTone={styleTone} 
                  setStyleTone={setStyleTone} 
                />
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/40 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/40 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;