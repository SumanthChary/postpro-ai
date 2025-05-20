
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

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
          <a href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" target="_blank">
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=903202&theme=light&t=1743695250761" 
              alt="PostProAI - PostPro&#0032;AI&#0044;&#0032;Smart&#0032;AI&#0045;Powered&#0032;Post&#0032;Enhancement | Product Hunt" 
              style={{ width: '250px', height: '54px' }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              {isLoading && (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
              <video 
                className="w-full h-full absolute top-0 left-0 object-cover"
                controls
                preload="metadata"
                poster="/demo-thumbnail.jpg"
                onLoadedData={() => setIsLoading(false)}
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
