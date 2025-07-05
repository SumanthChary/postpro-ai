
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about social media strategy, content ideas..."
          className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl min-h-[50px]"
          rows={2}
          disabled={loading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !input.trim()}
        className="h-12 w-12 rounded-xl"
        style={{ backgroundColor: 'rgba(57,107,255,1)' }}
      >
        <Send size={18} />
      </Button>
    </form>
  );
};

export default ChatInput;
