import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon, MenuIcon, XIcon, FileTextIcon, LockIcon, LogOutIcon, ChevronDownIcon } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { useToast } from "@/hooks/use-toast";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [post, setPost] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState("business");
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUsername("");
        setAvatarUrl("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUsername(data.username || "User");
      setAvatarUrl(data.avatar_url || "");
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const getCategoryHashtags = (category: string) => {
    const hashtags = {
      business: ["#entrepreneurship", "#business", "#success", "#leadership", "#innovation", "#startup", "#growthmindset", "#businesstips", "#networking", "#entrepreneurlife"],
      technology: ["#tech", "#innovation", "#ai", "#programming", "#coding", "#developer", "#software", "#technology", "#future", "#digitalmarketing"],
      lifestyle: ["#lifestyle", "#motivation", "#mindfulness", "#wellness", "#selfcare", "#inspiration", "#personaldevelopment", "#growth", "#positivity", "#mindset"],
      marketing: ["#marketing", "#digitalmarketing", "#socialmedia", "#branding", "#contentmarketing", "#marketingstrategy", "#advertising", "#business", "#marketingtips", "#socialmediatips"],
      creative: ["#creative", "#design", "#art", "#creativity", "#inspiration", "#artist", "#designer", "#creative", "#digitalart", "#graphicdesign"]
    };
    
    return hashtags[category as keyof typeof hashtags] || hashtags.business;
  };

  const handleEnhancePost = () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enhance your posts",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!post.trim()) {
      toast({
        title: "Please enter some text",
        description: "Your post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedHashtags = getCategoryHashtags(category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      const enhancedPost = `${post}\n\n${selectedHashtags.join(" ")}`;
      
      setPost(enhancedPost);
      toast({
        title: "Post Enhanced!",
        description: "Your post has been enhanced with trending hashtags for better engagement",
      });
    } catch (error: any) {
      toast({
        title: "Enhancement failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleProTemplatesClick = () => {
    setShowPricing(true);
    toast({
      title: "Pro Templates Locked",
      description: "Subscribe to our Pro Plan to access premium templates",
      variant: "default",
    });
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg">
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
                onClick={() => setShowPricing(true)}
              >
                Pricing
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

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-6 tracking-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Social Media Presence
            </span>
          </h1>
          <p className="text-xl text-custom-text mb-8 leading-relaxed font-opensans">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-electric-purple" />
                <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Post Enhancer</h2>
              </div>
              <div className="flex space-x-3">
                <LinkedinIcon className="w-5 h-5 text-electric-purple" />
                <TwitterIcon className="w-5 h-5 text-bright-teal" />
                <InstagramIcon className="w-5 h-5 text-coral-red" />
              </div>
            </div>

            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select post category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                <SelectItem value="technology">Technology & Innovation</SelectItem>
                <SelectItem value="lifestyle">Lifestyle & Personal Development</SelectItem>
                <SelectItem value="marketing">Marketing & Digital Media</SelectItem>
                <SelectItem value="creative">Creative & Design</SelectItem>
              </SelectContent>
            </Select>
            
            <Textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste your post here to enhance it with trending hashtags..."
              className="min-h-[200px] text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200"
            />
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                className="text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans"
                onClick={() => setPost("")}
              >
                Reset
              </Button>
              <Button 
                className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans"
                onClick={handleEnhancePost}
              >
                <RocketIcon className="w-4 h-4 mr-2" />
                Enhance Post
              </Button>
            </div>
          </div>
        </Card>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-montserrat font-bold mb-4">Support Our Development</h3>
            <p className="text-gray-600 mb-6 font-opensans">
              Help us improve PostPro AI and bring new features by supporting our work!
            </p>
            <a
              href="https://buymeacoffee.com/sumanthcharyy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#FFDD00] text-[#000000] font-semibold rounded-md hover:bg-[#FFDD00]/90 transition-colors"
            >
              <img 
                src="/lovable-uploads/76f00aba-ea4e-40ad-af9f-0bf66d3ee4d5.png" 
                alt="Buy Me a Coffee" 
                className="h-8"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold text-center mb-8 bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Available Templates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <FileTextIcon className="w-6 h-6 text-electric-purple" />
                <h3 className="text-lg font-montserrat font-bold">Basic Templates</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access our collection of basic templates designed for essential social media posts.
              </p>
              <a 
                href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-electric-purple hover:text-electric-purple/80 font-semibold"
              >
                View Templates
                <RocketIcon className="w-4 h-4 ml-2" />
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-200 relative">
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-lg shadow-lg flex items-center space-x-2">
                  <LockIcon className="w-5 h-5 text-coral-red" />
                  <span className="font-semibold text-coral-red">Pro Plan Required</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <FileTextIcon className="w-6 h-6 text-bright-teal" />
                <h3 className="text-lg font-montserrat font-bold">Pro Templates</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Explore our premium templates with advanced features for professional content.
              </p>
              <button 
                onClick={handleProTemplatesClick}
                className="inline-flex items-center text-bright-teal hover:text-bright-teal/80 font-semibold"
              >
                View Templates
                <RocketIcon className="w-4 h-4 ml-2" />
              </button>
            </Card>
          </div>
        </div>

        <Testimonials />

        <FAQ />
      </main>

      <Footer />

      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-extrabold text-center mb-4">
              Choose Your Perfect Plan
            </DialogTitle>
          </DialogHeader>
          <PricingSection />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
