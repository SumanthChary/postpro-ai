
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
import { SparklesIcon, MenuIcon, XIcon, LogOutIcon, ChevronDownIcon, BookOpenIcon, Rocket } from "lucide-react";

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
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-electric-purple" />
            <span className="text-2xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              PostPro AI
            </span>
          </div>
          
          <div className="hidden md:flex space-x-4">
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
              onClick={() => setShowPricing(true)}
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              className="font-opensans bg-[#F97316] hover:bg-[#FB923C] text-white hover:text-white transition-colors"
              onClick={() => window.open('https://www.producthunt.com/posts/postproai?utm_source=other&utm_medium=social', '_blank')}
            >
              <Rocket className="w-4 h-4 mr-2" />
              View on Product Hunt
            </Button>
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
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-electric-purple w-full font-opensans"
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
                className="text-custom-text hover:text-electric-purple w-full font-opensans"
                onClick={() => {
                  setShowPricing(true);
                  setMobileMenuOpen(false);
                }}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="font-opensans bg-[#F97316] hover:bg-[#FB923C] text-white hover:text-white w-full transition-colors"
                onClick={() => {
                  window.open('https://www.producthunt.com/posts/postproai?utm_source=other&utm_medium=social', '_blank');
                  setMobileMenuOpen(false);
                }}
              >
                <Rocket className="w-4 h-4 mr-2" />
                View on Product Hunt
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
                  className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white w-full font-opensans"
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
  );
};

export default Navigation;
