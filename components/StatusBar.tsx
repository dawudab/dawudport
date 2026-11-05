import React, { useState, useEffect } from 'react';
import { WindowId, ThemeMode } from '../types';
import { NAME_ENGLISH, NAME_ARABIC, NAME_MOBILE } from '@/constants';

interface StatusBarProps {
  onOpenWindow: (windowId: WindowId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onTrigger3DPulse: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  onOpenWindow,
  theme,
  onToggleTheme,
  onTrigger3DPulse,
}) => {
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDate();
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0).getTime() -
      now.getTime();

    const midnightTimer = setTimeout(() => {
      updateDate();
      const dailyTimer = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyTimer);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  const nameButtonText = isHoveringName ? NAME_ARABIC : NAME_ENGLISH;
  const nameButtonFont = isHoveringName ? "font-['Cairo']" : "font-['JetBrains_Mono']";
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[46px] backdrop-blur-[36px] z-[100] border-t transition-colors duration-300 flex justify-between items-center px-3 md:px-5 ${
        isDark
          ? 'bg-gradient-to-r from-zinc-950/80 via-zinc-950/65 to-zinc-950/80 border-white/[0.18] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_-10px_35px_rgba(0,0,0,0.6)]'
          : 'bg-gradient-to-r from-white/80 via-slate-50/75 to-white/80 border-slate-900/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_-8px_28px_rgba(15,23,42,0.08)]'
      }`}
    >
      {/* Left: Dawud Bio Button & Interactive 3D Pulse Trigger */}
      <div className="flex items-center gap-2.5">
        {/* Desktop Name Button */}
        <button
          type="button"
          className={`hidden md:inline-flex items-center gap-2 text-xs font-medium cursor-pointer px-3.5 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap active:scale-95 ${nameButtonFont} ${
            isDark
              ? 'text-zinc-100 bg-white/[0.08] hover:bg-white/[0.16] border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.35)]'
              : 'text-slate-900 bg-slate-900/[0.06] hover:bg-slate-900/[0.12] border border-slate-900/15 hover:border-slate-900/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_10px_rgba(15,23,42,0.06)]'
          }`}
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
          onClick={() => onOpenWindow(WindowId.INFO)}
        >
          <span className={isDark ? "text-zinc-400 font-['JetBrains_Mono']" : "text-slate-500 font-['JetBrains_Mono']"}>
            τ
          </span>
          <span className="tracking-tight">{nameButtonText}</span>
        </button>

        {/* Mobile Name Button */}
        <button
          type="button"
          className={`md:hidden inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium px-3 py-1.5 rounded-xl whitespace-nowrap active:scale-95 transition-all ${
            isDark
              ? 'text-zinc-100 bg-white/[0.08] active:bg-white/[0.16] border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
              : 'text-slate-900 bg-slate-900/[0.06] active:bg-slate-900/[0.12] border border-slate-900/15'
          }`}
          onClick={() => onOpenWindow(WindowId.INFO)}
        >
          <span className={isDark ? 'text-zinc-400' : 'text-slate-500'}>τ</span>
          <span>{NAME_MOBILE}</span>
        </button>

        {/* Interactive 3D Core Boost Button */}
        <button
          type="button"
          onClick={onTrigger3DPulse}
          className={`inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 ${
            isDark
              ? 'text-zinc-200 bg-white/[0.06] hover:bg-white/[0.14] border border-white/20 hover:border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
              : 'text-slate-700 bg-slate-900/[0.05] hover:bg-slate-900/[0.10] border border-slate-900/15 hover:border-slate-900/30'
          }`}
          title="Pulse 3D Core"
        >
          <span>◈</span>
          <span className="hidden sm:inline">Pulse 3D Core</span>
          <span className="sm:hidden">3D</span>
        </button>
      </div>

      {/* Center: Subtle Interactive Hint on Desktop */}
      <div
        className={`hidden lg:flex items-center gap-2 text-[11px] font-['JetBrains_Mono'] ${
          isDark ? 'text-zinc-400' : 'text-slate-500'
        }`}
      >
        <span>INTERACTIVE 3D SUBNET</span>
        <span>·</span>
        <span>MOVE CURSOR OR CLICK TO PULSE</span>
      </div>

      {/* Right: Theme Toggle (Light / Dark) & Current Date */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          className={`inline-flex items-center gap-2 text-xs font-['JetBrains_Mono'] font-medium px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 ${
            isDark
              ? 'text-zinc-100 bg-white/[0.08] hover:bg-white/[0.16] border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
              : 'text-slate-800 bg-slate-900/[0.06] hover:bg-slate-900/[0.12] border border-slate-900/15 hover:border-slate-900/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]'
          }`}
        >
          {isDark ? (
            <>
              <span className="text-amber-300 text-xs leading-none">☀</span>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <span className="text-indigo-600 text-xs leading-none">☾</span>
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <div
          className={`text-xs font-['JetBrains_Mono'] tabular-nums tracking-tight whitespace-nowrap px-3 py-1.5 rounded-xl border ${
            isDark
              ? 'text-zinc-300 bg-white/[0.05] border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'text-slate-700 bg-slate-900/[0.04] border-slate-900/[0.10]'
          }`}
        >
          {currentDate}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
