
import { Bot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onReset: () => void;
}

const ChatHeader = ({ onReset }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-2 sm:p-3 border-b border-gray-200/50">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
          <Bot style={{ color: 'rgba(57,107,255,1)' }} className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <div>
          <h2 className="text-xs sm:text-sm font-semibold text-gray-900">AI Assistant</h2>
          <p className="text-xs text-gray-500">Always here to help</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset} 
        className="gap-1 hover:bg-gray-100 text-xs px-1.5 sm:px-2 py-1 sm:py-1.5"
      >
        <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        <span className="hidden sm:inline">Reset</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
