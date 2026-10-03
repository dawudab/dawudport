
import React, { useState, useEffect } from 'react';
import { WindowId } from '../types';
import { NAME_ENGLISH, NAME_ARABIC, NAME_MOBILE } from '@/constants';
import WorldClock from './WorldClock';

interface StatusBarProps {
  onOpenWindow: (windowId: WindowId) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onOpenWindow }) => {
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set the current date on component mount
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      // Format as "Month Day, Year" (e.g., "June 10, 2025")
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate = now.toLocaleDateString('en-US', options);
      setCurrentDate(formattedDate);
    };

    updateDate();
    // Update date at midnight to handle day changes
    const now = new Date();
    const msUntilMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day
      0, 0, 0, 0 // Midnight
    ).getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      updateDate();
      // Set up daily updates after the first midnight update
      const dailyTimer = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyTimer);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  useEffect(() => {
    // Basic effect for potential future use if needed, e.g., for other dynamic elements.
    // Currently, only hover state is managed locally.
    const handleResize = () => {
      // Example: could set a general mobile state if needed for other elements not covered by Tailwind.
      // For now, Tailwind's responsive prefixes (md:) handle the name button variants.
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nameButtonText = isHoveringName ? NAME_ARABIC : NAME_ENGLISH;
  const nameButtonFont = isHoveringName ? "font-['Cairo']" : "font-['Orbitron']";

  return (
    <div className="fixed bottom-0 left-0 w-full h-[30px] bg-black/80 backdrop-blur-md z-[100] border-t border-gray-700 flex justify-between items-center">
      {/* Desktop Name Button */}
      <div className="hidden md:block px-4 min-w-[260px]">
        <button
          className={`relative text-[0.9rem] font-bold text-[#00ff41] text-shadow shadow-[#00ff41]/50 cursor-pointer border border-[#00ff41] px-2 py-0.5 rounded text-center transition-colors duration-300 ease-in-out hover:bg-[#00ff41]/10 ${nameButtonFont}`}
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
          onClick={() => onOpenWindow(WindowId.INFO)}
        >
          {nameButtonText}
        </button>
      </div>

      <div className="hidden md:flex min-w-0 flex-1 items-center overflow-hidden">
        <WorldClock />
      </div>

      {/* Mobile Name Button */}
      <div className="md:hidden flex items-center h-full">
        <div className="flex items-center h-full cursor-pointer px-3" onClick={() => onOpenWindow(WindowId.INFO)}>
          <div className="name-button text-sm font-['Orbitron'] text-[#00ff41] border border-[#00ff41] px-2 py-0.5 rounded">
            {NAME_MOBILE}
          </div>
        </div>

        {/* Date display for mobile */}
        <div className="ml-auto px-3 h-full flex items-center">
          <div className="text-[#00ff41] text-sm font-['Orbitron'] font-medium whitespace-nowrap">
            {currentDate}
          </div>
        </div>
      </div>

      {/* Desktop time display - right aligned */}
      <div className="hidden md:flex items-center h-full px-4">
        <div className="text-[#00ff41] text-sm font-['Orbitron'] font-medium whitespace-nowrap">
          {currentDate}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
