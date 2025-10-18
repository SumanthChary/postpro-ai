import { Suspense, useState, lazy } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const AnimatedTooltipPreviewLazy = lazy(() => import("@/components/ui/animated-tooltip-preview"));
interface HeroSectionProps {
  isAuthenticated?: boolean;
  username?: string;
}
const HeroSection = ({
  isAuthenticated = false,
  username
}: HeroSectionProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  return <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30 relative overflow-hidden">
    {/* Enhanced aesthetic background elements */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-purple-100/30"></div>
    <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 hidden sm:block"></div>
    <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-24 sm:w-40 md:w-56 lg:w-72 h-24 sm:h-40 md:h-56 lg:h-72 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 hidden md:block"></div>
    <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-28 sm:w-36 md:w-48 lg:w-60 h-28 sm:h-36 md:h-48 lg:h-60 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 hidden md:block"></div>
    <div className="absolute top-1/2 left-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-r from-indigo-200/50 to-blue-200/50 rounded-full mix-blend-multiply filter blur-2xl opacity-25 hidden lg:block"></div>
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 w-full">
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          {isAuthenticated && username ? <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight leading-[1.2] text-gray-900">
                <span className="font-bold text-gray-950">Welcome back, </span>
                <span className="text-blue-600 font-extrabold">{username}!</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-5 sm:mb-6 md:mb-7 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
                Ready to create another viral LinkedIn post? Let's enhance your content!
              </p>
            </> : <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight leading-[1.2] text-gray-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-gray-950">LinkedIn</span>
                <img 
                  src="/lovable-uploads/linkedin-logo.png" 
                  alt="LinkedIn" 
                  className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-bold text-gray-950">Posts That Actually </span>
                <span className="text-blue-600 font-extrabold">Get Noticed!</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-5 sm:mb-6 md:mb-7 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
                Transform your LinkedIn content with AI-powered enhancement tools. Get better engagement and reach!
              </p>
            </>}
        </div>

        <div className="flex justify-center px-2 sm:px-4 md:px-6 w-full">
          <div className="max-w-5xl w-full">
            <PostEnhancer post={post} setPost={setPost} category={category} setCategory={setCategory} styleTone={styleTone} setStyleTone={setStyleTone} />
          </div>
        </div>

        <div className="mt-6 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 w-full">
          <div className="backdrop-blur-lg bg-white/30 rounded-2xl p-4 border border-white/20 w-full">
            <Suspense fallback={<div className="h-16 w-full animate-pulse rounded-xl bg-white/50" aria-hidden="true" />}>
              <AnimatedTooltipPreviewLazy />
            </Suspense>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;