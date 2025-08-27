
const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-4 rounded-2xl bg-gray-100 text-gray-900 rounded-bl-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span className="text-sm font-medium opacity-80">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
