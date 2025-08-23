
import React, { memo } from 'react';
import VideoPlayer from './video/VideoPlayer';
import FeaturedSection from './video/FeaturedSection';
import { ResponsiveContainer } from '@/components/ui/responsive-container';

const VideoShowcase = memo(() => {
  const videoUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/demo.mp4";
  const thumbnailUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video/Screenshot%20(583).png";

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -mt-6 sm:-mt-8">
      <ResponsiveContainer size="xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 tracking-tight">
            See PostProAI in Action
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Watch how PostProAI transforms ordinary posts into engagement magnets with professional precision
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} />
        </div>

        <FeaturedSection />
      </ResponsiveContainer>
    </section>
  );
});

VideoShowcase.displayName = 'VideoShowcase';

export default VideoShowcase;
