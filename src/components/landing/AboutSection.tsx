
import { CheckCircleIcon, StarIcon, ZapIcon } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          About PostPro AI
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          AI-powered LinkedIn content enhancement that transforms your posts into engaging, viral-worthy content.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <StarIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">AI Enhancement</h3>
            <p className="text-sm text-gray-600">Smart algorithms improve your content for maximum engagement</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <ZapIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600">Get professional-quality posts in seconds</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
            <p className="text-sm text-gray-600">Increase your LinkedIn engagement significantly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
