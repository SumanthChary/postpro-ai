import React from 'react';
import VideoPlayer from './video/VideoPlayer';
import FeaturedSection from './video/FeaturedSection';
const VideoShowcase = () => {
  const videoUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/demo.mp4";
  const thumbnailUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/Screenshot%20(583).png";
  return <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -mt-6 sm:-mt-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">See PostProAI in Action 🔥</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            Watch how PostProAI transforms ordinary posts into engagement magnets with professional precision
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} />
        </div>

        <FeaturedSection />
      </div>
    </section>;
};
export default VideoShowcase;