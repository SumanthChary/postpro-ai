
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");

  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-6 tracking-tight">
          Transform Your{" "}
          <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Social Media Presence
          </span>
        </h1>
        <p className="text-xl text-custom-text mb-8 leading-relaxed font-opensans">
          Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
          captivates and converts.
        </p>
      </div>

      <PostEnhancer
        post={post}
        setPost={setPost}
        category={category}
        setCategory={setCategory}
        handleEnhancePost={() => {}}
      />
    </>
  );
};

export default HeroSection;
