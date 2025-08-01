
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="hero-gradient relative overflow-hidden min-h-screen">
      <div className="absolute inset-0"></div>
      
      <main className="relative z-10">
        {/* Hero Text Section */}
        <section className="text-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
              <span className="text-gradient block mb-1 sm:mb-2">Your posts deserve more.</span>
              <span className="text-gray-900">Get noticed, get results—effortlessly.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Stop guessing. Instantly transform your words into engagement magnets with AI.
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-center items-center mb-8 sm:mb-12">
              <button className="btn-gradient text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg">
                Try Free—See Your First Viral Post
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 mb-4">
              <span className="text-sm">As seen on:</span>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 animate-pulse">2,500+ posts enhanced today</p>
          </div>
        </section>

        {/* Post Enhancer Section */}
        <section className="pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <PostEnhancer 
              post={post} 
              setPost={setPost} 
              category={category} 
              setCategory={setCategory} 
              styleTone={styleTone} 
              setStyleTone={setStyleTone} 
            />
          </div>
        </section>
      </main>
    </div>
  );
};
export default HeroSection;
