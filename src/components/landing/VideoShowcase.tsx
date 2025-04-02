
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          See PostProAI in Action
        </h2>
        
        {/* Product Hunt Button */}
        <div className="flex justify-center mb-8">
          <a
            href="https://www.producthunt.com/posts/postpro-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#FF6154] text-white font-semibold rounded-md hover:bg-[#FF6154]/90 transition-colors shadow-md"
          >
            <img 
              src="/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png" 
              alt="Product Hunt" 
              className="h-5 mr-2" 
            />
            Support us on Product Hunt
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
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
