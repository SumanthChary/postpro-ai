import { MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const LiveSupportBadge = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [responseTime, setResponseTime] = useState("< 2 hours");

  useEffect(() => {
    // Simulate realistic support availability
    const updateStatus = () => {
      const hour = new Date().getHours();
      const isBusinessHours = hour >= 9 && hour <= 17; // 9 AM to 5 PM
      setIsOnline(isBusinessHours || Math.random() > 0.3);
      setResponseTime(isBusinessHours ? "< 30 min" : "< 2 hours");
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 shadow-sm">
      <div className="relative">
        <MessageCircle className="w-4 h-4 text-blue-600" />
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
      </div>
      <div className="text-xs font-medium text-gray-700">
        <span className="text-blue-600">Live Support</span>
        <span className="text-gray-500 ml-1">• {responseTime}</span>
      </div>
    </div>
  );
};

export default LiveSupportBadge;