import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon } from "lucide-react";
import { BrainIcon, UsersIcon, TrendingUpIcon, PenToolIcon, SmileIcon } from "lucide-react";
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
          <SparklesIcon className="w-5 h-5 text-electric-purple animate-pulse" />
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
        <Textarea value={post} onChange={handlePostChange} placeholder="Paste your post here to enhance it with AI magic ✨" className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200 scrollbar-hide overflow-y-auto" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }} />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {charCount} characters
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-3">
        <Button variant="outline" className="w-full sm:w-auto text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans" onClick={onReset} disabled={isEnhancing || !post}>
          Reset
        </Button>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans group relative overflow-hidden" onClick={onEnhance} disabled={isEnhancing}>
          {isEnhancing ? <>
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              Enhancing...
            </> : <>
              <RocketIcon className="w-4 h-4 mr-2 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:translate-y-[-2px]" />
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 text-zinc-50">
                Enhance Post
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple to-bright-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>}
        </Button>
      </div>
    </div>;
};