
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-4 sm:mb-6 tracking-tight leading-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Social Media Presence
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-custom-text mb-6 sm:mb-8 leading-relaxed font-body px-4 sm:px-0">
            Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
            captivates and converts.
          </p>
          
          <Link to="/enhance">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 transition-all text-white font-semibold px-8 py-6 text-lg h-auto"
            >
              Try Now For Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
