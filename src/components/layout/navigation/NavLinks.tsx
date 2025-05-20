
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "lucide-react";

interface NavLinksProps {
  setShowPricing: (show: boolean) => void;
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const NavLinks = ({ 
  setShowPricing, 
  isMobile = false, 
  closeMobileMenu 
}: NavLinksProps) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handlePricingClick = () => {
    setShowPricing(true);
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => handleClick("/blogs")}
      >
        <BookOpenIcon className="w-4 h-4 mr-2" />
        Blog
      </Button>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={() => handleClick("/affiliate")}
      >
        Affiliate
      </Button>
      <Button 
        variant="ghost" 
        className="text-custom-text hover:text-electric-purple font-opensans"
        onClick={handlePricingClick}
      >
        Pricing
      </Button>
    </>
  );
};

export default NavLinks;
