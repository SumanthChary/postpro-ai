
import { Button } from "@/components/ui/button";
import { LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon, CopyIcon, ShareIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ScheduleShareButton from "../../ScheduleShareButton";

interface ShareOptionsProps {
  enhancedPosts: {[key: string]: string};
  onPlatformSelect: (platform: string) => void;
}

export const ShareOptions = ({ enhancedPosts, onPlatformSelect }: ShareOptionsProps) => {
  const [activePlatform, setActivePlatform] = useState<string>("linkedin");
  const { toast } = useToast();

  const handlePlatformClick = (platform: string) => {
    if (enhancedPosts[platform]) {
      setActivePlatform(platform);
      onPlatformSelect(platform);
    } else {
      toast({
        title: "Not Available",
        description: `Enhanced content for ${platform} is not available.`,
        variant: "default",
      });
    }
  };

  const handleCopyText = () => {
    if (enhancedPosts[activePlatform]) {
      navigator.clipboard.writeText(enhancedPosts[activePlatform]);
      toast({
        title: "Copied!",
        description: "Post copied to clipboard",
      });
    }
  };

  const handleShare = async () => {
    if (!enhancedPosts[activePlatform]) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Enhanced Post',
          text: enhancedPosts[activePlatform],
        });
      } else {
        handleCopyText();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      handleCopyText();
    }
  };

  const getPlatformName = (key: string): string => {
    const names: {[key: string]: string} = {
      linkedin: "LinkedIn",
      twitter: "Twitter/X",
      instagram: "Instagram",
      facebook: "Facebook"
    };
    return names[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <LinkedinIcon className="w-5 h-5" />;
      case 'twitter': return <TwitterIcon className="w-5 h-5" />;
      case 'instagram': return <InstagramIcon className="w-5 h-5" />;
      case 'facebook': return <FacebookIcon className="w-5 h-5" />;
      default: return null;
    }
  };

  const getPlatformColor = (platform: string): string => {
    const colors: {[key: string]: string} = {
      linkedin: "bg-[#0077B5] hover:bg-[#0077B5]/90",
      twitter: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      instagram: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90",
      facebook: "bg-[#1877F2] hover:bg-[#1877F2]/90"
    };
    return colors[platform] || "bg-gray-600 hover:bg-gray-700";
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
        <ShareIcon className="h-5 w-5 text-blue-600" />
        Cross-Platform Sharing
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {Object.keys(enhancedPosts).map((platform) => (
          <Button
            key={platform}
            variant="outline"
            className={`${
              activePlatform === platform 
                ? "border-blue-600 bg-blue-50 text-gray-900" 
                : "border-gray-200 text-gray-900"
            } transition-all hover:bg-blue-50`}
            onClick={() => handlePlatformClick(platform)}
          >
            {getPlatformIcon(platform)}
            <span>{getPlatformName(platform)}</span>
          </Button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCopyText}
        >
          <CopyIcon className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
        <ScheduleShareButton 
          content={enhancedPosts[activePlatform] || ''} 
          platform={activePlatform}
        />
        <Button 
          className={`flex-1 ${getPlatformColor(activePlatform)}`}
          onClick={handleShare}
        >
          {getPlatformIcon(activePlatform)}
          <span className="ml-2">Share to {getPlatformName(activePlatform)}</span>
        </Button>
      </div>
    </div>
  );
};
