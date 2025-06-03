
import { Sparkles, ShareIcon, CalendarIcon, UsersIcon } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
              Coming Soon
            </h2>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Exciting new features are on their way to revolutionize your social media workflow
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <ShareIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Cross-Platform Sharing</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click. 
              Save time and maintain consistency across all your channels.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Daily Streaks</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks. 
              Gamify your social media presence.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Team Collaboration</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Work together with your team to create and manage content efficiently. 
              Share templates, collaborate on posts, and maintain brand consistency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
