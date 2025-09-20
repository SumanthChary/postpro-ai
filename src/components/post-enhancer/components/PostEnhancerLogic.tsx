import { Card } from "@/components/ui/card";
import { EnhancerForm } from "./EnhancerForm";
import { ShareOptions } from "./ShareOptions";
import { ViralityScore } from "./ViralityScore";
import { usePostEnhancer } from "../hooks/usePostEnhancer";
import { EnhancePostResponse } from "../types";
import { FeedbackPopup } from "@/components/feedback/FeedbackPopup";
import { useFeedback } from "@/hooks/useFeedback";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  setStyleTone
}: PostEnhancerLogicProps) => {
  const {
    isEnhancing,
    enhancedPosts,
    handleEnhancePost,
    handleReset,
    handlePlatformSelect,
    showFeedback,
    setShowFeedback
  } = usePostEnhancer();
  const {
    submitFeedback,
    isSubmitting
  } = useFeedback();
  const { toast } = useToast();
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [showViralityScore, setShowViralityScore] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [copied, setCopied] = useState(false);
  const onEnhance = async () => {
    setOriginalPost(post);
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
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(post);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Enhanced post copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually",
        variant: "destructive",
      });
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
      {/* Main Editor with Preview */}
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
        /* Side-by-side Preview */
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-sm border border-blue-200/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-200/50 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Enhancement Result</h2>
              <div className="flex items-center gap-3">
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" onClick={onReset} size="sm">
                  New Post
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            {/* Original Post */}
            <div className="p-6 border-r border-blue-200/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <h3 className="font-semibold text-gray-700">Your Text</h3>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 h-full min-h-[300px] overflow-y-auto scrollbar-hide">
                <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {originalPost}
                </div>
              </div>
            </div>
            
            {/* Enhanced Post */}
            <div className="p-6 bg-gradient-to-br from-white to-blue-50/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  Result
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Enhanced
                  </span>
                </h3>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200 h-full min-h-[300px] overflow-y-auto scrollbar-hide shadow-sm">
                <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {post}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showViralityScore && <ViralityScore post={post} category={category} autoAnalyze={true} />}

      <FeedbackPopup 
        isOpen={showFeedback} 
        onClose={() => setShowFeedback(false)} 
        onSubmit={handleFeedbackSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
};