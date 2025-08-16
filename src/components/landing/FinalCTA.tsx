import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ArrowRightIcon } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary-foreground/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full mix-blend-overlay filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof Badge */}
          <Badge variant="secondary" className="mb-6 text-primary">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2"></span>
            🔥 147 creators joined this week
          </Badge>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
              Content Game?
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators already growing their audience with PostPro AI
          </p>

          {/* Benefits List */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              "Generate viral posts in 60 seconds",
              "Increase engagement by 89% on average", 
              "Save 5+ hours weekly on content creation"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <CheckIcon className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/90 font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="space-y-6 mb-12">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial Now
              <ArrowRightIcon className="w-6 h-6 ml-3" />
            </Button>
            
            <p className="text-primary-foreground/70 text-sm">
              Get started in less than 60 seconds
            </p>
          </div>

          {/* Final Guarantees */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-primary-foreground">Free Trial</p>
              <p className="text-sm text-primary-foreground/70">Start immediately</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-primary-foreground">No Credit Card Required</p>
              <p className="text-sm text-primary-foreground/70">Zero commitment</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-primary-foreground">Cancel Anytime</p>
              <p className="text-sm text-primary-foreground/70">One-click cancellation</p>
            </div>
          </div>

          {/* Last Social Proof */}
          <div className="mt-16 p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
            <p className="text-primary-foreground/90 mb-4">
              "PostPro AI transformed my LinkedIn presence completely. I went from 50 likes per post to 2,000+ consistently."
            </p>
            <div className="flex items-center justify-center space-x-3">
              <img 
                src="/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png" 
                alt="Success story"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-primary-foreground">Sarah Chen</p>
                <p className="text-sm text-primary-foreground/70">Tech Founder, 47K followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;