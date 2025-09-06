
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate("/chatbot");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        size="lg"
        className="relative group rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl text-white border-0 p-0"
      >
        <MessageCircle size={24} className="text-white" />
        
        {isHovered && (
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            Chat with AI
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </Button>
    </div>
  );
};

export default FloatingChatButton;
