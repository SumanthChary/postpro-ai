
import { Sparkles, ShareIcon, CalendarIcon, UsersIcon } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 lg:top-20 left-5 lg:left-10 w-32 lg:w-48 h-32 lg:h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 lg:bottom-20 right-5 lg:right-10 w-40 lg:w-56 h-40 lg:h-56 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6 lg:mb-8">
            <Sparkles className="w-8 lg:w-10 h-8 lg:h-10 text-yellow-300" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Coming Soon
            </h2>
          </div>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto px-4 font-medium leading-relaxed">
            Exciting new features are on their way to revolutionize your social media workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <div className="p-3 lg:p-4 bg-white/20 rounded-2xl">
                <ShareIcon className="w-6 lg:w-7 h-6 lg:h-7 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white">Cross-Platform Sharing</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-base lg:text-lg font-medium">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click. 
              Save time and maintain consistency across all your channels.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <div className="p-3 lg:p-4 bg-white/20 rounded-2xl">
                <CalendarIcon className="w-6 lg:w-7 h-6 lg:h-7 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white">Daily Streaks</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-base lg:text-lg font-medium">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks. 
              Gamify your social media presence.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <div className="p-3 lg:p-4 bg-white/20 rounded-2xl">
                <UsersIcon className="w-6 lg:w-7 h-6 lg:h-7 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white">Team Collaboration</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-base lg:text-lg font-medium">
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
