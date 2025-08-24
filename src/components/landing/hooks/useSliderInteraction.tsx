import { useState, useCallback, useEffect, RefObject } from 'react';

interface UseSliderInteractionReturn {
  sliderPosition: number;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const useSliderInteraction = (
  containerRef: RefObject<HTMLDivElement>
): UseSliderInteractionReturn => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const snapPositions = [25, 50, 75];
  const snapThreshold = 12.5;

  const getPositionFromEvent = useCallback((clientX: number): number => {
    if (!containerRef.current) return 50;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    return Math.max(0, Math.min(100, percentage));
  }, [containerRef]);

  const snapToNearestPosition = useCallback((position: number): number => {
    for (const snapPos of snapPositions) {
      if (Math.abs(position - snapPos) < snapThreshold) {
        return snapPos;
      }
    }
    return position;
  }, [snapPositions, snapThreshold]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const newPosition = getPositionFromEvent(e.clientX);
    setSliderPosition(newPosition);
  }, [isDragging, getPositionFromEvent]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setSliderPosition(prev => snapToNearestPosition(prev));
  }, [isDragging, snapToNearestPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newPosition = getPositionFromEvent(touch.clientX);
    setSliderPosition(newPosition);
  }, [isDragging, getPositionFromEvent]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setSliderPosition(prev => snapToNearestPosition(prev));
  }, [isDragging, snapToNearestPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newPosition = sliderPosition;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newPosition = Math.max(0, sliderPosition - 5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newPosition = Math.min(100, sliderPosition + 5);
        break;
      case 'Home':
        e.preventDefault();
        newPosition = 0;
        break;
      case 'End':
        e.preventDefault();
        newPosition = 100;
        break;
      default:
        return;
    }
    
    setSliderPosition(snapToNearestPosition(newPosition));
  }, [sliderPosition, snapToNearestPosition]);

  // Event listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleTouchEnd();

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Touch event listeners for the slider handle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sliderHandle = container.querySelector('[role="slider"]') as HTMLElement;
    if (!sliderHandle) return;

    sliderHandle.addEventListener('touchstart', handleTouchStart as any, { passive: false });

    return () => {
      sliderHandle.removeEventListener('touchstart', handleTouchStart as any);
    };
  }, [handleTouchStart, containerRef]);

  return {
    sliderPosition,
    isDragging,
    handleMouseDown,
    handleKeyDown,
  };
};