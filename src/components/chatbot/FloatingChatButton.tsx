
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
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
              className="rounded-full w-14 h-14 bg-electric-purple hover:bg-electric-purple/90 shadow-lg flex items-center justify-center transition-all duration-300"
            >
              <Bot size={24} className="text-white" />
              {isHovered && (
                <span className="absolute -top-10 bg-white text-electric-purple text-sm py-1 px-3 rounded-full shadow-md whitespace-nowrap font-medium">
                  Ask AI Assistant
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Chat with our AI assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FloatingChatButton;
