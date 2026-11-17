import React, { useState, useEffect } from 'react';

const WorldClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateClock();
    const intervalId = setInterval(updateClock, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      id="world-clock-container"
      className="x11-inset bg-[#e5e7eb] px-2 py-1 font-mono-body text-[11px] sm:text-xs text-[#111827] tabular-nums whitespace-nowrap shrink-0"
      title="System Clock"
    >
      {currentTime}
    </div>
  );
};

export default WorldClock;