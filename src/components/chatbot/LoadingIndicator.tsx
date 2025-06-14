
import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] sm:max-w-[85%] p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-200/50">
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
          <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: 'rgba(57,107,255,1)' }} />
          <span className="text-xs font-medium opacity-70">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)' }} />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)', animationDelay: '150ms' }} />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)', animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
