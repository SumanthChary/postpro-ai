import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon, MenuIcon, XIcon } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { useToast } from "@/components/ui/use-toast";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  const [post, setPost] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show pricing modal after 30 seconds
    const timer = setTimeout(() => {
      setShowPricing(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnhancePost = async () => {
    if (!post.trim()) {
      toast({
        title: "Please enter some text",
        description: "Your post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const enhancedPost = `${post}\n\n#innovation #growth #success`;
      setPost(enhancedPost);
      toast({
        title: "Post Enhanced!",
        description: "Your post has been optimized for better engagement",
      });
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-8 h-8 text-electric-purple" />
              <span className="text-2xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
                PostPro AI
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="ghost" 
                className="text-custom-text hover:text-electric-purple font-opensans"
                onClick={() => setShowPricing(true)}
              >
                Pricing
              </Button>
              <Button className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white font-opensans">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
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
                <Button className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white w-full font-opensans">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
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

        {/* Main Card */}
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
            
            <Textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste your post here to enhance it with AI..."
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
                disabled={isEnhancing}
              >
                <RocketIcon className="w-4 h-4 mr-2" />
                {isEnhancing ? "Enhancing..." : "Enhance Post"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Testimonials Section */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pricing Dialog */}
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl">
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