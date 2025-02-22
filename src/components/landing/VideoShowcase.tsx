
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          See PostProAI in Action
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              {isLoading && (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
              <iframe 
                src="https://player.vimeo.com/video/1059294138?h=3fede10115" 
                className="w-full h-full absolute top-0 left-0"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </AspectRatio>
          </Card>
          <p className="text-center mt-6 text-custom-text text-lg">
            Watch how PostProAI transforms ordinary posts into engagement magnets
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
