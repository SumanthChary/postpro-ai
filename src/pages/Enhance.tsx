
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, Lightbulb, ArrowRight, Zap, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");

  return (
    <div className="min-h-screen">
      <PostEnhancer 
        post={post}
        setPost={setPost}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};

export default Enhance;
