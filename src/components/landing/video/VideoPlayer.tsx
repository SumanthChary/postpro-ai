import React, { useState, useCallback, memo } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { OptimizedImage } from "@/components/ui/optimized-image";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer = memo(({ videoUrl, thumbnailUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  if (!isPlaying) {
    return (
      <Card className="overflow-hidden relative shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <AspectRatio ratio={16/9}>
          <div className="relative w-full h-full">
            <OptimizedImage 
              src={thumbnailUrl} 
              alt="PostPro AI video demo - See how to transform LinkedIn posts"
              className="w-full h-full"
              priority={true}
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
              <Button 
                onClick={handlePlay}
                size="lg"
                className="group w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-md hover:bg-white hover:scale-110 border-0 shadow-2xl transition-all duration-300"
                aria-label="Play video demo"
              >
                <Play size={24} className="sm:w-8 sm:h-8 text-gray-800 ml-1 group-hover:text-primary transition-colors" />
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
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </Card>
  );
});

export default VideoPlayer;