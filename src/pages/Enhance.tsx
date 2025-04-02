
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, Lightbulb, ArrowRight, Zap, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");

  const handleSetPost = (newPost: string) => {
    console.log("Setting post to:", newPost);
    setPost(newPost);
  };

  const handleSetCategory = (newCategory: string) => {
    console.log("Setting category to:", newCategory);
    setCategory(newCategory);
  };

  return (
    <div className="min-h-screen">
      <PostEnhancer 
        post={post}
        setPost={handleSetPost}
        category={category}
        setCategory={handleSetCategory}
      />
    </div>
  );
};

export default Enhance;
