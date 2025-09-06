
import { Sparkles, ShareIcon, CalendarIcon, UsersIcon } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-5 sm:top-10 lg:top-20 left-3 sm:left-5 lg:left-10 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 sm:bottom-10 lg:bottom-20 right-3 sm:right-5 lg:right-10 w-28 sm:w-40 lg:w-56 h-28 sm:h-40 lg:h-56 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Coming Soon
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 max-w-4xl mx-auto px-2 font-medium leading-relaxed">
            Exciting new features are on their way to revolutionize your social media workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
              <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-xl sm:rounded-2xl">
                <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Cross-Platform Sharing</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click. 
              Save time and maintain consistency across all your channels.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
              <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-xl sm:rounded-2xl">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Daily Streaks</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks. 
              Gamify your social media presence.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
              <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-xl sm:rounded-2xl">
                <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Team Collaboration</h3>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
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
