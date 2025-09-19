
import { Badge } from "@/components/ui/badge";

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            The Power of AI Enhancement
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-medium leading-relaxed px-2">
            See the dramatic difference AI enhancement makes to real LinkedIn posts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Before Section */}
          <div className="relative group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Badge variant="destructive" className="text-lg font-bold px-6 py-2 shadow-lg">
                BEFORE
              </Badge>
            </div>
            <div className="bg-card border border-destructive/20 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
              <img 
                src="/lovable-uploads/before-post.png" 
                alt="Before AI enhancement - basic LinkedIn post with minimal engagement: 5 likes, 1 comment"
                className="w-full h-auto rounded-xl shadow-md"
                loading="lazy"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center">
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                    📊 5 likes • 1 comment
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-medium">
                    Generic content with minimal engagement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* After Section */}
          <div className="relative group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Badge className="text-lg font-bold px-6 py-2 shadow-lg bg-primary text-primary-foreground">
                AFTER
              </Badge>
            </div>
            <div className="bg-card border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
              <img 
                src="/lovable-uploads/after-post.png" 
                alt="After AI enhancement - optimized LinkedIn post with massive engagement: 2,134 likes, 456 comments, 127 shares"
                className="w-full h-auto rounded-xl shadow-md"
                loading="lazy"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center">
                  <Badge className="bg-primary text-primary-foreground animate-pulse">
                    🚀 2,134 likes • 456 comments • 127 shares
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-primary">
                    427x MORE ENGAGEMENT
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Strategic content + hashtags + clear call-to-action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Impact Stats */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-primary/5 border border-primary/20 rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">427x</div>
              <div className="text-sm text-muted-foreground">More Engagement</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">2,134</div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Shares</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
