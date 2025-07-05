
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Enhancement Card */}
      <Card className="p-8 shadow-xl border border-gray-100 bg-white rounded-2xl backdrop-blur-sm">
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
      </Card>
      
      {/* Results Section */}
      {Object.keys(enhancedPosts).length > 0 && (
        <div className="mt-8">
          <Card className="p-6 shadow-lg border border-gray-100 bg-white rounded-2xl">
            <ShareOptions 
              enhancedPosts={enhancedPosts} 
              onPlatformSelect={onPlatformSelect} 
            />
          </Card>
        </div>
      )}

      {/* Virality Score - Secondary Focus */}
      <div className="mt-6">
        <ViralityScore post={post} category={category} />
      </div>
    </div>
  );
};
