
import { useState } from "react";
import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  imageUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: () => void;
  handleImageSelected: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ChatInput = ({
  input,
  setInput,
  handleSubmit,
  loading,
  imageUploading,
  fileInputRef,
  handleImageUpload,
  handleImageSelected,
}: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button 
            type="button"
            variant="outline" 
            size="icon" 
            className="flex-shrink-0"
            onClick={handleImageUpload}
            disabled={loading || imageUploading}
          >
            <Image size={16} />
            <span className="sr-only">Upload image</span>
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageSelected} 
          />
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about social media strategy..."
            className="resize-none"
            rows={1}
            disabled={loading || imageUploading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={loading || imageUploading || !input.trim()}
            className="flex-shrink-0"
          >
            <Send size={16} />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
