
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import Logo from "./navigation/Logo";
import NavLinks from "./navigation/NavLinks";
import UserMenu from "./navigation/UserMenu";
import MobileMenu from "./navigation/MobileMenu";

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
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex space-x-4">
            <NavLinks setShowPricing={setShowPricing} />
            <UserMenu 
              session={session} 
              username={username} 
              avatarUrl={avatarUrl} 
              handleSignOut={handleSignOut} 
            />
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

        <MobileMenu 
          isOpen={mobileMenuOpen}
          session={session}
          username={username}
          avatarUrl={avatarUrl}
          handleSignOut={handleSignOut}
          setShowPricing={setShowPricing}
          closeMobileMenu={closeMobileMenu}
        />
      </div>
    </nav>
  );
};

export default Navigation;
