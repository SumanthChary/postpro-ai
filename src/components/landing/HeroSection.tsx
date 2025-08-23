import { useState, memo } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip-preview";
import { ResponsiveContainer } from "@/components/ui/responsive-container";

interface HeroSectionProps {
  isAuthenticated?: boolean;
  username?: string;
}

const HeroSection = memo(({ isAuthenticated = false, username }: HeroSectionProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  
  return (
    <section className="relative min-h-[85vh] lg:min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30 overflow-hidden">
      {/* Optimized background elements - reduced complexity */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20" />
      <div className="absolute top-10 left-5 sm:left-10 w-32 sm:w-64 lg:w-80 h-32 sm:h-64 lg:h-80 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-20 right-5 sm:right-10 w-24 sm:w-48 lg:w-72 h-24 sm:h-48 lg:h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl opacity-25" />
      <div className="absolute bottom-10 left-1/2 w-28 sm:w-48 lg:w-60 h-28 sm:h-48 lg:h-60 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl opacity-20" />
      
      <div className="relative z-10 pt-20 sm:pt-32 lg:pt-40 xl:pt-48 pb-8 sm:pb-12 lg:pb-16">
        <ResponsiveContainer size="lg" className="text-center mb-8 sm:mb-12 lg:mb-14">
          {isAuthenticated && username ? (
            <>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight text-gray-900">
                <span className="font-bold">Welcome back,</span>
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold"> {username}</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
                Ready to create another viral LinkedIn post? Let's enhance your content!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight text-gray-900">
                <span className="font-bold">LinkedIn Posts That Actually</span>
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold"> Get Noticed</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
                Join 2,847 professionals who increased their LinkedIn engagement by 340% in 30 days
              </p>
            </>
          )}
        </ResponsiveContainer>

        <ResponsiveContainer size="xl">
          <div className="backdrop-blur-md bg-white/70 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 border border-white/50 shadow-xl">
            <PostEnhancer 
              post={post} 
              setPost={setPost} 
              category={category} 
              setCategory={setCategory} 
              styleTone={styleTone} 
              setStyleTone={setStyleTone} 
            />
          </div>
        </ResponsiveContainer>

        <ResponsiveContainer size="xl" className="mt-6 sm:mt-8 lg:mt-12">
          <div className="backdrop-blur-md bg-white/50 rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
            <AnimatedTooltipPreview />
          </div>
        </ResponsiveContainer>
      </div>
    </section>
  );
});

export default HeroSection;