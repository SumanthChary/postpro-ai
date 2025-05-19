
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-light-lavender/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Sparkles className="h-6 w-6 text-electric-purple" />
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center">
            See PostProAI in Action
          </h2>
        </div>
        
        {/* Product Hunt Button */}
        <div className="flex justify-center mb-12">
          <a 
            href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" 
            target="_blank"
            className="transition-transform hover:scale-105 duration-300"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=903202&theme=light&t=1743695250761" 
              alt="PostProAI - Smart AI-Powered Post Enhancement | Product Hunt" 
              style={{ width: '250px', height: '54px' }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-xl border-0 rounded-2xl">
            <AspectRatio ratio={16/9}>
              {isLoading && (
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <p className="text-gray-500">Loading video...</p>
                </div>
              )}
              <iframe 
                src="https://player.vimeo.com/video/1059294138?h=3fede10115" 
                className="w-full h-full absolute top-0 left-0 rounded-2xl"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </AspectRatio>
          </Card>
          <div className="text-center mt-8 flex flex-col items-center">
            <p className="text-custom-text text-lg mb-3">
              Watch how PostProAI transforms ordinary posts into engagement magnets
            </p>
            <div className="flex items-center gap-1 text-electric-purple">
              <span className="text-sm font-medium">4.9/5</span>
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#8E44AD" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-sm font-medium ml-1 text-gray-500">by 238 users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
