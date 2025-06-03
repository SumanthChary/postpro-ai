
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-100/60 to-blue-100/60 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center mb-12 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight leading-tight text-gray-900">
            Transform Your{" "}
            <span className="italic text-gray-800">
              Social Media Presence
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/40 rounded-3xl p-8 mx-4 shadow-2xl border border-white/60 max-w-4xl mx-auto">
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
