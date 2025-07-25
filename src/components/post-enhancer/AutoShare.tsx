import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";

import type { AutoShareProps, ScheduleData } from '@/types/postEnhancer';

export interface ScheduleData {
  post: string;
  platforms: string[];
  scheduledTime: Date;
}

export const AutoShare = ({ post, onSchedule }: AutoShareProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '📊' },
    { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
    // Add more platforms as needed
  ];

  const handleSchedule = async () => {
    if (!selectedDate || selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select date and at least one platform",
        variant: "destructive"
      });
      return;
    }

    setIsScheduling(true);
    try {
      await onSchedule({
        post,
        platforms: selectedPlatforms,
        scheduledTime: selectedDate
      });
      toast({
        title: "Success",
        description: "Post scheduled successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Schedule Your Post</div>
      
      {/* Platform Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Platforms</label>
        <div className="flex gap-2">
          {platforms.map(platform => (
            <Button
              key={platform.id}
              variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
              onClick={() => togglePlatform(platform.id)}
              className="gap-2"
            >
              <span>{platform.icon}</span>
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Date & Time</label>
        <div className="flex gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <Input
            type="time"
            value={selectedDate?.toLocaleTimeString() || ''}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const newDate = selectedDate || new Date();
              newDate.setHours(parseInt(hours), parseInt(minutes));
              setSelectedDate(new Date(newDate));
            }}
            className="w-32"
          />
        </div>
      </div>

      {/* Schedule Button */}
      <Button
        onClick={handleSchedule}
        disabled={isScheduling || !selectedDate || selectedPlatforms.length === 0}
        className="w-full"
      >
        {isScheduling ? "Scheduling..." : "Schedule Post"}
      </Button>
    </div>
  );
};
