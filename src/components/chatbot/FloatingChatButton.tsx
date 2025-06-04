
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate("/chatbot");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              size="lg"
              className="relative group rounded-full w-16 h-16 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl text-white border-0 overflow-hidden"
              style={{ backgroundColor: 'rgba(57,107,255,1)' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon container */}
              <div className="relative z-10 flex items-center justify-center">
                {isHovered ? (
                  <Sparkles size={24} className="text-white animate-pulse" />
                ) : (
                  <MessageCircle size={24} className="text-white" />
                )}
              </div>

              {/* Hover tooltip */}
              {isHovered && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm py-2 px-4 rounded-lg shadow-lg whitespace-nowrap font-medium">
                  Chat with AI Assistant
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}

              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
            <p>Chat with our AI assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FloatingChatButton;
