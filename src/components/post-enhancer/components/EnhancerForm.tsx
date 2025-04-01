
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon, RefreshCw, ArrowRightLeft } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react";

interface EnhancerFormProps {
  post: string;
  category: string;
  isEnhancing: boolean;
  onPostChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
  onEnhance: () => void;
}

export const EnhancerForm = ({
  post,
  category,
  isEnhancing,
  onPostChange,
  onCategoryChange,
  onReset,
  onEnhance
}: EnhancerFormProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-electric-purple animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-custom-text">Professional Post Enhancer</h2>
        </div>
        <div className="flex items-center gap-4">
          <LinkedinIcon className="w-5 h-5 text-[#0077B5] hover:scale-110 transition-transform cursor-pointer" />
          <TwitterIcon className="w-5 h-5 text-[#1DA1F2] hover:scale-110 transition-transform cursor-pointer" />
          <InstagramIcon className="w-5 h-5 text-[#E4405F] hover:scale-110 transition-transform cursor-pointer" />
        </div>
      </div>

      <div className="relative group">
        <Select
          value={category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-full mb-4 border-gray-200 hover:border-electric-purple transition-colors duration-300 rounded-lg">
            <SelectValue placeholder="Select post category" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm">
            <SelectItem value="business">Business & Entrepreneurship</SelectItem>
            <SelectItem value="technology">Technology & Innovation</SelectItem>
            <SelectItem value="lifestyle">Lifestyle & Personal Development</SelectItem>
            <SelectItem value="marketing">Marketing & Digital Media</SelectItem>
            <SelectItem value="creative">Creative & Design</SelectItem>
          </SelectContent>
        </Select>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-purple to-bright-teal rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
      </div>
      
      <div className="relative group">
        <Textarea
          value={post}
          onChange={(e) => onPostChange(e.target.value)}
          placeholder="Paste your post here to enhance it with AI magic ✨"
          className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base resize-none rounded-lg border-gray-200 hover:border-electric-purple focus:border-electric-purple focus:ring-electric-purple transition-all duration-300"
        />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-purple to-bright-teal rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-2">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto text-custom-text border-electric-purple hover:bg-electric-purple/5 transition-all duration-300 hover:-translate-y-0.5"
          onClick={onReset}
          disabled={isEnhancing || !post}
        >
          <RefreshCw className="w-4 h-4 mr-2 transition-all duration-500 hover:rotate-180" />
          Reset
        </Button>
        <Button 
          className="w-full sm:w-auto bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden shadow-lg"
          onClick={onEnhance}
          disabled={isEnhancing}
        >
          {isEnhancing ? (
            <>
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <RocketIcon className="w-4 h-4 mr-2 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                Enhance Post
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-bright-teal to-electric-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </Button>
      </div>

      {/* Tips Section */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 flex items-center">
          <ArrowRightLeft className="w-3 h-3 mr-1 text-electric-purple" />
          <span>Pro tip: Add keywords relevant to your industry to improve your post's reach</span>
        </div>
      </div>
    </div>
  );
};
