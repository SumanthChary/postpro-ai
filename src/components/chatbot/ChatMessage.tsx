
import { Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[85%] p-2 sm:p-3 rounded-lg sm:rounded-xl ${
          message.role === "user"
            ? "text-white rounded-tr-sm"
            : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-200/50"
        }`}
        style={message.role === "user" ? { backgroundColor: 'rgba(57,107,255,1)' } : {}}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
          {message.role === "assistant" ? (
            <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: 'rgba(57,107,255,1)' }} />
          ) : (
            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          )}
          <span className="text-xs font-medium opacity-70">
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-50 block text-right mt-1 sm:mt-1.5">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
