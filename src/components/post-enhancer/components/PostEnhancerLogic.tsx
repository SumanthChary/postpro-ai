
import { Card } from "@/components/ui/card";
import { EnhancerForm } from "./EnhancerForm";
import { ShareOptions } from "./ShareOptions";
import { ViralityScore } from "./ViralityScore";
import { usePostEnhancer } from "../hooks/usePostEnhancer";

interface PostEnhancerLogicProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  styleTone: string;
  setStyleTone: (tone: string) => void;
}

export const PostEnhancerLogic = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}: PostEnhancerLogicProps) => {
  const {
    isEnhancing,
    enhancedPosts,
    handleEnhancePost,
    handleReset,
    handlePlatformSelect,
  } = usePostEnhancer();

  const onEnhance = async () => {
    const result = await handleEnhancePost(post, category, styleTone);
    if (result && result.linkedin) {
      setPost(result.linkedin);
    }
  };

  const onReset = () => {
    handleReset();
    setPost("");
  };

  const onPlatformSelect = (platform: string) => {
    const platformPost = handlePlatformSelect(platform);
    if (platformPost) {
      setPost(platformPost);
    }
  };

  return (
    <div className="pro-card-elevated p-6 sm:p-8">
      <EnhancerForm
        post={post}
        category={category}
        styleTone={styleTone}
        isEnhancing={isEnhancing}
        onPostChange={setPost}
        onCategoryChange={setCategory}
        onStyleToneChange={setStyleTone}
        onReset={onReset}
        onEnhance={onEnhance}
      />
      
      {Object.keys(enhancedPosts).length > 0 && (
        <div className="mt-8 pt-8 border-t border-border">
          <ShareOptions 
            enhancedPosts={enhancedPosts} 
            onPlatformSelect={onPlatformSelect} 
          />
        </div>
      )}

      <ViralityScore post={post} category={category} />
    </div>
  );
};
