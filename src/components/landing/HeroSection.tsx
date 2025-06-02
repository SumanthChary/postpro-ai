
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal mb-4 sm:mb-6 tracking-tight leading-tight text-gray-800">
            Transform Your{" "}
            <span className="italic text-gray-900">
              Social Media Presence
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-body px-4 sm:px-0">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-6 mx-4 shadow-xl border border-white/50">
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
