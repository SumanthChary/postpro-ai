
import { Bot } from "lucide-react";

const ChatLoading = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
        <div className="flex items-center gap-2">
          <Bot size={14} />
          <span className="text-xs opacity-70">Assistant</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
