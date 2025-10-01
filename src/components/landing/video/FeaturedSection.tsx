import React from 'react';
import { OptimizedImage } from "@/components/ui/optimized-image";
import indieHackersLogo from '@/assets/indiehackers-logo.png';
import tinyStartupsLogo from '@/assets/tinystartups-logo.webp';

const FeaturedSection = () => {
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <h3 className="text-sm sm:text-base text-gray-600 font-medium mb-4 sm:mb-6">Featured on:</h3>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          <a 
            href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/684c15c2-5229-4fc4-8c77-9d0bf4e01603.png" 
              alt="Product Hunt" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Product Hunt</span>
          </a>
          
          <a 
            href="https://tinylaun.ch/launch/3630" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/4fdb9d65-f05e-4aa2-944f-f35e970172ba.png" 
              alt="Tiny Launch" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Tiny Launch</span>
          </a>
          
          <a 
            href="https://peerlist.io/sumanthdev/project/postpro-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/e61dd1bc-bee6-4f84-9cb2-8425f25f6a25.png" 
              alt="Peerlist" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Peerlist</span>
          </a>
          
          <a 
            href="https://x.com/SumanthChary07/status/1936823509893665107" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/19a764a3-891b-42c4-a3b0-893290d0fff5.png" 
              alt="X (Twitter)" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">X</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/company/106810929" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/linkedin-logo.png" 
              alt="LinkedIn" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">LinkedIn</span>
          </a>
          
          <a 
            href="https://whop.com/postpro-ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <OptimizedImage 
              src="/lovable-uploads/whop-new-logo.png" 
              alt="Whop" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Whop</span>
          </a>

          <a 
            href="https://www.indiehackers.com/product/postpro-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200"
          >
            <img 
              src={indieHackersLogo} 
              alt="IndieHackers" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">IndieHackers</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50">
            <img 
              src={tinyStartupsLogo} 
              alt="TinyStartups" 
              className="h-4 sm:h-5 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
