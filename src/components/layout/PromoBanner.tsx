import { useEffect, useState } from 'react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="bg-white text-black py-3 px-4 text-center relative border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
        <p className="font-medium text-sm">
          <span className="font-semibold">Limited Time:</span> <span className="text-green-600">40% OFF</span> All Premium Plans
          <span className="hidden sm:inline"> • Trusted by 2,847+ professionals</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  ) : null;
}
