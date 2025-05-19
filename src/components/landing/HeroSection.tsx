
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
    <section className="pt-8 pb-16 md:py-20">
      <div className="max-w-5xl mx-auto text-center mb-12 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6 tracking-tight leading-tight">
          Elevate Your{" "}
          <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Social Media Presence
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-custom-text mb-8 leading-relaxed font-body max-w-3xl mx-auto">
          Transform ordinary posts into engaging content that captivates your audience.
          Our AI enhances clarity, tone, and performance across all platforms.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 transition-all shadow-lg text-white px-8"
            onClick={handleFeatures}
          >
            Discover Features <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-electric-purple text-electric-purple hover:bg-electric-purple/5"
          >
            View Demo
          </Button>
        </div>
        
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/10 to-bright-teal/10 rounded-3xl blur-2xl -z-10"></div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-electric-purple border border-electric-purple/20 inline-block mb-6">
            Try our AI now — No sign-up required
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
      </div>
    </section>
  );
};

export default HeroSection;
