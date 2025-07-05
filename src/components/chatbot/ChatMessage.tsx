
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
        className={`max-w-[80%] p-4 rounded-2xl ${
          message.role === "user"
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-gray-100 text-gray-900 rounded-bl-md"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {message.role === "assistant" ? (
            <Bot size={16} className="text-blue-600" />
          ) : (
            <User size={16} className="text-blue-100" />
          )}
          <span className="text-sm font-medium opacity-80">
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
        </div>
        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-60 block text-right mt-2">
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
