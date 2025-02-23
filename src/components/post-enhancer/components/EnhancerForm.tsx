
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon } from "lucide-react";
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-electric-purple animate-pulse" />
          <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Professional Post Enhancer</h2>
        </div>
        <div className="flex items-center gap-3">
          <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />
          <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
          <InstagramIcon className="w-5 h-5 text-[#E4405F]" />
        </div>
      </div>

      <Select
        value={category}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select post category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="business">Business & Entrepreneurship</SelectItem>
          <SelectItem value="technology">Technology & Innovation</SelectItem>
          <SelectItem value="lifestyle">Lifestyle & Personal Development</SelectItem>
          <SelectItem value="marketing">Marketing & Digital Media</SelectItem>
          <SelectItem value="creative">Creative & Design</SelectItem>
        </SelectContent>
      </Select>
      
      <Textarea
        value={post}
        onChange={(e) => onPostChange(e.target.value)}
        placeholder="Paste your post here to enhance it with AI magic ✨"
        className="min-h-[200px] text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200"
      />
      
      <div className="flex justify-end space-x-3">
        <Button 
          variant="outline" 
          className="text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans"
          onClick={onReset}
          disabled={isEnhancing || !post}
        >
          Reset
        </Button>
        <Button 
          className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans group relative overflow-hidden"
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
              <RocketIcon className="w-4 h-4 mr-2 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:translate-y-[-2px]" />
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                Enhance Post
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple to-bright-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </Button>
      </div>

      {/* Product Hunt Section */}
      <div className="mt-12 flex flex-col items-center space-y-4">
        <a 
          href="https://www.producthunt.com/posts/postproai?utm_source=other&utm_medium=social" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-electric-purple transition-colors"
        >
          Check us out on Product Hunt!
        </a>
        <a 
          href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=903202&theme=dark&t=1740317554845" 
            alt="PostProAI - Smart AI-Powered Post Enhancement | Product Hunt" 
            style={{ width: '250px', height: '54px' }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </div>
  );
};

