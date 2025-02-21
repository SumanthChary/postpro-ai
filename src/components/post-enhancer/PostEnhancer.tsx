
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon, AlertCircle } from "lucide-react";
import { useState } from "react";

interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  handleEnhancePost: () => void;
}

type Platform = 'linkedin' | 'twitter' | 'instagram';

const PLATFORM_LIMITS = {
  linkedin: 3000,
  twitter: 280,
  instagram: 2200
};

const PLATFORM_PLACEHOLDERS = {
  linkedin: "Write a professional post to share with your network...",
  twitter: "What's happening?",
  instagram: "Write a caption for your post..."
};

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  handleEnhancePost,
}: PostEnhancerProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  
  const getCharacterLimit = () => PLATFORM_LIMITS[selectedPlatform];
  const getRemainingChars = () => getCharacterLimit() - post.length;
  const isOverLimit = getRemainingChars() < 0;

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatform(platform);
    // Reset post if it's over the new platform's limit
    if (post.length > PLATFORM_LIMITS[platform]) {
      setPost(post.slice(0, PLATFORM_LIMITS[platform]));
    }
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />;
      case 'twitter':
        return <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5 text-[#E4405F]" />;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-5 h-5 text-electric-purple" />
            <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Post Enhancer</h2>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => handlePlatformChange('linkedin')}
              className={`p-2 rounded-full transition-all ${selectedPlatform === 'linkedin' ? 'bg-[#0A66C2]/10' : 'hover:bg-gray-100'}`}
            >
              <LinkedinIcon className={`w-5 h-5 ${selectedPlatform === 'linkedin' ? 'text-[#0A66C2]' : 'text-gray-500'}`} />
            </button>
            <button 
              onClick={() => handlePlatformChange('twitter')}
              className={`p-2 rounded-full transition-all ${selectedPlatform === 'twitter' ? 'bg-[#1DA1F2]/10' : 'hover:bg-gray-100'}`}
            >
              <TwitterIcon className={`w-5 h-5 ${selectedPlatform === 'twitter' ? 'text-[#1DA1F2]' : 'text-gray-500'}`} />
            </button>
            <button 
              onClick={() => handlePlatformChange('instagram')}
              className={`p-2 rounded-full transition-all ${selectedPlatform === 'instagram' ? 'bg-[#E4405F]/10' : 'hover:bg-gray-100'}`}
            >
              <InstagramIcon className={`w-5 h-5 ${selectedPlatform === 'instagram' ? 'text-[#E4405F]' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {getPlatformIcon(selectedPlatform)}
            <span className="text-sm font-medium">Optimizing for {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</span>
          </div>

          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger className="w-full">
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
        </div>
        
        <div className="space-y-2">
          <Textarea
            value={post}
            onChange={(e) => {
              const newText = e.target.value;
              if (newText.length <= getCharacterLimit()) {
                setPost(newText);
              }
            }}
            placeholder={PLATFORM_PLACEHOLDERS[selectedPlatform]}
            className={`min-h-[200px] text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200 ${
              isOverLimit ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          <div className="flex justify-end items-center space-x-2">
            {isOverLimit && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>Character limit exceeded</span>
              </div>
            )}
            <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
              {getRemainingChars()} characters remaining
            </span>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            className="text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans"
            onClick={() => setPost("")}
          >
            Reset
          </Button>
          <Button 
            className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans"
            onClick={handleEnhancePost}
            disabled={isOverLimit}
          >
            <RocketIcon className="w-4 h-4 mr-2" />
            Enhance Post
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostEnhancer;
