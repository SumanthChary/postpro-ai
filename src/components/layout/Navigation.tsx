import React, { useState, startTransition, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, XIcon, LogOutIcon, ChevronDownIcon, BookOpenIcon, History } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { HeaderStreakCounter } from "./HeaderStreakCounter";

interface NavigationProps {
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
  setShowPricing: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

const Navigation = memo(({
  session,
  username,
  avatarUrl,
  handleSignOut,
  setShowPricing,
  setMobileMenuOpen,
  mobileMenuOpen,
}: NavigationProps) => {
  const navigate = useNavigate();

  // Memoize navigation handlers to prevent unnecessary re-renders
  const handleBlogClick = useCallback(() => {
    startTransition(() => navigate("/blogs"));
  }, [navigate]);

  const handleFeaturesClick = useCallback(() => {
    startTransition(() => navigate("/features"));
  }, [navigate]);

  const handlePricingClick = useCallback(() => {
    startTransition(() => navigate("/pricing"));
  }, [navigate]);

  const handleHistoryClick = useCallback(() => {
    startTransition(() => navigate("/post-history"));
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    startTransition(() => navigate("/"));
  }, [navigate]);

  const handleAuthClick = useCallback(() => {
    startTransition(() => navigate("/auth"));
  }, [navigate]);

  const handleProfileClick = useCallback(() => {
    startTransition(() => navigate("/profile"));
  }, [navigate]);

  const handleAnalyzeClick = useCallback(() => {
    startTransition(() => navigate("/analyze"));
  }, [navigate]);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const handleMobileBlogClick = useCallback(() => {
    startTransition(() => {
      navigate("/blogs");
      setMobileMenuOpen(false);  
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileFeaturesClick = useCallback(() => {
    startTransition(() => {
      navigate("/features");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobilePricingClick = useCallback(() => {
    startTransition(() => {
      navigate("/pricing");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileHistoryClick = useCallback(() => {
    startTransition(() => {
      navigate("/post-history");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileProfileClick = useCallback(() => {
    startTransition(() => {
      navigate("/profile");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileAnalyzeClick = useCallback(() => {
    startTransition(() => {
      navigate("/analyze");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileAuthClick = useCallback(() => {
    startTransition(() => {
      navigate("/auth");
      setMobileMenuOpen(false);
    });
  }, [navigate, setMobileMenuOpen]);

  const handleMobileSignOut = useCallback(() => {
    handleSignOut();
    setMobileMenuOpen(false);
  }, [handleSignOut, setMobileMenuOpen]);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
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
              onClick={handleBlogClick}
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Blog
            </Button>
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={handleFeaturesClick}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={handlePricingClick}
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              className="text-custom-text hover:text-blue-600 font-opensans"
              onClick={handleAnalyzeClick}
            >
              Paste & Analyze
            </Button>
            {session && (
              <Button
                variant="ghost"
                className="text-custom-text hover:text-blue-600 font-opensans"
                onClick={handleHistoryClick}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            )}
            {session ? (
              <div className="flex items-center space-x-3">
                <HeaderStreakCounter userId={session?.user?.id} />
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
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <Avatar className="w-4 h-4 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    handleSignOut();
                  }}>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-opensans"
                onClick={handleAuthClick}
              >
                Sign In
              </Button>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={handleMobileMenuToggle}
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
                onClick={handleMobileBlogClick}
              >
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={handleMobileFeaturesClick}
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={handleMobilePricingClick}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="text-custom-text hover:text-blue-600 w-full font-opensans"
                onClick={handleMobileAnalyzeClick}
              >
                Paste & Analyze
              </Button>
              {session && (
                <Button
                  variant="ghost"
                  className="text-custom-text hover:text-blue-600 w-full font-opensans"
                  onClick={handleMobileHistoryClick}
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
              )}
              {session ? (
                <>
                  <div className="flex items-center justify-center mb-2">
                    <HeaderStreakCounter userId={session?.user?.id} />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleMobileProfileClick}
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
                    onClick={handleMobileSignOut}
                    className="w-full font-opensans"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full font-opensans"
                  onClick={handleMobileAuthClick}
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
});

export default Navigation;
