
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Globe } from "lucide-react";

const AboutAuthor = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Meet the <span className="text-purple-600 italic">Founder</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            The vision behind PostProAI
          </p>
        </div>
        
        <Card className="p-8 sm:p-10 lg:p-12 bg-white/80 backdrop-blur-sm shadow-2xl border border-gray-200/50 rounded-3xl max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl lg:text-6xl font-bold shadow-2xl">
                S
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Sumanth Chary
              </h3>
              <p className="text-lg sm:text-xl text-purple-600 font-medium mb-4 sm:mb-6">
                Founder & CEO, PostProAI
              </p>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 font-medium">
                Passionate about helping creators and businesses amplify their social media presence through AI. 
                With years of experience in digital marketing and AI development, I created PostProAI to bridge 
                the gap between great ideas and engaging content. My mission is to democratize professional-quality 
                social media content creation for everyone.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                  <Globe className="w-4 h-4" />
                  Website
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutAuthor;
