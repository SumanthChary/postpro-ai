import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const ScheduleShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(new Date());

  const handleSchedule = async () => {
    if (!scheduleDateTime) {
      alert("Please select a date and time to schedule!");
      return;
    }

    // Call backend API to save the schedule
    const response = await fetch("/api/schedule-share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: scheduleDateTime.toISOString(),
        content: "Your content here", // Replace with actual content
      }),
    });

    if (response.ok) {
      alert("Content scheduled successfully!");
      setIsModalOpen(false);
    } else {
      alert("Failed to schedule content.");
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Schedule & Auto-Share</button>
      {isModalOpen && (
        <div className="modal">
          <h2>Schedule Share</h2>
          <DateTimePicker
            onChange={setScheduleDateTime}
            value={scheduleDateTime}
            minDate={new Date()} // Prevent selecting past dates
          />
          <button onClick={handleSchedule}>Schedule</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ScheduleShareButton;