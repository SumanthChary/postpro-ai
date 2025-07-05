
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onSkipTime: (seconds: number) => void;
  formatTime: (time: number) => string;
}

const VideoControls = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onToggleFullscreen,
  onSkipTime,
  formatTime
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button 
          onClick={onTogglePlay} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
        >
          {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
        </Button>
        
        <Button 
          onClick={() => onSkipTime(-10)} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2 hidden sm:flex"
        >
          <SkipBack size={16} />
        </Button>
        
        <Button 
          onClick={() => onSkipTime(10)} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2 hidden sm:flex"
        >
          <SkipForward size={16} />
        </Button>
        
        <Button 
          onClick={onToggleMute} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
        >
          {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
        </Button>
        
        <div className="text-white text-xs sm:text-sm font-medium hidden sm:block">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          onClick={onToggleFullscreen} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
        >
          <Maximize size={16} className="sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
};

export default VideoControls;
