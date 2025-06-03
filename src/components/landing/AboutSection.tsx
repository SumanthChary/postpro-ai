
import { CheckCircleIcon, StarIcon, ZapIcon } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 lg:mb-8 tracking-tight">
            About Our Platform
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
            Discover why thousands of professionals trust PostProAI to elevate their social media presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <StarIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-medium">
                We're dedicated to empowering professionals and businesses to create engaging, 
                impactful social media content through innovative AI technology. Our goal is to 
                democratize high-quality content creation for everyone.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <ZapIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Why Choose Us</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-lg lg:text-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Advanced AI-powered content enhancement</span>
                </li>
                <li className="flex items-center gap-4 text-lg lg:text-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Professional templates for every industry</span>
                </li>
                <li className="flex items-center gap-4 text-lg lg:text-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Time-saving automation tools</span>
                </li>
                <li className="flex items-center gap-4 text-lg lg:text-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Real-time engagement optimization</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-200/50">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-3">10K+</div>
                <div className="text-gray-600 font-medium text-lg">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-3">500K+</div>
                <div className="text-gray-600 font-medium text-lg">Posts Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-3">95%</div>
                <div className="text-gray-600 font-medium text-lg">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-3">24/7</div>
                <div className="text-gray-600 font-medium text-lg">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
