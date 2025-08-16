import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <OptimizedImage 
              src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
              alt="PostPro AI Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-2xl font-bold text-foreground">
              PostPro AI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/blogs"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/affiliate"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Affiliate
            </Link>
            <Link 
              to="/subscription"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Pricing
            </Link>
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-medium">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {username}
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border border-border">
                  <DropdownMenuItem 
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    <Avatar className="w-4 h-4 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-foreground" />
            ) : (
              <MenuIcon className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/blogs"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpenIcon className="w-4 h-4 mr-2 inline" />
                Blog
              </Link>
              <Link 
                to="/affiliate"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Affiliate
              </Link>
              <Link 
                to="/subscription"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              {session ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start font-medium"
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
                    className="w-full justify-start font-medium"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full font-medium"
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
      </nav>
    </header>
  );
};

export default Navigation;
