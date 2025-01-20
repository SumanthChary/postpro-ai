import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon, CheckIcon } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [post, setPost] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { toast } = useToast();

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
      // Simulate AI enhancement for now
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-linkedin via-forest to-warm bg-clip-text text-transparent">
            ProfilePerfect AI
          </div>
          <div className="space-x-4">
            <Button 
              variant="ghost" 
              className="text-custom-text hover:text-forest"
              onClick={() => setShowPricing(true)}
            >
              Pricing
            </Button>
            <Button className="bg-forest hover:bg-forest/90 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-linkedin via-forest to-warm bg-clip-text text-transparent">
              Social Media Presence
            </span>
          </h1>
          <p className="text-xl text-custom-text mb-8 leading-relaxed">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-warm" />
                <h2 className="text-lg font-semibold text-custom-text">Post Enhancer</h2>
              </div>
              <div className="flex space-x-3">
                <LinkedinIcon className="w-5 h-5 text-linkedin" />
                <TwitterIcon className="w-5 h-5 text-twitter" />
                <InstagramIcon className="w-5 h-5 text-instagram" />
              </div>
            </div>
            
            <Textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste your post here to enhance it with AI..."
              className="min-h-[200px] text-base resize-none rounded-[10px] border-gray-200 focus:border-forest focus:ring-forest transition-all duration-200"
            />
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                className="text-custom-text border-forest hover:bg-forest/5"
                onClick={() => setPost("")}
              >
                Reset
              </Button>
              <Button 
                className="bg-gradient-to-r from-linkedin to-forest text-white hover:opacity-90"
                onClick={handleEnhancePost}
                disabled={isEnhancing}
              >
                <RocketIcon className="w-4 h-4 mr-2" />
                {isEnhancing ? "Enhancing..." : "Enhance Post"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-0 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <LinkedinIcon className="w-8 h-8 text-linkedin mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-custom-text">LinkedIn Optimization</h3>
            <p className="text-custom-text/80">
              Perfect your professional presence with AI-enhanced posts
            </p>
          </Card>
          <Card className="p-6 border-0 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <TwitterIcon className="w-8 h-8 text-twitter mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-custom-text">Twitter Enhancement</h3>
            <p className="text-custom-text/80">
              Craft engaging tweets that capture attention
            </p>
          </Card>
          <Card className="p-6 border-0 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <InstagramIcon className="w-8 h-8 text-instagram mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-custom-text">Instagram Growth</h3>
            <p className="text-custom-text/80">
              Create captivating content that drives engagement
            </p>
          </Card>
        </div>
      </main>

      {/* Pricing Dialog */}
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
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