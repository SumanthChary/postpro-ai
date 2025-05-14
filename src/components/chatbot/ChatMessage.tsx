
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
        className={`max-w-[80%] p-3 rounded-lg ${
          message.role === "user"
            ? "bg-electric-purple text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {message.role === "assistant" ? (
            <Bot size={14} />
          ) : (
            <User size={14} />
          )}
          <span className="text-xs opacity-70">
            {message.role === "user" ? "You" : "Assistant"}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-50 block text-right mt-1">
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
