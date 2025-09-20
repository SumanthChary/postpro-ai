
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
    <div className="space-y-6">
      <h3 className="font-bold text-xl flex items-center gap-2 text-gray-900">
        <LinkedinIcon className="h-6 w-6 text-primary" />
        Share to LinkedIn
      </h3>
      
      {/* Only show LinkedIn content since we're focused on LinkedIn optimization */}
      {enhancedPosts.linkedin && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <LinkedinIcon className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-gray-900">Ready for LinkedIn</p>
              <p className="text-sm text-gray-600">Optimized for maximum engagement</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary/5 font-medium py-3 rounded-xl"
              onClick={handleCopyText}
            >
              <CopyIcon className="w-5 h-5 mr-2" />
              Copy Text
            </Button>
            
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3 rounded-xl shadow-lg"
              onClick={() => window.open('https://www.linkedin.com/feed/', '_blank')}
            >
              <LinkedinIcon className="w-5 h-5 mr-2" />
              Open LinkedIn
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
