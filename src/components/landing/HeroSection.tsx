
import { useState } from "react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const HeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <section className="min-h-screen bg-background flex items-center">
      <div className="pro-container w-full">
        <div className="text-center space-responsive-md mb-12 lg:mb-16">
          <h1 className="pro-heading text-responsive-4xl mb-6">
            Generate LinkedIn Posts That
            <span className="text-primary"> Actually Get Noticed</span>
          </h1>
          <p className="pro-subheading text-responsive-lg max-w-3xl mx-auto">
            Join 2,847+ professionals who increased their LinkedIn engagement by 340% 
            using our AI-powered content enhancement tool
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
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
    </section>
  );
};
export default HeroSection;
