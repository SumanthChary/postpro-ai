import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-24 sm:w-40 md:w-56 lg:w-72 h-24 sm:h-40 md:h-56 lg:h-72 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-28 sm:w-36 md:w-48 lg:w-60 h-28 sm:h-36 md:h-48 lg:h-60 bg-gradient-to-r from-cyan-100/20 to-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 sm:pb-8">
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight leading-[1.1] text-gray-900">
            <span className="font-bold text-gray-950">LinkedIn Posts That Actually <span className="italic bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">Get Noticed</span></span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-5 sm:mb-6 md:mb-7 lg:mb-8 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
            Join 2,847 professionals who increased their LinkedIn engagement by 340% in 30 days
          </p>
        </div>

        <div className="flex justify-center px-3 sm:px-4 md:px-6">
          <div className="backdrop-blur-lg bg-white/60 rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-4 sm:p-6 md:p-8 lg:p-10 border border-white/40 max-w-5xl w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl md:rounded-[2rem]"></div>
            <div className="relative z-10">
              <PostEnhancer post={post} setPost={setPost} category={category} setCategory={setCategory} styleTone={styleTone} setStyleTone={setStyleTone} />
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;