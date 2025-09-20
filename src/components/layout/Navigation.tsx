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
import { SparklesIcon, MenuIcon, XIcon, LogOutIcon, ChevronDownIcon, BookOpenIcon } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

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
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <OptimizedImage 
              src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
              alt="PostPro AI Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-2xl font-montserrat font-extrabold text-black">
              PostPro AI
            </span>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={() => navigate("/blogs")}
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Blog
            </Button>
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={() => navigate("/affiliate")}
            >
              Affiliate
            </Button>
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-opensans hover:bg-blue-50 rounded-full px-3 py-2">
                    <Avatar className="w-8 h-8 mr-3 ring-2 ring-blue-100">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback className="bg-blue-600 text-white font-semibold">{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 font-medium">{username}</span>
                    <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-500" />
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-opensans"
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
              <XIcon className="w-6 h-6 text-blue-600" />
            ) : (
              <MenuIcon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={() => {
                  navigate("/blogs");
                  setMobileMenuOpen(false);
                }}
              >
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={() => {
                  navigate("/affiliate");
                  setMobileMenuOpen(false);
                }}
              >
                Affiliate
              </Button>
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={() => {
                  navigate("/pricing");
                  setMobileMenuOpen(false);
                }}
              >
                Pricing
              </Button>
              {session ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
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
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full font-opensans"
                  onClick={() => {
                    navigate("/auth");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
      </div>
    </div>
  );
};

export default Navigation;
