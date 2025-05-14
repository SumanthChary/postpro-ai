
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "lucide-react";

interface NavLinksProps {
  setShowPricing: (show: boolean) => void;
}

export const NavLinks = ({ setShowPricing }: NavLinksProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => navigate("/blogs")}
      >
        <BookOpenIcon className="w-4 h-4 mr-2" />
        Blog
      </Button>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => navigate("/affiliate")}
      >
        Affiliate
      </Button>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => navigate("/chatbot")}
      >
        AI Assistant
      </Button>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => setShowPricing(true)}
      >
        Pricing
      </Button>
    </>
  );
};
