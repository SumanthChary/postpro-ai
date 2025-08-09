import React, { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const DemoVideo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Video Preview */}
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/demo-preview.jpg"
            alt="Watch Demo"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
            <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-blue-600 ml-1" />
            </div>
          </div>
        </div>
        
        {/* Feature Highlights */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] grid grid-cols-3 gap-4">
          {[
            { label: 'AI-Powered', value: '100%' },
            { label: 'Time Saved', value: '4hrs/day' },
            { label: 'Engagement ↑', value: '147%' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50"
            >
              <div className="text-lg font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative pt-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/your-video-id?autoplay=1"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Actions */}
      <div className="mt-20 text-center">
        <Button
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg shadow-blue-500/25 hover:shadow-blue-500/35"
        >
          Try It Now
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="mt-4 text-gray-600">
          No credit card required • Free plan available
        </p>
      </div>
    </div>
  );
};
