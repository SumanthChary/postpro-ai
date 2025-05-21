
import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  
  // Supabase hosted video URL - using the alternative URL provided
  const videoUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video//Video%20Project%204%20(1).clipchamp";
  // Supabase hosted thumbnail URL
  const thumbnailUrl = "https://rskzizedzagohmvyhuyu.supabase.co/storage/v1/object/public/video//Screenshot%20(495).png";

  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Initialize video after component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
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
    // Ensure video is visible
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
          <Card className="overflow-hidden relative">
            <AspectRatio ratio={16/9}>
              {isLoading && (
                <div className="w-full h-full bg-gray-200 animate-pulse absolute top-0 left-0 z-10" />
              )}
              {videoError && !isLoading && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center absolute top-0 left-0 z-10">
                  <p className="text-gray-600">Video could not be loaded</p>
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
                preload="metadata"
                style={{ opacity: isLoading ? 0 : 1 }}
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
              <Button 
                onClick={togglePlay} 
                variant="secondary"
                className="bg-white/80 hover:bg-white"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              
              <Button 
                onClick={toggleMute} 
                variant="secondary"
                className="bg-white/80 hover:bg-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
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
