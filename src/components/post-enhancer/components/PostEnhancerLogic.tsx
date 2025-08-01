
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
  isCurrentPost?: boolean;
}

export const PostEnhancerLogic = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
  isCurrentPost = true,
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

  if (isCurrentPost) {
    return (
      <div className="space-y-4">
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
        <ViralityScore post={post} category={category} />
      </div>
    );
  }

  // Enhanced version display
  return (
    <div className="flex-grow space-y-4">
      {Object.keys(enhancedPosts).length > 0 ? (
        <div className="space-y-4">
          <ShareOptions 
            enhancedPosts={enhancedPosts} 
            onPlatformSelect={onPlatformSelect} 
          />
        </div>
      ) : (
        <div className="flex-grow bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
          <p className="text-gray-400 text-center">Your enhanced post will appear here.</p>
        </div>
      )}
    </div>
  );
};
