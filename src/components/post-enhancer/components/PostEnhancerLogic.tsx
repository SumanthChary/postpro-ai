
import { Card } from "@/components/ui/card";
import { EnhancerForm } from "./EnhancerForm";
import { ShareOptions } from "./ShareOptions";
import { ViralityScore } from "./ViralityScore";
import { usePostEnhancer } from "../hooks/usePostEnhancer";
import { EnhancePostResponse } from "../types";
import { FeedbackPopup } from "@/components/feedback/FeedbackPopup";
import { useFeedback } from "@/hooks/useFeedback";
import HashtagSuggestionPanel from "../hashtags/HashtagSuggestionPanel";
import TrendingHashtags from "../hashtags/TrendingHashtags";
import CTABuilder from "../cta/CTABuilder";
import { useState } from "react";

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
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [selectedCTAs, setSelectedCTAs] = useState<any[]>([]);
  const [isEnhanced, setIsEnhanced] = useState(false);

  const onEnhance = async () => {
    const result = await handleEnhancePost(post, category, styleTone);
    if (result && result.platforms?.linkedin) {
      setPost(result.platforms.linkedin);
      setIsEnhanced(true);
    }
  };

  const onReset = () => {
    handleReset();
    setPost("");
    setIsEnhanced(false);
    setSelectedHashtags([]);
    setSelectedCTAs([]);
  };

  const handleHashtagAdd = (hashtag: string) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
      const hashtagText = ` #${hashtag}`;
      setPost(post + (post.endsWith(' ') ? '' : ' ') + hashtagText);
    }
  };

  const handleCTAAdd = (cta: any) => {
    setSelectedCTAs([...selectedCTAs, cta]);
    const ctaText = `\n\n${cta.text}${cta.url ? ` ${cta.url}` : ''}`;
    setPost(post + ctaText);
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TrendingHashtags
            onHashtagAdd={handleHashtagAdd}
            selectedHashtags={selectedHashtags}
          />
          <HashtagSuggestionPanel
            post={post}
            category={category}
            onHashtagAdd={handleHashtagAdd}
            selectedHashtags={selectedHashtags}
          />
        </div>
        
        <div className="space-y-6">
          <CTABuilder
            post={post}
            category={category}
            onCTAAdd={handleCTAAdd}
            selectedCTAs={selectedCTAs}
          />
          <ViralityScore post={post} category={category} />
        </div>
      </div>
      
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
