import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip-preview";

interface HeroSectionProps {
  isAuthenticated?: boolean;
  username?: string;
}

const HeroSection = ({ isAuthenticated = false, username }: HeroSectionProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            LinkedIn Posts That Actually{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Get Noticed
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Join 2,847 professionals who increased their LinkedIn engagement by 340% in 30 days
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
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