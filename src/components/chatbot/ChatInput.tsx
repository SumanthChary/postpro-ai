
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  loading: boolean;
}

const ChatInput = ({ onSubmit, loading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 sm:p-3 border-t border-gray-200/50 bg-gray-50/50">
      <div className="flex gap-1.5 sm:gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about social media strategy, content ideas..."
          className="resize-none bg-white/80 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm"
          rows={1}
          disabled={loading}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={loading || !input.trim()}
          className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0"
          style={{ backgroundColor: 'rgba(57,107,255,1)' }}
        >
          <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
