
import React, { useRef } from 'react';

interface ProgressBarProps {
  progress: number;
  onSeek: (percentage: number) => void;
}

const ProgressBar = ({ progress, onSeek }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      onSeek(pos);
    }
  };

  return (
    <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-4 right-2 sm:right-4">
      <div 
        ref={progressRef}
        className="h-2 bg-white/30 rounded-full cursor-pointer group/progress"
        onClick={seekVideo}
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-150 group-hover/progress:bg-blue-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
