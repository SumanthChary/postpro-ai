
import { useState } from "react";
import { Card } from "@/components/ui/card";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Enhance Your Post
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your content into engaging posts that capture attention and drive engagement
          </p>
        </div>

        {/* Main Content */}
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
  );
};

export default Enhance;
