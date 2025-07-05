
import { MessageCircle } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-3">
        <div className="p-2 rounded-xl bg-blue-50">
          <MessageCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          AI Assistant
        </h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Get expert advice on social media strategy, content creation, and engagement tactics
      </p>
    </div>
  );
};

export default PageHeader;
