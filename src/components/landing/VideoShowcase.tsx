
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
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="PostProAI Analytics Boost Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-0"
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
