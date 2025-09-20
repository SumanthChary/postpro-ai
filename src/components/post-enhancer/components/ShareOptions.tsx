
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareOptionsProps {
  enhancedPosts: {[key: string]: string};
  onPlatformSelect: (platform: string) => void;
}

export const ShareOptions = ({ enhancedPosts, onPlatformSelect }: ShareOptionsProps) => {
  const { toast } = useToast();

  // Only show LinkedIn copy button
  const linkedinPost = enhancedPosts.linkedin || enhancedPosts[Object.keys(enhancedPosts)[0]] || '';
  
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Post copied to clipboard",
    });
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => handleCopyText(linkedinPost)}
        variant="ghost"
        size="sm"
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2"
      >
        <Copy size={16} />
      </Button>
    </div>
  );
};
