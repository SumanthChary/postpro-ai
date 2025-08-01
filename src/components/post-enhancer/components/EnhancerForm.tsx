import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon, HashIcon, TrendingUpIcon, SmileIcon } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon } from "lucide-react";
import { BrainIcon, UsersIcon, PenToolIcon } from "lucide-react";
import { EnhancerFormProps } from "../types";
import { useState, useEffect } from "react";
export const EnhancerForm = ({
  post,
  category,
  styleTone = "professional",
  isEnhancing,
  onPostChange,
  onCategoryChange,
  onStyleToneChange,
  onReset,
  onEnhance
}: EnhancerFormProps) => {
  const [charCount, setCharCount] = useState(0);
  useEffect(() => {
    setCharCount(post.length);
  }, [post]);
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPostChange(e.target.value);
    setCharCount(e.target.value.length);
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-electric-purple" />
          <h2 className="text-base sm:text-lg font-montserrat font-extrabold text-custom-text">Professional Post Enhancer</h2>
        </div>
        <div className="flex items-center gap-3">
          <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />
          <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
          <InstagramIcon className="w-5 h-5 text-[#E4405F]" />
          <FacebookIcon className="w-5 h-5 text-[#1877F2]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select post category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="business" className="flex items-center">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-electric-purple" />
                  <span>Business & Entrepreneurship</span>
                </div>
              </SelectItem>
              <SelectItem value="technology">
                <div className="flex items-center">
                  <BrainIcon className="w-4 h-4 mr-2 text-bright-teal" />
                  <span>Technology & Innovation</span>
                </div>
              </SelectItem>
              <SelectItem value="lifestyle">
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2 text-[#FF5733]" />
                  <span>Lifestyle & Personal Development</span>
                </div>
              </SelectItem>
              <SelectItem value="marketing">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-[#1877F2]" />
                  <span>Marketing & Digital Media</span>
                </div>
              </SelectItem>
              <SelectItem value="creative">
                <div className="flex items-center">
                  <PenToolIcon className="w-4 h-4 mr-2 text-[#E4405F]" />
                  <span>Creative & Design</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          {onStyleToneChange && <Select value={styleTone} onValueChange={onStyleToneChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select writing tone" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="professional">
                  <div className="flex items-center">
                    <BrainIcon className="w-4 h-4 mr-2 text-electric-purple" />
                    <span>Professional</span>
                  </div>
                </SelectItem>
                <SelectItem value="conversational">
                  <div className="flex items-center">
                    <SmileIcon className="w-4 h-4 mr-2 text-bright-teal" />
                    <span>Conversational</span>
                  </div>
                </SelectItem>
                <SelectItem value="enthusiastic">
                  <div className="flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2 text-[#FF5733]" />
                    <span>Enthusiastic</span>
                  </div>
                </SelectItem>
                <SelectItem value="authoritative">
                  <div className="flex items-center">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-[#1877F2]" />
                    <span>Authoritative</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>}
        </div>
      </div>
      
      <div className="relative">
        <Textarea 
          value={post} 
          onChange={handlePostChange} 
          placeholder="Paste your post here to enhance it with AI magic ✨" 
          className="min-h-[180px] sm:min-h-[200px] text-sm sm:text-base resize-none rounded-lg border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50" 
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {charCount} characters
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
        >
          <SmileIcon className="w-4 h-4" />
          <span>Add Emojis</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
        >
          <HashIcon className="w-4 h-4" />
          <span>Optimize Hashtags</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
        >
          <TrendingUpIcon className="w-4 h-4" />
          <span>Boost Engagement</span>
        </Button>
      </div>
    </div>;
};