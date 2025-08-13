import { useEffect, useState } from 'react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 text-center relative">
      <div className="container mx-auto flex items-center justify-center">
        <span className="animate-pulse mr-2">🎉</span>
        <p className="font-medium">
          Limited Time Offer: <span className="font-bold">40% OFF</span> on All Plans!
          <span className="hidden sm:inline"> Don't Miss Out on Lifetime Deals!</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  ) : null;
}
