
import { Card } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Before vs After
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Experience the 10-credit premium transformation that turns ordinary posts into viral content
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-red-50/80 to-red-100/60 border border-red-200/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="p-2 sm:p-3 bg-red-100/80 rounded-xl mr-3 sm:mr-4">
                <XIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-900">Before Enhancement</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/90 p-3 sm:p-4 lg:p-6 rounded-xl border border-red-200/50 shadow-sm">
                <p className="text-gray-700 italic text-sm sm:text-base lg:text-lg font-medium">"Closed a big deal today"</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-red-800">
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <XIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">No emotional hooks</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <XIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Zero storytelling</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <XIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Missing social proof</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <XIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">No engagement strategy</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-green-50/80 to-emerald-100/60 border border-green-200/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="p-2 sm:p-3 bg-green-100/80 rounded-xl mr-3 sm:mr-4">
                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-900">After Enhancement</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/90 p-3 sm:p-4 lg:p-6 rounded-xl border border-green-200/50 shadow-sm">
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-medium">"🔥 MASSIVE WIN: Just closed our biggest deal of the year - $250K! 6 months of relationship building, 47 calls, and countless coffee meetings finally paid off. To everyone in sales grinding through rejections: Your YES is coming! Drop a 💪 if you're pushing through challenges! #SalesWin #Persistence #NeverGiveUp #SalesLife #Motivation"</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-green-800">
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Specific revenue numbers</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Inspiring story arc</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Community engagement CTA</span>
                </li>
                <li className="flex items-center text-sm sm:text-base lg:text-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium">Premium hashtag strategy</span>
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
