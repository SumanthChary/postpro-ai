
import { Card } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 lg:mb-8 tracking-tight">
            Before vs After
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-4">
            See the dramatic difference AI enhancement makes to your social media posts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Card className="p-8 lg:p-10 bg-gradient-to-br from-red-50/80 to-red-100/60 border border-red-200/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="p-3 bg-red-100/80 rounded-xl mr-4">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-red-900">Before Enhancement</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-white/90 p-4 lg:p-6 rounded-xl border border-red-200/50 shadow-sm">
                <p className="text-gray-700 italic text-base lg:text-lg font-medium">"Just launched our new product!"</p>
              </div>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-center text-base lg:text-lg">
                  <XIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">No engaging hooks</span>
                </li>
                <li className="flex items-center text-base lg:text-lg">
                  <XIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">Missing hashtags</span>
                </li>
                <li className="flex items-center text-base lg:text-lg">
                  <XIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">Low engagement potential</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-8 lg:p-10 bg-gradient-to-br from-green-50/80 to-emerald-100/60 border border-green-200/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="p-3 bg-green-100/80 rounded-xl mr-4">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-green-900">After Enhancement</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-white/90 p-4 lg:p-6 rounded-xl border border-green-200/50 shadow-sm">
                <p className="text-gray-700 text-base lg:text-lg font-medium">"🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech"</p>
              </div>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-center text-base lg:text-lg">
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">Engaging emojis & hooks</span>
                </li>
                <li className="flex items-center text-base lg:text-lg">
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">Strategic hashtags</span>
                </li>
                <li className="flex items-center text-base lg:text-lg">
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">High engagement potential</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
