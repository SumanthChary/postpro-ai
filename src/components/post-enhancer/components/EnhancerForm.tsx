
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon } from "lucide-react";
import { BrainIcon, UsersIcon, TrendingUpIcon, PenToolIcon, SmileIcon } from "lucide-react";
import { EnhancerFormProps } from "../types";

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
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPostChange(e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <SparklesIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Enhance Your Post</h2>
        <p className="text-sm text-gray-500">Transform your content with AI-powered enhancements</p>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full h-12 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
              <SelectItem value="business" className="hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Business & Entrepreneurship</span>
                </div>
              </SelectItem>
              <SelectItem value="technology" className="hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BrainIcon className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Technology & Innovation</span>
                </div>
              </SelectItem>
              <SelectItem value="lifestyle" className="hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2 text-green-600" />
                  <span>Lifestyle & Personal Development</span>
                </div>
              </SelectItem>
              <SelectItem value="marketing" className="hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-orange-600" />
                  <span>Marketing & Digital Media</span>
                </div>
              </SelectItem>
              <SelectItem value="creative" className="hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <PenToolIcon className="w-4 h-4 mr-2 text-pink-600" />
                  <span>Creative & Design</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Writing Tone</label>
          {onStyleToneChange && (
            <Select value={styleTone} onValueChange={onStyleToneChange}>
              <SelectTrigger className="w-full h-12 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                <SelectItem value="professional" className="hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BrainIcon className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Professional</span>
                  </div>
                </SelectItem>
                <SelectItem value="conversational" className="hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <SmileIcon className="w-4 h-4 mr-2 text-green-600" />
                    <span>Conversational</span>
                  </div>
                </SelectItem>
                <SelectItem value="enthusiastic" className="hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Enthusiastic</span>
                  </div>
                </SelectItem>
                <SelectItem value="authoritative" className="hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Authoritative</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      
      {/* Text Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Your Content</label>
        <Textarea 
          value={post} 
          onChange={handlePostChange} 
          placeholder="Paste your post here to enhance it with AI magic ✨" 
          className="min-h-[180px] text-base resize-none rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto h-12 px-6 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200" 
          onClick={onReset} 
          disabled={isEnhancing || !post}
        >
          Reset
        </Button>
        
        <Button 
          className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
          onClick={onEnhance} 
          disabled={isEnhancing || !post.trim()}
        >
          {isEnhancing ? (
            <div className="flex items-center">
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              <span>Enhancing...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <RocketIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:translate-y-[-1px]" />
              <span>Enhance Post</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
