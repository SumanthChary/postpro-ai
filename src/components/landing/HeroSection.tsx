import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip-preview";
import { Linkedin } from "lucide-react";

interface HeroSectionProps {
  isAuthenticated?: boolean;
  username?: string;
}

const HeroSection = ({ isAuthenticated = false, username }: HeroSectionProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  return <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background elements using brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-navy/5"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue/10 rounded-full filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-navy/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="relative z-10 pt-24 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-56 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-3 sm:px-4 md:px-6 lg:px-8">
          {isAuthenticated && username ? (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-navy">
                <span className="font-bold">Welcome back,</span>
                <br className="hidden sm:inline" />
                <span className="text-blue font-extrabold">{username}</span>
              </h1>
              <p className="text-base md:text-lg text-navy/70 mb-6 leading-relaxed max-w-2xl mx-auto">
                Ready to create another viral LinkedIn post? Let's enhance your content!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-navy">
                <span className="font-bold">Stop Posting Content</span>
                <br className="sm:inline" />
                <span className="font-bold">That Gets Ignored on</span>
                <span className="inline-flex items-center mx-2">
                  <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue bg-blue/10 p-1.5 sm:p-2 rounded-lg" />
                </span>
                <span className="text-blue font-extrabold">LinkedIn</span>
              </h1>
              <p className="text-base md:text-lg text-navy/70 mb-6 leading-relaxed max-w-2xl mx-auto">
                Build LinkedIn authority without the overwhelm. Join 2,400+ professionals creating career-changing content.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-center px-4">
          <div className="bg-white rounded-2xl p-6 border border-navy/10 shadow-xl max-w-4xl w-full">
            <PostEnhancer post={post} setPost={setPost} category={category} setCategory={setCategory} styleTone={styleTone} setStyleTone={setStyleTone} />
          </div>
        </div>

        <div className="mt-8 max-w-4xl mx-auto px-4">
          <div className="bg-white/50 rounded-2xl p-6 border border-navy/10">
            <AnimatedTooltipPreview />
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;