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
              alt="PostPro AI demo video thumbnail showing LinkedIn post enhancement interface with before and after comparison"
              className="w-full h-full"
              priority={true}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button 
                onClick={handlePlay}
                size="lg"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
                aria-label="Play demo video showing PostPro AI features"
              >
                <Play size={24} className="sm:w-8 sm:h-8 text-white ml-1" aria-hidden="true" />
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
          aria-label="PostPro AI demo video showcasing LinkedIn post enhancement features"
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" label="English captions" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </Card>
  );
};

export default VideoPlayer;