import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { PerformanceImage } from "@/components/ui/performance-image";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer = ({ videoUrl, thumbnailUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (!isPlaying) {
    return (
      <Card className="overflow-hidden relative shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <AspectRatio ratio={16/9}>
          <div className="relative w-full h-full">
            <PerformanceImage 
              src={thumbnailUrl} 
              alt="Video thumbnail"
              className="w-full h-full"
              priority={true}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button 
                onClick={handlePlay}
                size="lg"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
              >
                <Play size={24} className="sm:w-8 sm:h-8 text-white ml-1" />
              </Button>
            </div>
          </div>
        </AspectRatio>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden relative shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <AspectRatio ratio={16/9}>
        <video 
          className="w-full h-full object-cover"
          controls
          autoPlay
          poster={thumbnailUrl}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </Card>
  );
};

export default VideoPlayer;