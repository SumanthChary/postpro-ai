
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, BookOpenIcon } from "lucide-react";

interface MobileMenuProps {
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
  setShowPricing: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenu = ({
  session,
  username,
  avatarUrl,
  handleSignOut,
  setShowPricing,
  setMobileMenuOpen
}: MobileMenuProps) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  
  return (
    <div className="md:hidden mt-4 pb-4">
      <div className="flex flex-col space-y-4">
        <Button 
          variant="ghost" 
          className="text-custom-text hover:text-electric-purple w-full font-opensans"
          onClick={() => handleNavigation("/blogs")}
        >
          <BookOpenIcon className="w-4 h-4 mr-2" />
          Blog
        </Button>
        <Button 
          variant="ghost" 
          className="text-custom-text hover:text-electric-purple w-full font-opensans"
          onClick={() => handleNavigation("/affiliate")}
        >
          Affiliate
        </Button>
        <Button 
          variant="ghost" 
          className="text-custom-text hover:text-electric-purple w-full font-opensans"
          onClick={() => handleNavigation("/chatbot")}
        >
          AI Assistant
        </Button>
        <Button 
          variant="ghost" 
          className="text-custom-text hover:text-electric-purple w-full font-opensans"
          onClick={() => {
            setShowPricing(true);
            setMobileMenuOpen(false);
          }}
        >
          Pricing
        </Button>
        {session ? (
          <>
            <Button
              variant="outline"
              onClick={() => handleNavigation("/profile")}
              className="w-full font-opensans"
            >
              <Avatar className="w-4 h-4 mr-2">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleSignOut();
                setMobileMenuOpen(false);
              }}
              className="w-full font-opensans"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white w-full font-opensans"
            onClick={() => handleNavigation("/auth")}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
