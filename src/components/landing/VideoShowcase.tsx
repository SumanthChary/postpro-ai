
import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const videoUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video//Video%20Project%204.mp4";
  const thumbnailUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video//Screenshot%20(495).png";

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      
      const updateProgress = () => {
        if (videoRef.current) {
          const value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(value || 0);
        }
      };
      
      videoRef.current.addEventListener('timeupdate', updateProgress);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', updateProgress);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoadedData = () => {
    console.log("Video loaded successfully");
    setIsLoading(false);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.style.opacity = '1';
    }
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setVideoError(true);
    setIsLoading(false);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -mt-6 sm:-mt-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            See PostProAI in Action
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            Watch how PostProAI transforms ordinary posts into engagement magnets with professional precision
          </p>
        </div>
        
        {/* Featured On Section */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="text-center">
            <h3 className="text-sm sm:text-base text-gray-600 font-medium mb-4 sm:mb-6">Featured on:</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              <a 
                href="https://www.producthunt.com/posts/postproai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postproai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <img 
                  src="/lovable-uploads/684c15c2-5229-4fc4-8c77-9d0bf4e01603.png" 
                  alt="Product Hunt" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Product Hunt</span>
              </a>
              
              <a 
                href="https://tinylaun.ch/launch/3630" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <img 
                  src="/lovable-uploads/4fdb9d65-f05e-4aa2-944f-f35e970172ba.png" 
                  alt="Tiny Launch" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Tiny Launch</span>
              </a>
              
              <a 
                href="https://peerlist.io/sumanthdev/project/postpro-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <img 
                  src="/lovable-uploads/e61dd1bc-bee6-4f84-9cb2-8425f25f6a25.png" 
                  alt="Peerlist" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Peerlist</span>
              </a>
              
              <a 
                href="https://x.com/SumanthChary07/status/1936823509893665107" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <img 
                  src="/lovable-uploads/19a764a3-891b-42c4-a3b0-893290d0fff5.png" 
                  alt="X (Twitter)" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">X</span>
              </a>
              
              <a 
                href="https://www.listingcat.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <img 
                  src="/lovable-uploads/bccc4ccd-bed4-403a-a48f-fb618350c0e6.png" 
                  alt="Listing Cat" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Listing Cat</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden relative shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <AspectRatio ratio={16/9}>
              {isLoading && (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse absolute top-0 left-0 z-10" />
              )}
              {videoError && !isLoading && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center absolute top-0 left-0 z-10">
                  <p className="text-gray-600 text-sm sm:text-base">Video could not be loaded</p>
                </div>
              )}
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                poster={thumbnailUrl}
                onLoadedData={handleVideoLoadedData}
                onError={handleVideoError}
                muted={isMuted}
                preload="auto"
                style={{ opacity: isLoading ? 0 : 1 }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
            
            <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-2 sm:left-4 right-2 sm:right-4 z-10">
              <Progress value={progress} className="h-1 bg-white/30" />
            </div>
            
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center z-20">
              <Button 
                onClick={togglePlay} 
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
              >
                {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
              </Button>
              
              <Button 
                onClick={toggleMute} 
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
              >
                {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
