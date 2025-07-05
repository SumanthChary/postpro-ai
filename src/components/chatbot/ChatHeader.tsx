
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onReset: () => void;
}

const ChatHeader = ({ onReset }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
      <div>
        <h2 className="font-medium text-gray-900">Conversation</h2>
        <p className="text-sm text-gray-500">Ask me anything about social media</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset} 
        className="gap-2 text-gray-600 hover:text-gray-900"
      >
        <RotateCcw size={16} />
        Reset
      </Button>
    </div>
  );
};

export default ChatHeader;
