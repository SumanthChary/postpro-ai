
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
  setShowPricing: (show: boolean) => void;
  closeMobileMenu: () => void;
}

const MobileMenu = ({
  isOpen,
  session,
  username,
  avatarUrl,
  handleSignOut,
  setShowPricing,
  closeMobileMenu,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  const handleSignOutClick = async () => {
    await handleSignOut();
    closeMobileMenu();
  };

  return (
    <div className="md:hidden mt-4 pb-4">
      <div className="flex flex-col space-y-4">
        <NavLinks 
          setShowPricing={setShowPricing} 
          isMobile={true} 
          closeMobileMenu={closeMobileMenu} 
        />
        
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
              onClick={handleSignOutClick}
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

export default MobileMenu;
