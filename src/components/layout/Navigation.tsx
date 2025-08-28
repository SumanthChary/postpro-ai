import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, CreditCard, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserCountBadge from "@/components/trust/UserCountBadge";
import LiveSupportBadge from "@/components/trust/LiveSupportBadge";
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
  const location = useLocation();

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <OptimizedImage 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI Logo" 
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PostPro AI
              </span>
            </div>
            
            {/* Trust Indicators - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <UserCountBadge variant="small" />
              <LiveSupportBadge />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium ${
                location.pathname === '/blogs' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => navigate("/blogs")}
            >
              Blog
            </Button>
            <Button 
              variant="ghost" 
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium ${
                location.pathname === '/affiliate' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => navigate("/affiliate")}
            >
              Affiliate
            </Button>
            <Button 
              variant="ghost" 
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium ${
                location.pathname === '/pricing' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-medium">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/subscription")}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile Trust Indicators */}
                <div className="flex flex-col space-y-3 mb-6">
                  <UserCountBadge variant="large" />
                  <LiveSupportBadge />
                </div>
                
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => navigate("/blogs")}
                >
                  Blog
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => navigate("/affiliate")}
                >
                  Affiliate
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => navigate("/pricing")}
                >
                  Pricing
                </Button>
                
                {session ? (
                  <>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
