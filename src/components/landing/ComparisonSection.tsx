
import { Card } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight">
            The Transformation Process
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            From basic posts to engagement magnets - see exactly what changes
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Card className="p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-red-50/90 to-red-100/70 border border-red-200/60 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-5 lg:mb-6">
              <div className="p-2 sm:p-2.5 bg-red-500/10 rounded-lg mr-3 sm:mr-4">
                <XIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-900">Typical Post</h3>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-white/95 p-4 sm:p-5 rounded-lg border border-red-200/60 shadow-sm">
                <p className="text-gray-700 italic text-sm sm:text-base font-medium">"Just launched our new product! Check it out."</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-3 pt-3 border-t">
                  <span>👍 8 likes</span>
                  <span>💬 1 comment</span>
                  <span>🔄 0 shares</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800 text-sm">Common Issues:</h4>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start text-sm sm:text-base">
                    <XIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Generic, forgettable message</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <XIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No emotional connection</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <XIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Missing social proof</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <XIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Poor hashtag strategy</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50/90 to-emerald-100/70 border border-green-200/60 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-5 lg:mb-6">
              <div className="p-2 sm:p-2.5 bg-green-500/10 rounded-lg mr-3 sm:mr-4">
                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-900">PostPro Enhanced</h3>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-white/95 p-4 sm:p-5 rounded-lg border border-green-200/60 shadow-sm">
                <p className="text-gray-700 text-sm sm:text-base font-medium">"🚀 After 6 months of development and feedback from 500+ beta users, our game-changing productivity tool is finally here! Built specifically for remote teams struggling with collaboration. Early adopters are seeing 40% faster project completion. Ready to transform your workflow? #ProductLaunch #ProductivityHack #RemoteWork #TeamCollaboration"</p>
                <div className="flex gap-4 text-xs text-green-700 font-semibold mt-3 pt-3 border-t">
                  <span>👍 847 likes</span>
                  <span>💬 93 comments</span>
                  <span>🔄 156 shares</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800 text-sm">Enhancement Features:</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start text-sm sm:text-base">
                    <CheckIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Compelling storytelling with metrics</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <CheckIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Clear target audience</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <CheckIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Social proof & credibility</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <CheckIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Strategic hashtag placement</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            <span className="text-green-600 font-bold">10,000%+</span> average engagement increase with our AI enhancement
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
