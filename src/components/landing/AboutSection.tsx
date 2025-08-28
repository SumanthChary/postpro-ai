
import { CheckCircleIcon, StarIcon, ZapIcon } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            About Our Platform
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            We're building the future of LinkedIn content creation. Join our early community and help us perfect the tool that improves your posts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed font-medium">
                We're dedicated to empowering professionals and businesses to create engaging, 
                impactful social media content through innovative AI technology. Our goal is to 
                democratize high-quality content creation for everyone.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <ZapIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Why Choose Us</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Advanced AI-powered content enhancement</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Professional templates for every industry</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Time-saving automation tools</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Real-time engagement optimization</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50">
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">47</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">Early Adopters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-600 mb-2 sm:mb-3">117</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">Posts Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-600 mb-2 sm:mb-3">Aug 2025</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">Launch Date</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-600 mb-2 sm:mb-3">Beta</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">Early Access</div>
              </div>
              <div className="col-span-2 text-center mt-4">
                <p className="text-xs text-gray-500 italic">
                  Data verified through internal analytics (Updated: August 26, 2025)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
