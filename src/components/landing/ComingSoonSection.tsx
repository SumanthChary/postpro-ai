
import { Sparkles } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-24 my-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white inline-block mb-5 border border-white/10 shadow-elegant">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white">
            The Future of Social Media Management
          </h2>
          <p className="text-white/80 text-lg max-w-2xl text-center mb-8">
            We're constantly innovating to bring you the most advanced social media tools. 
            Here's what's coming next on our roadmap.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-electric-purple/20 flex items-center justify-center mb-6 group-hover:bg-electric-purple/30 transition-colors">
              <svg className="w-6 h-6 text-electric-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Cross-Platform Sharing</h3>
            <p className="text-white/80">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click. Schedule, analyze, and optimize in one place.
            </p>
          </div>
          
          <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-bright-teal/20 flex items-center justify-center mb-6 group-hover:bg-bright-teal/30 transition-colors">
              <svg className="w-6 h-6 text-bright-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Daily Streaks</h3>
            <p className="text-white/80">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks. Watch your audience grow with consistency.
            </p>
          </div>
          
          <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-coral-red/20 flex items-center justify-center mb-6 group-hover:bg-coral-red/30 transition-colors">
              <svg className="w-6 h-6 text-coral-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Team Collaboration</h3>
            <p className="text-white/80">
              Work together with your team to create and manage content efficiently with advanced collaboration tools. Assign roles, review, and publish together.
            </p>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <a href="#" className="text-white/80 text-sm flex items-center gap-2 hover:text-white transition-colors border-b border-white/30 pb-1 hover:border-white">
            Join our waitlist for early access
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
