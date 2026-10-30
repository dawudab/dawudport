
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
  const nameButtonFont = isHoveringName ? "font-['Cairo']" : "font-['JetBrains_Mono']";

  return (
    <div className="fixed bottom-0 left-0 w-full h-[42px] bg-gradient-to-r from-zinc-950/80 via-zinc-950/65 to-zinc-950/80 backdrop-blur-[36px] z-[100] border-t border-white/[0.18] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_-10px_35px_rgba(0,0,0,0.6)] flex justify-between items-center">
      {/* Desktop Name Button */}
      <div className="hidden md:flex items-center px-4 shrink-0">
        <button
          type="button"
          className={`inline-flex items-center gap-2 text-xs font-medium text-zinc-100 cursor-pointer bg-white/[0.08] hover:bg-white/[0.16] border border-white/25 hover:border-white/40 px-3.5 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.35)] active:scale-95 ${nameButtonFont}`}
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
          onClick={() => onOpenWindow(WindowId.INFO)}
        >
          <span className="text-zinc-400 font-['JetBrains_Mono']">τ</span>
          <span className="tracking-tight">{nameButtonText}</span>
        </button>
      </div>

      <div className="hidden md:flex min-w-0 flex-1 items-center overflow-hidden border-x border-white/[0.10] h-full">
        <WorldClock />
      </div>

      {/* Mobile Name Button & Date */}
      <div className="md:hidden flex items-center justify-between w-full h-full px-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium text-zinc-100 bg-white/[0.08] active:bg-white/[0.16] border border-white/25 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
          onClick={() => onOpenWindow(WindowId.INFO)}
        >
          <span className="text-zinc-400">τ</span>
          <span>{NAME_MOBILE}</span>
        </button>

        <div className="text-zinc-300 text-xs font-['JetBrains_Mono'] tabular-nums tracking-tight whitespace-nowrap bg-white/[0.05] border border-white/[0.10] px-2.5 py-1 rounded-lg">
          {currentDate}
        </div>
      </div>

      {/* Desktop time display - right aligned */}
      <div className="hidden md:flex items-center h-full px-4">
        <div className="text-zinc-300 text-xs font-['JetBrains_Mono'] tabular-nums tracking-tight whitespace-nowrap bg-white/[0.05] border border-white/[0.10] px-3 py-1 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          {currentDate}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
