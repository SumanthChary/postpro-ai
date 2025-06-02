
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-4 sm:mb-6 tracking-tight leading-tight">
          Transform Your{" "}
          <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent italic">
            Social Media Presence
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-custom-text mb-6 sm:mb-8 leading-relaxed font-body px-4 sm:px-0">
          Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
          captivates and converts.
        </p>
      </div>

      <PostEnhancer
        post={post}
        setPost={setPost}
        category={category}
        setCategory={setCategory}
        styleTone={styleTone}
        setStyleTone={setStyleTone}
      />
    </>
  );
};

export default HeroSection;
