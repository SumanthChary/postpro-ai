
import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import VideoControls from './VideoControls';
import ProgressBar from './ProgressBar';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer = ({ videoUrl, thumbnailUrl }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      
      const updateProgress = () => {
        if (videoRef.current) {
          const value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(value || 0);
          setCurrentTime(videoRef.current.currentTime);
        }
      };

      const updateDuration = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      };
      
      videoRef.current.addEventListener('timeupdate', updateProgress);
      videoRef.current.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', updateProgress);
          videoRef.current.removeEventListener('loadedmetadata', updateDuration);
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

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      }
    }
  };

  const seekVideo = (percentage: number) => {
    if (videoRef.current) {
      const newTime = percentage * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    setControlsTimeout(timeout);
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden relative shadow-2xl border-0 bg-white/80 backdrop-blur-sm group">
      <AspectRatio ratio={16/9}>
        <div 
          className="relative w-full h-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => !isPlaying && setShowControls(true)}
        >
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
            onClick={togglePlay}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Enhanced Controls Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={togglePlay}
                  size="lg"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
                >
                  <Play size={24} className="sm:w-8 sm:h-8 text-white ml-1" />
                </Button>
              </div>
            )}

            <ProgressBar 
              progress={progress}
              onSeek={seekVideo}
            />
            
            <VideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onToggleFullscreen={toggleFullscreen}
              onSkipTime={skipTime}
              formatTime={formatTime}
            />
          </div>
        </div>
      </AspectRatio>
    </Card>
  );
};

export default VideoPlayer;
