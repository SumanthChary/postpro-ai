
import { Rocket, Star, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-24 bg-light-lavender relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-electric-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-bright-teal/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black inline-block mb-3 subtle-border shadow-subtle">
            About PostPro AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto text-custom-text/80">
            We're dedicated to empowering professionals and businesses to create engaging, 
            impactful social media content through innovative AI technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-elegant hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 border border-black/5">
            <div className="bg-electric-purple/10 p-4 rounded-xl inline-flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-electric-purple" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Advanced AI Technology</h3>
            <p className="text-custom-text/80">
              Our AI algorithms are trained on millions of high-performing posts to understand what drives engagement across different platforms and industries.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-electric-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Trained on 10M+ viral posts
              </li>
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-electric-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Platform-specific optimization
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-elegant hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 border border-black/5">
            <div className="bg-bright-teal/10 p-4 rounded-xl inline-flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-bright-teal" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Professional Templates</h3>
            <p className="text-custom-text/80">
              Access industry-specific templates crafted by marketing experts that help you maintain consistent brand voice and messaging across all platforms.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-bright-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                50+ industry-specific templates
              </li>
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-bright-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Custom branding options
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-elegant hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 border border-black/5">
            <div className="bg-coral-red/10 p-4 rounded-xl inline-flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-coral-red" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">Time-Saving Automation</h3>
            <p className="text-custom-text/80">
              Transform your content in seconds rather than hours. Our AI handles the details so you can focus on strategy and big-picture thinking.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-coral-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                80% time savings on content
              </li>
              <li className="flex items-center gap-2 text-sm text-custom-text/70">
                <svg className="w-5 h-5 text-coral-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                One-click batch processing
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-colors shadow-subtle">
            Learn more about our technology
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
