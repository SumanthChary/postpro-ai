
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  const navigate = useNavigate();

  const handleFeatures = () => {
    navigate("/features");
  };

  return (
    <section className="pt-10 pb-20 md:py-24 bg-gradient-to-b from-white to-light-lavender">
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <div className="inline-block animate-pulse mb-6">
          <div className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black border border-black/10 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric-purple"></span>
            <span>AI-Powered Social Media Enhancement</span>
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold mb-6 tracking-tight leading-[1.1] text-black max-w-4xl mx-auto">
          Elevate Your{" "}
          <span className="gradient-text decoration-4 underline-offset-4">
            Social Media Presence
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-custom-text mb-10 leading-relaxed font-body max-w-3xl mx-auto opacity-80">
          Transform ordinary posts into engaging content that captivates your audience.
          Our AI enhances clarity, tone, and performance across all platforms.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
          <Button 
            size="lg"
            className="bg-black hover:bg-black/90 transition-all shadow-elegant text-white px-10 py-6 text-base button-glow"
            onClick={handleFeatures}
          >
            Discover Features <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-black text-black hover:bg-black/5 px-10 py-6 text-base subtle-border"
          >
            Watch Demo
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 mb-14 text-sm text-custom-text/60">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            <span>4.9/5 Rating</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Setup in 60 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3746C6.51168 20.6274 4.78465 19.2471 3.61096 17.4369C2.43727 15.6266 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>No credit card required</span>
          </div>
        </div>
        
        <div className="relative mt-20 max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-purple/20 via-bright-teal/20 to-electric-purple/20 rounded-3xl blur-xl opacity-50 -z-10 animate-pulse"></div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-black border border-black/10 inline-block mb-6 shadow-subtle">
            Try our AI now — No sign-up required
          </div>
          <div className="bg-white rounded-2xl shadow-elegant border border-black/5 p-1">
            <PostEnhancer
              post={post}
              setPost={setPost}
              category={category}
              setCategory={setCategory}
              styleTone={styleTone}
              setStyleTone={setStyleTone}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <img src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" alt="PostPro AI Logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/lovable-uploads/fdd496bb-ba93-4b3e-934f-c21a3a306935.png" alt="Partner Logo" className="h-8 opacity-40 hover:opacity-70 transition-opacity" />
            <img src="/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png" alt="Partner Logo" className="h-8 opacity-40 hover:opacity-70 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
