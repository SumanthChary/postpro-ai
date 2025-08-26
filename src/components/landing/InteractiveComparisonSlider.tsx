import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSliderInteraction } from './hooks/useSliderInteraction';
import { cn } from '@/lib/utils';

const InteractiveComparisonSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    sliderPosition, 
    isDragging, 
    handleMouseDown, 
    handleKeyDown 
  } = useSliderInteraction(containerRef);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Before vs After
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Drag the slider to see the dramatic difference AI enhancement makes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            style={{ height: '400px' }}
          >
            {/* Before Card */}
            <div className="absolute inset-0 bg-gray-50 border border-gray-200">
              <div className="p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Marketing Team</div>
                    <div className="text-sm text-gray-500">2h ago</div>
                  </div>
                </div>
                
                <div className="flex-1 mb-6">
                  <p className="text-gray-700 font-normal text-base leading-relaxed">
                    Just launched our new product!
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <span>12 likes</span>
                    <span>3 comments</span>
                    <span>1 share</span>
                  </div>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div 
              className="absolute inset-0 bg-white border-2 border-[#118AB2]"
              style={{ 
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                transition: isDragging ? 'none' : 'clip-path 0.3s ease-out'
              }}
            >
              <div className="p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#118AB2] to-[#0B5D8C] mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">Marketing Team</div>
                    <div className="text-sm text-gray-500">2h ago</div>
                  </div>
                </div>
                
                <div className="flex-1 mb-6">
                  <p className="text-gray-700 font-medium text-base leading-relaxed">
                    🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. 
                    <br /><br />
                    What makes it special:
                    <br />✨ Cutting-edge technology
                    <br />💡 User-centric design  
                    <br />🎯 Solves real problems
                    <br /><br />
                    #ProductLaunch #Innovation #Tech #Startup #NewProduct
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-[#118AB2] text-sm font-medium">
                    <span>247 likes</span>
                    <span>43 comments</span>
                    <span>28 shares</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Track */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-300 z-10 pointer-events-none">
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#118AB2] rounded-full shadow-lg cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-110 z-20 pointer-events-auto"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sliderPosition}
                aria-label="Drag to compare before and after posts"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1 h-4 bg-white rounded-full mr-0.5"></div>
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {[25, 50, 75].map((position) => (
                <div 
                  key={position}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    Math.abs(sliderPosition - position) < 12.5 
                      ? "bg-[#118AB2]" 
                      : "bg-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium z-10">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium z-10">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveComparisonSlider;