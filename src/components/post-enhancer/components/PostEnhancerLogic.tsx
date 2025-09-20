
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
  const [originalPost, setOriginalPost] = useState('');

  const onEnhance = async () => {
    setOriginalPost(post); // Store original before enhancement
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
    setOriginalPost("");
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
      {!isEnhanced ? (
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
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Your Text Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Text</h3>
            <div className="bg-gray-50 rounded-xl p-6 border">
              <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                {originalPost || post}
              </div>
            </div>
            <button 
              onClick={onReset}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Editor
            </button>
          </div>

          {/* Result Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Result</h3>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Enhanced & Optimized
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed mb-4">
                {post}
              </div>
              <ShareOptions 
                enhancedPosts={enhancedPosts} 
                onPlatformSelect={onPlatformSelect} 
              />
            </div>
          </div>
        </div>
      )}
      
      {showViralityScore && isEnhanced && (
        <ViralityScore 
          post={post} 
          category={category} 
          autoAnalyze={true}
        />
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
