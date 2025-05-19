
import { Sparkles } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-20 my-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-electric-purple to-bright-teal opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white inline-block mb-3">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
            The Future of Social Media Management
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-white">Cross-Platform Sharing</h3>
            <p className="text-white/90">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click.
            </p>
          </div>
          
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-white">Daily Streaks</h3>
            <p className="text-white/90">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks.
            </p>
          </div>
          
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-white">Team Collaboration</h3>
            <p className="text-white/90">
              Work together with your team to create and manage content efficiently with advanced collaboration tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
