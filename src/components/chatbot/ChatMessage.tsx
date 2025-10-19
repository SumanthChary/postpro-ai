
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
  const isUser = message.role === "user";
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
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
          <span
            className={`text-sm font-medium ${
              isUser ? "text-white" : "text-slate-600"
            }`}
          >
            {isUser ? "You" : "AI Assistant"}
          </span>
        </div>
        <p
          className={`leading-relaxed whitespace-pre-wrap ${
            isUser ? "text-white" : "text-gray-800"
          }`}
        >
          {message.content}
        </p>
        <span
          className={`text-xs block text-right mt-2 ${
            isUser ? "text-white" : "text-gray-500"
          }`}
        >
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
