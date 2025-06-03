
import { Card } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 px-2">
            Before vs After
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            See the dramatic difference AI enhancement makes to your social media posts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <XIcon className="w-5 sm:w-6 h-5 sm:h-6 text-red-600 mr-3" />
              <h3 className="text-xl sm:text-2xl font-semibold text-red-900">Before Enhancement</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/80 p-3 sm:p-4 rounded-lg border border-red-200">
                <p className="text-gray-700 italic text-sm sm:text-base">"Just launched our new product!"</p>
              </div>
              <ul className="space-y-2 text-red-800 text-sm sm:text-base">
                <li className="flex items-center">
                  <XIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>No engaging hooks</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Missing hashtags</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Low engagement potential</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <CheckIcon className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 mr-3" />
              <h3 className="text-xl sm:text-2xl font-semibold text-green-900">After Enhancement</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/80 p-3 sm:p-4 rounded-lg border border-green-200">
                <p className="text-gray-700 text-sm sm:text-base">"🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech"</p>
              </div>
              <ul className="space-y-2 text-green-800 text-sm sm:text-base">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Engaging emojis & hooks</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Strategic hashtags</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>High engagement potential</span>
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
