import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the props for the component
interface ComponentComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
  initialPosition?: number;
}

export const ComponentComparisonSlider = React.forwardRef<
  HTMLDivElement,
  ComponentComparisonSliderProps
>(
  (
    {
      className,
      leftComponent,
      rightComponent,
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    // State to manage slider position (0 to 100)
    const [sliderPosition, setSliderPosition] = React.useState(initialPosition);
    // State to track if the user is currently dragging the handle
    const [isDragging, setIsDragging] = React.useState(false);
    // Ref for the container element to calculate relative cursor position
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Function to handle slider movement based on horizontal position
    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let newPosition = (x / rect.width) * 100;

      // Clamp the position between 0 and 100
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    
    // Handlers for starting and stopping the drag interaction
    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
    };
    const handleInteractionEnd = () => {
      setIsDragging(false);
    };

    // Effect to add and remove global event listeners for dragging
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("mouseup", handleInteractionEnd);
        document.addEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = 'ew-resize';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.cursor = '';
        document.body.style.touchAction = '';
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseup", handleInteractionEnd);
        document.removeEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = '';
        document.body.style.touchAction = '';
      };
    }, [isDragging]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden select-none group",
          className
        )}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        {...props}
      >
        {/* Right Component (bottom layer) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-gray-50">
          {rightComponent}
        </div>
        
        {/* Left Component (top layer, clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            {leftComponent}
          </div>
        </div>

        {/* Slider Handle and Divider */}
        <div
          className="absolute top-0 h-full w-1 cursor-ew-resize z-10"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          {/* Divider Line */}
          <div className="absolute inset-y-0 w-1 bg-white/80 backdrop-blur-sm"></div>
          
          {/* Handle */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-xl backdrop-blur-md",
              "transition-all duration-200 ease-out",
              "group-hover:scale-105 active:scale-95",
              isDragging && "scale-105 shadow-2xl shadow-blue-500/50"
            )}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            aria-label="Component comparison slider"
          >
            <div className="flex items-center text-blue-600">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-md" />
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ComponentComparisonSlider.displayName = "ComponentComparisonSlider";