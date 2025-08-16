import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlayIcon } from "lucide-react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

interface HeroSectionNewProps {
  isAuthenticated?: boolean;
  username?: string;
}

const HeroSectionNew = ({ isAuthenticated = false, username }: HeroSectionNewProps) => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  return (
    <section className="relative min-h-screen bg-background pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-muted/50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute top-40 right-10 w-56 h-56 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[80vh]">
          {/* Content Left - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trust Badge */}
            <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span>🔥 147 creators joined this week</span>
            </Badge>

            {/* Main Headline */}
            {isAuthenticated && username ? (
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  <span className="block">Welcome back,</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {username}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Ready to create another viral LinkedIn post? Let's enhance your content!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  <span className="block">Turn Random Ideas Into</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Posts That Get 10X More Engagement
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Join 12,000+ creators saving 5+ hours weekly on content creation
                </p>
              </div>
            )}

            {/* Live Results Ticker */}
            <div className="bg-card border rounded-lg p-4 overflow-hidden">
              <div className="flex items-center space-x-6 animate-pulse">
                <span className="text-sm font-medium text-card-foreground whitespace-nowrap">
                  Sarah: 15K views
                </span>
                <span className="text-sm font-medium text-card-foreground whitespace-nowrap">
                  Mike: 89% engagement
                </span>
                <span className="text-sm font-medium text-card-foreground whitespace-nowrap">
                  Jessica: Went viral
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Generate professional posts in 60 seconds",
                "Optimized for LinkedIn, Instagram, Twitter, Facebook", 
                "AI learns your brand voice and style"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 py-4 bg-accent hover:bg-accent/90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Risk Reversal */}
            <p className="text-sm text-muted-foreground">
              Free trial • No credit card • Cancel anytime
            </p>
          </div>

          {/* Visual Right - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-card/60 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-2xl">
              <div className="space-y-6">
                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-destructive">BEFORE</h3>
                    <div className="bg-muted/50 rounded-lg p-3 border">
                      <p className="text-sm text-muted-foreground">
                        "Had a great day at work! #blessed"
                      </p>
                      <div className="flex space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>23 likes</span>
                        <span>2 comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-primary">AFTER</h3>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                      <p className="text-sm text-foreground font-medium">
                        "3 lessons from today's breakthrough meeting..."
                      </p>
                      <div className="flex space-x-4 mt-2 text-xs text-primary">
                        <span>1,247 likes</span>
                        <span>156 comments</span>
                        <span>89 shares</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Enhancer Component */}
                <div className="border-t pt-4">
                  <PostEnhancer 
                    post={post} 
                    setPost={setPost}
                    category={category} 
                    setCategory={setCategory}
                    styleTone={styleTone} 
                    setStyleTone={setStyleTone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionNew;