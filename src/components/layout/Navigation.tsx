
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, ChevronDownIcon, BookOpenIcon, MenuIcon, XIcon } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

interface NavigationProps {
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
  setShowPricing: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

const Navigation = ({
  session,
  username,
  avatarUrl,
  handleSignOut,
  setShowPricing,
  setMobileMenuOpen,
  mobileMenuOpen,
}: NavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex space-x-4">
            <NavLinks setShowPricing={setShowPricing} />
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-opensans">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {username}
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Avatar className="w-4 h-4 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white font-opensans"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-electric-purple" />
            ) : (
              <MenuIcon className="w-6 h-6 text-electric-purple" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <MobileMenu 
            session={session}
            username={username}
            avatarUrl={avatarUrl}
            handleSignOut={handleSignOut}
            setShowPricing={setShowPricing}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
