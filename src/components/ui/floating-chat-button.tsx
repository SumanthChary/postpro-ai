import { MessageCircle } from "lucide-react";
import { Button } from "./button";

interface FloatingChatButtonProps {
  onClick?: () => void;
}

export const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className="bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};