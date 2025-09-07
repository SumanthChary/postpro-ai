
import { Card } from "@/components/ui/card";
import { EnhancerForm } from "./EnhancerForm";
import { ShareOptions } from "./ShareOptions";
import { ViralityScore } from "./ViralityScore";
import { usePostEnhancer } from "../hooks/usePostEnhancer";
import { EnhancePostResponse } from "../types";
import { FeedbackPopup } from "@/components/feedback/FeedbackPopup";
import { useFeedback } from "@/hooks/useFeedback";
import { useState, useEffect } from "react";

type Platform = keyof EnhancePostResponse['platforms'];

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
    showFeedback,
    setShowFeedback,
  } = usePostEnhancer();

  const { submitFeedback, isSubmitting } = useFeedback();
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [showViralityScore, setShowViralityScore] = useState(false);

  const onEnhance = async () => {
    const result = await handleEnhancePost(post, category, styleTone);
    if (result && result.platforms?.linkedin) {
      setPost(result.platforms.linkedin);
      setIsEnhanced(true);
      setShowViralityScore(true);
    }
  };

  const onReset = () => {
    handleReset();
    setPost("");
    setIsEnhanced(false);
    setShowViralityScore(false);
  };


  const onPlatformSelect = (platform: Platform) => {
    const platformPost = handlePlatformSelect(platform);
    if (platformPost) {
      setPost(platformPost);
    }
  };

  const handleFeedbackSubmit = async (rating: number, feedback: string) => {
    const success = await submitFeedback(rating, feedback);
    if (success) {
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
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
        isEnhanced={isEnhanced}
      />
      
      {showViralityScore && (
        <ViralityScore 
          post={post} 
          category={category} 
          autoAnalyze={true}
        />
      )}
      
      {enhancedPosts && Object.keys(enhancedPosts).length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <ShareOptions 
            enhancedPosts={enhancedPosts} 
            onPlatformSelect={onPlatformSelect} 
          />
        </div>
      )}

      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
