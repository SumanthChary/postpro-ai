
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";
import { ArrowLeft } from "lucide-react";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Enhance Your Post
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your content with AI-powered enhancements, automatic trending hashtags, and viral CTAs
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
