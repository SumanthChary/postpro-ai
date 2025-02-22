
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon } from "lucide-react";

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
          <SparklesIcon className="w-5 h-5 text-electric-purple" />
          <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Professional Post Enhancer</h2>
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
        placeholder="Paste your post here to enhance it with professional AI magic ✨"
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
          className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans group"
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
              <RocketIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-45" />
              Enhance Post
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
