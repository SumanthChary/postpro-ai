
import { Card } from "@/components/ui/card";
import { Edit3, Sparkles, Share2, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      title: "Write Your Post",
      description: "Start with your original content or idea. No matter how rough it is, our AI will help you polish it.",
      step: "01"
    },
    {
      icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      title: "AI Enhancement",
      description: "Our advanced AI analyzes your content and enhances it for maximum engagement and professional impact.",
      step: "02"
    },
    {
      icon: <Share2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      title: "Share & Schedule",
      description: "Get your polished content ready for posting across LinkedIn, Twitter, and Instagram with scheduling options.",
      step: "03"
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      title: "Track Results",
      description: "Monitor your engagement rates and see the difference our AI enhancement makes to your social media presence.",
      step: "04"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            How It <span className="text-purple-600 italic">Works</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            Transform your social media presence in just 4 simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 sm:p-8 lg:p-10 bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden rounded-2xl group">
              <div className="absolute top-4 right-4 text-6xl sm:text-7xl lg:text-8xl font-bold text-purple-100 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                {step.step}
              </div>
              
              <div className="relative z-10">
                <div className="mb-6 sm:mb-8 text-purple-600">
                  {step.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
