
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

const VideoShowcase = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          See PostProAI in Action
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <video
                controls
                className="w-full h-full object-cover"
                poster="/placeholder.svg"
              >
                <source src="/path-to-your-video.mp4" type="video/mp4" />
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
