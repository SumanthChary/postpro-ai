
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ScheduleShareButton = ({ content = "Your content here" }: { content?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(new Date());
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const handleSchedule = async () => {
    if (!scheduleDateTime) {
      toast({
        title: "Error",
        description: "Please select a date and time to schedule!",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);

    try {
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('schedule-share', {
        body: {
          time: scheduleDateTime.toISOString(),
          content: content,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Content scheduled successfully!",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error scheduling content:', error);
      toast({
        title: "Error",
        description: "Failed to schedule content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Schedule & Auto-Share
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Schedule Share</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Date and Time:</label>
              <DateTimePicker
                onChange={setScheduleDateTime}
                value={scheduleDateTime}
                minDate={new Date()} // Prevent selecting past dates
                className="w-full"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                disabled={isScheduling}
              >
                Cancel
              </button>
              <button 
                onClick={handleSchedule}
                disabled={isScheduling}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isScheduling ? "Scheduling..." : "Schedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleShareButton;
