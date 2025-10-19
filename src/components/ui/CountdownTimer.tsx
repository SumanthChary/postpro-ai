import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 22
  });

  useEffect(() => {
    const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 22 * 1000;
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex items-center space-x-3 font-mono ${className}`}>
      <div className="text-center">
        <span className="text-4xl font-extrabold text-red-600">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="block text-xs font-sans uppercase tracking-wide text-gray-500">Days</span>
      </div>
      <div className="text-3xl font-extrabold text-red-600">:</div>
      <div className="text-center">
        <span className="text-4xl font-extrabold text-red-600">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="block text-xs font-sans uppercase tracking-wide text-gray-500">Hours</span>
      </div>
      <div className="text-3xl font-extrabold text-red-600">:</div>
      <div className="text-center">
        <span className="text-4xl font-extrabold text-red-600">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="block text-xs font-sans uppercase tracking-wide text-gray-500">Mins</span>
      </div>
      <div className="text-3xl font-extrabold text-red-600">:</div>
      <div className="text-center">
        <span className="text-4xl font-extrabold text-red-600">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="block text-xs font-sans uppercase tracking-wide text-gray-500">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;