
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
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
        <Button
          className="bg-[#F97316] hover:bg-[#FB923C] text-white font-opensans text-lg px-8 py-6 h-auto mb-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
          onClick={() => window.open('https://www.producthunt.com/posts/postproai?utm_source=other&utm_medium=social', '_blank')}
        >
          <Rocket className="w-6 h-6 mr-3" />
          Support us on Product Hunt
        </Button>
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
