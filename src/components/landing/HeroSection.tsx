
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
      <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-36 sm:w-48 md:w-60 lg:w-72 h-36 sm:h-48 md:h-60 lg:h-72 bg-gradient-to-r from-teal-100/60 to-blue-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight text-gray-900">
            Transform Your{" "}
            <span className="italic text-gray-800">
              Social Media Presence
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mx-4 sm:mx-6 shadow-2xl border border-white/60 max-w-4xl mx-auto">
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
