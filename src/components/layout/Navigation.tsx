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
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50 transition-smooth">
      <div className="container-xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer transition-smooth hover:opacity-80" onClick={() => navigate("/")}>
            <OptimizedImage 
              src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
              alt="PostPro AI Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-xl font-semibold text-foreground">
              PostPro AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => navigate("/blogs")}
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Blog
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => navigate("/affiliate")}
            >
              Affiliate
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setShowPricing(true)}
            >
              Pricing
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {username}
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border">
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
                className="ml-2 bg-primary text-primary-foreground hover:opacity-90 transition-smooth"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          <button 
            className="md:hidden touch-target transition-smooth hover:bg-muted rounded-lg p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-5 h-5 text-foreground" />
            ) : (
              <MenuIcon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-4">
            <div className="space-responsive-sm">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground hover:bg-muted w-full justify-start touch-button"
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
                className="text-muted-foreground hover:text-foreground hover:bg-muted w-full justify-start touch-button"
                onClick={() => {
                  navigate("/affiliate");
                  setMobileMenuOpen(false);
                }}
              >
                Affiliate
              </Button>
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground hover:bg-muted w-full justify-start touch-button"
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
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start touch-button"
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
                    className="w-full justify-start touch-button"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-primary text-primary-foreground hover:opacity-90 w-full touch-button"
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
