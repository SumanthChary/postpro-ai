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
  onEnhance,
  isEnhanced = false
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6">
        <div className="flex items-center space-x-2">
          
          <h2 className="text-lg sm:text-xl lg:text-2xl font-montserrat font-extrabold text-gray-900">Post Enhancer</h2>
        </div>
        <div className="flex items-center gap-3">
          <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077B5]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select post category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-gray-900">
              <SelectItem value="business" className="flex items-center text-gray-900">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-gray-900">Business & Entrepreneurship</span>
                </div>
              </SelectItem>
              <SelectItem value="technology" className="text-gray-900">
                <div className="flex items-center">
                  <BrainIcon className="w-4 h-4 mr-2 text-bright-teal" />
                  <span className="text-gray-900">Technology & Innovation</span>
                </div>
              </SelectItem>
              <SelectItem value="lifestyle" className="text-gray-900">
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2 text-[#FF5733]" />
                  <span className="text-gray-900">Lifestyle & Personal Development</span>
                </div>
              </SelectItem>
              <SelectItem value="marketing" className="text-gray-900">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-[#1877F2]" />
                  <span className="text-gray-900">Marketing & Digital Media</span>
                </div>
              </SelectItem>
              <SelectItem value="creative" className="text-gray-900">
                <div className="flex items-center">
                  <PenToolIcon className="w-4 h-4 mr-2 text-[#E4405F]" />
                  <span className="text-gray-900">Creative & Design</span>
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
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="professional" className="text-gray-900">
                  <div className="flex items-center">
                    <BrainIcon className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-gray-900">Professional</span>
                  </div>
                </SelectItem>
                <SelectItem value="conversational" className="text-gray-900">
                  <div className="flex items-center">
                    <SmileIcon className="w-4 h-4 mr-2 text-bright-teal" />
                    <span className="text-gray-900">Conversational</span>
                  </div>
                </SelectItem>
                <SelectItem value="enthusiastic" className="text-gray-900">
                  <div className="flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2 text-[#FF5733]" />
                    <span className="text-gray-900">Enthusiastic</span>
                  </div>
                </SelectItem>
                <SelectItem value="authoritative" className="text-gray-900">
                  <div className="flex items-center">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-[#1877F2]" />
                    <span className="text-gray-900">Authoritative</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>}
        </div>
      </div>
      
      <div className="relative">
        <Textarea value={post} onChange={handlePostChange} placeholder="Write your LinkedIn post here…" className={`${isEnhanced ? 'min-h-[300px] sm:min-h-[400px]' : 'min-h-[150px] sm:min-h-[200px]'} text-sm sm:text-base lg:text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-blue-600 focus:ring-blue-600 transition-all duration-300 scrollbar-hide overflow-y-auto`} style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }} />
        <div className="absolute bottom-2 right-2 text-xs sm:text-sm text-gray-500 bg-white/80 px-2 py-1 rounded">
          {charCount} characters
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
        <Button variant="outline" className="w-full sm:w-auto text-gray-800 border-blue-600 hover:bg-blue-50 font-opensans text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6" onClick={onReset} disabled={isEnhancing || !post}>
          Reset
        </Button>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-opensans text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6" onClick={onEnhance} disabled={isEnhancing}>
          {isEnhancing ? <>
              <Loader2Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Generating...
            </> : <>
              <RocketIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Enhance Post
            </>}
        </Button>
      </div>
    </div>;
};