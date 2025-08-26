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
import { MenuIcon, XIcon, LogOutIcon, ChevronDownIcon, User, Play } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { StreakCounter } from "@/components/streaks/StreakCounter";
import { motion } from "framer-motion";

interface NavigationProps {
  session: any;
  username: string;
  avatarUrl: string;
  handleSignOut: () => Promise<void>;
  setShowPricing: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

const NavigationNew = ({
  session,
  username,
  avatarUrl,
  handleSignOut,
  setShowPricing,
  setMobileMenuOpen,
  mobileMenuOpen,
}: NavigationProps) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Listen to scroll events
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <nav className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Left */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OptimizedImage 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI Logo" 
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                PostPro AI
              </span>
            </motion.div>
            
            {/* Navigation Links - Center */}
            <div className="hidden md:flex items-center space-x-8">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => navigate("/features")}
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => navigate("/pricing")}
              >
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => {
                  const faqSection = document.getElementById('faq');
                  if (faqSection) {
                    faqSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                FAQ
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                About
              </Button>
            </div>

            {/* CTA and User Section - Right */}
            <div className="hidden md:flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-3">
                  <StreakCounter />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage src={avatarUrl} alt={username} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {username?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{username}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/demo")}
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                  <Button
                    onClick={() => navigate("/auth")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Free Trial
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    navigate("/features");
                    setMobileMenuOpen(false);
                  }}
                >
                  Features
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    navigate("/pricing");
                    setMobileMenuOpen(false);
                  }}
                >
                  Pricing
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    const faqSection = document.getElementById('faq');
                    if (faqSection) {
                      faqSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  FAQ
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  About
                </Button>
                
                <div className="pt-3 border-t border-gray-100">
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center pb-2">
                        <StreakCounter />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <Avatar className="w-4 h-4 mr-2">
                          <AvatarImage src={avatarUrl} alt={username} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {username?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        Profile
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-red-600 hover:text-red-700"
                      >
                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate("/demo");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Demo
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/auth");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                      >
                        Start Free Trial
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default NavigationNew;