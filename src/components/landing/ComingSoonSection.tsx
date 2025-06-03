
import { Sparkles, ShareIcon, CalendarIcon, UsersIcon } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-300" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Coming Soon
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto px-4">
            Exciting new features are on their way to revolutionize your social media workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <ShareIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Cross-Platform Sharing</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click. 
              Save time and maintain consistency across all your channels.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <CalendarIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Daily Streaks</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks. 
              Gamify your social media presence.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <UsersIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Team Collaboration</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
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
