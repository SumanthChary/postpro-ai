
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

  // Only show LinkedIn sharing
  const linkedinPost = enhancedPosts.linkedin || enhancedPosts[Object.keys(enhancedPosts)[0]] || '';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <LinkedinIcon className="h-6 w-6 text-[#0077B5]" />
          Share to LinkedIn
        </h3>
      </div>
      
      {/* Actions */}
      <div className="p-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 h-12 flex items-center justify-center gap-2"
            onClick={() => {
              if (linkedinPost) {
                navigator.clipboard.writeText(linkedinPost);
                toast({
                  title: "Copied!",
                  description: "Post copied to clipboard",
                });
              }
            }}
          >
            <CopyIcon className="w-4 h-4" />
            Copy Text
          </Button>
          
          <ScheduleShareButton 
            content={linkedinPost} 
            platform="linkedin"
          />
          
          <Button 
            className="flex-1 bg-[#0077B5] hover:bg-[#0077B5]/90 text-white h-12 flex items-center justify-center gap-2"
            onClick={async () => {
              if (!linkedinPost) return;
              
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: 'Enhanced LinkedIn Post',
                    text: linkedinPost,
                  });
                } else {
                  navigator.clipboard.writeText(linkedinPost);
                  toast({
                    title: "Copied!",
                    description: "Post copied to clipboard",
                  });
                }
              } catch (error) {
                console.error('Error sharing:', error);
                navigator.clipboard.writeText(linkedinPost);
                toast({
                  title: "Copied!",
                  description: "Post copied to clipboard",
                });
              }
            }}
          >
            <LinkedinIcon className="w-4 h-4" />
            Share to LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
};
