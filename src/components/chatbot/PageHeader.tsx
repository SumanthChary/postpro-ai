
import { Sparkles } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="text-center space-y-2 sm:space-y-3">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'rgba(57,107,255,1)' }} />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          AI Assistant
        </h1>
      </div>
      <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
        Get expert advice on social media strategy, content creation, and engagement tactics
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 px-2">
        <span className="flex items-center gap-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
          Content Strategy
        </span>
        <span className="flex items-center gap-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
          Hashtag Research
        </span>
        <span className="flex items-center gap-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
          Engagement Tips
        </span>
      </div>
    </div>
  );
};

export default PageHeader;
