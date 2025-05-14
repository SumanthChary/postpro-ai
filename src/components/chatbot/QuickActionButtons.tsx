
import { Button } from "@/components/ui/button";
import { Share2, Image } from "lucide-react";

interface QuickActionButtonsProps {
  shareStrategy: () => void;
  handleImageUpload: () => void;
  imageUploading: boolean;
}

const QuickActionButtons = ({ 
  shareStrategy, 
  handleImageUpload,
  imageUploading
}: QuickActionButtonsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1.5"
        onClick={shareStrategy}
      >
        <Share2 size={14} />
        Get LinkedIn Strategy
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1.5"
        onClick={handleImageUpload}
        disabled={imageUploading}
      >
        <Image size={14} />
        {imageUploading ? 'Uploading...' : 'Analyze Image'}
      </Button>
    </div>
  );
};

export default QuickActionButtons;
