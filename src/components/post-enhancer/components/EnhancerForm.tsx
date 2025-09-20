import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon, ClipboardIcon, Sparkles } from "lucide-react";
import { LinkedinIcon } from "lucide-react";
import { BrainIcon, UsersIcon, TrendingUpIcon, PenToolIcon, SmileIcon } from "lucide-react";
import { EnhancerFormProps } from "../types";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  
  useEffect(() => {
    setCharCount(post.length);
  }, [post]);
  
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPostChange(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onPostChange(text);
        setCharCount(text.length);
        toast({
          title: "Text Pasted!",
          description: "Your content has been pasted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Paste Failed",
        description: "Please try pasting manually (Ctrl+V)",
        variant: "destructive"
      });
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Text</h2>
          <LinkedinIcon className="w-6 h-6 text-[#0077B5]" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 space-y-6">
        {/* Settings Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full h-12 border-gray-200 focus:border-blue-500">
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
          
          {onStyleToneChange && (
            <Select value={styleTone} onValueChange={onStyleToneChange}>
              <SelectTrigger className="w-full h-12 border-gray-200 focus:border-blue-500">
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
            </Select>
          )}
        </div>
        
        {/* Text Input Area */}
        <div className="relative">
          <Textarea 
            value={post} 
            onChange={handlePostChange} 
            placeholder="Paste your text here..." 
            className={`${isEnhanced ? 'min-h-[400px]' : 'min-h-[300px]'} 
              w-full p-6 text-base border-gray-200 rounded-xl 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
              resize-none transition-all duration-200 
              placeholder:text-gray-400 bg-gray-50/50`} 
          />
          
          {/* Paste Button */}
          {!post && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Button 
                onClick={handlePasteText}
                className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm flex items-center gap-2"
              >
                <ClipboardIcon className="w-4 h-4" />
                Paste Text
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {charCount} / 3000 characters
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={onReset} 
              disabled={isEnhancing || !post}
              className="px-6 py-2 border-gray-200 hover:bg-gray-50"
            >
              Reset
            </Button>
            <Button 
              onClick={onEnhance} 
              disabled={isEnhancing || !post}
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              {isEnhancing ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Enhance
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};