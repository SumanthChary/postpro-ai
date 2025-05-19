
import { Rocket, Star, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="px-4 py-2 bg-bright-teal/10 rounded-full text-sm font-medium text-bright-teal inline-block mb-3">
            About PostPro AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-custom-text">
            We're dedicated to empowering professionals and businesses to create engaging, 
            impactful social media content through innovative AI technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-electric-purple/10 p-3 rounded-xl inline-block mb-5">
              <Rocket className="h-8 w-8 text-electric-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Advanced AI Technology</h3>
            <p className="text-custom-text">
              Our AI algorithms are trained on millions of high-performing posts to understand what drives engagement across different platforms and industries.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-bright-teal/10 p-3 rounded-xl inline-block mb-5">
              <Star className="h-8 w-8 text-bright-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Professional Templates</h3>
            <p className="text-custom-text">
              Access industry-specific templates crafted by marketing experts that help you maintain consistent brand voice and messaging.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-electric-purple/10 p-3 rounded-xl inline-block mb-5">
              <Zap className="h-8 w-8 text-electric-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Time-Saving Automation</h3>
            <p className="text-custom-text">
              Transform your content in seconds rather than hours. Our AI handles the details so you can focus on strategy and big-picture thinking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
