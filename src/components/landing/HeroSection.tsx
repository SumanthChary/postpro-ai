
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Professional floating elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-r from-blue-100/40 to-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-24 sm:w-40 md:w-56 lg:w-72 h-24 sm:h-40 md:h-56 lg:h-72 bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{
        animationDelay: '2s'
      }}></div>
      <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-28 sm:w-36 md:w-48 lg:w-60 h-28 sm:h-36 md:h-48 lg:h-60 bg-gradient-to-r from-cyan-100/40 to-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{
        animationDelay: '4s'
      }}></div>
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 sm:pb-8">
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight leading-[1.1] text-gray-900">
            <span className="font-light text-gray-700">Transform Your</span>{" "}
            <span className="font-bold text-gray-950 block sm:inline">
              Social Media Presence
            </span>
          </h1>
          
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto px-2">
            <p className="mb-4 font-medium bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl font-semibold">
              Enhance your LinkedIn, Twitter & Instagram posts with AI magic.
            </p>
            <p className="text-gray-600 font-medium">
              Create content that captivates and converts with professional precision.
            </p>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">35+ users satisfied</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Featured in:</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-purple-600">
                <span>Product Hunt</span>
                <span>•</span>
                <span>Tiny Launch</span>
                <span>•</span>
                <span>Peerlist</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-3 sm:px-4 md:px-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200/50 max-w-5xl w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl md:rounded-[2rem]"></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
