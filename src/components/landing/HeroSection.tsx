
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Professional floating elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-blue-100/40 to-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-36 sm:w-48 md:w-60 lg:w-72 h-36 sm:h-48 md:h-60 lg:h-72 bg-gradient-to-r from-cyan-100/40 to-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight text-gray-900">
            Transform Your{" "}
            <span className="text-gray-800 font-bold">
              Social Media Presence
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-2 font-medium">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts with professional precision.
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/60 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 mx-4 sm:mx-6 shadow-2xl border border-white/40 max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl sm:rounded-[2rem]"></div>
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
  );
};

export default HeroSection;
