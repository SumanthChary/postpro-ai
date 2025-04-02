
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, RocketIcon, Loader2Icon, RefreshCw, ArrowRightLeft, Stars, Rocket, Zap, Award } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import { useState } from "react";

interface EnhancerFormProps {
  post: string;
  category: string;
  isEnhancing: boolean;
  onPostChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
  onEnhance: () => void;
}

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const categoryOptions: CategoryOption[] = [
    {
      value: "business",
      label: "Business & Entrepreneurship",
      icon: <Award className="w-4 h-4 text-electric-purple" />,
      description: "Perfect for business insights, startup advice, and professional growth content"
    },
    {
      value: "technology",
      label: "Technology & Innovation",
      icon: <Zap className="w-4 h-4 text-electric-purple" />,
      description: "Ideal for tech trends, digital innovation, and product announcements"
    },
    {
      value: "lifestyle",
      label: "Lifestyle & Personal Development",
      icon: <Stars className="w-4 h-4 text-electric-purple" />,
      description: "Great for self-improvement, wellness, and life experience sharing"
    },
    {
      value: "marketing",
      label: "Marketing & Digital Media",
      icon: <SparklesIcon className="w-4 h-4 text-electric-purple" />,
      description: "Enhance content about marketing strategies, social media, and digital campaigns"
    },
    {
      value: "creative",
      label: "Creative & Design",
      icon: <Rocket className="w-4 h-4 text-electric-purple" />,
      description: "For design insights, creative processes, and artistic expressions"
    },
  ];

  const selectedCategory = categoryOptions.find(option => option.value === category) || categoryOptions[0];

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

      {/* Enhanced Category Selector */}
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Select Content Category</label>
        
        <div className="relative group">
          <Select 
            value={category}
            onValueChange={(value) => {
              onCategoryChange(value);
              console.log("Category changed to:", value);
            }}
            onOpenChange={(open) => {
              setIsSelectOpen(open);
              console.log("Select dropdown is now:", open ? "open" : "closed");
            }}
          >
            <SelectTrigger className="w-full bg-white transition-all duration-300 border-gray-200 hover:border-electric-purple relative overflow-hidden group z-10">
              <div className="flex items-center">
                {selectedCategory?.icon}
                <span className="ml-2">{selectedCategory?.label || "Select a category"}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/5 to-bright-teal/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </SelectTrigger>
            
            <SelectContent 
              className="bg-white border border-gray-200 shadow-lg w-full z-50" 
              position="popper"
            >
              {categoryOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="py-3 px-2 focus:bg-light-lavender/50 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2 font-medium">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 pl-6">{option.description}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-electric-purple to-bright-teal rounded-xl blur opacity-0 ${isSelectOpen ? 'opacity-20' : 'group-hover:opacity-20'} transition duration-300`}></div>
        </div>
      </div>
      
      <div className="relative group">
        <Textarea
          value={post}
          onChange={(e) => {
            onPostChange(e.target.value);
            console.log("Text changed:", e.target.value);
          }}
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

      {/* Enhanced Tips Section */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-start space-x-3 bg-light-lavender/40 p-3 rounded-lg">
          <div className="bg-electric-purple/10 rounded-full p-2 mt-1">
            <ArrowRightLeft className="w-4 h-4 text-electric-purple" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">Pro Tips</h4>
            <ul className="text-xs text-gray-600 mt-1 space-y-1">
              <li>• Add industry-specific keywords to improve your post's reach</li>
              <li>• Include a clear call-to-action for better engagement</li>
              <li>• Keep your original message but make it more impactful</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
