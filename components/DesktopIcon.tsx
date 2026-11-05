import React from 'react';
import { ThemeMode } from '../types';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  theme?: ThemeMode;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  isActive = false,
  theme = 'dark',
  onClick,
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="group flex flex-col items-center text-center w-[80px] md:w-[92px] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-105 active:scale-95 flex-shrink-0 focus:outline-none"
      onClick={onClick}
    >
      <div
        className={`w-[56px] h-[56px] md:w-[62px] md:h-[62px] p-3.5 mb-2 rounded-2xl backdrop-blur-[24px] transition-all duration-200 flex items-center justify-center ${
          isDark
            ? isActive
              ? 'bg-gradient-to-b from-white/[0.22] via-white/[0.12] to-white/[0.06] border border-white/50 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_14px_36px_rgba(0,0,0,0.75)]'
              : 'bg-gradient-to-b from-white/[0.10] via-white/[0.04] to-white/[0.015] border border-white/20 text-zinc-300 group-hover:from-white/[0.18] group-hover:to-white/[0.07] group-hover:border-white/45 group-hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_28px_rgba(0,0,0,0.55)]'
            : isActive
            ? 'bg-gradient-to-b from-white/95 via-white/85 to-slate-100/80 border border-slate-900/30 text-slate-950 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_14px_32px_rgba(15,23,42,0.18)]'
            : 'bg-gradient-to-b from-white/80 via-white/65 to-white/50 border border-slate-900/15 text-slate-700 group-hover:from-white/95 group-hover:to-white/80 group-hover:border-slate-900/30 group-hover:text-slate-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_24px_rgba(15,23,42,0.10)]'
        }`}
      >
        <div
          className={`w-full h-full flex items-center justify-center ${
            isDark
              ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
              : 'drop-shadow-[0_2px_6px_rgba(15,23,42,0.12)]'
          }`}
        >
          {icon}
        </div>
      </div>
      <span
        className={`font-['JetBrains_Mono'] text-[11px] md:text-xs tracking-tight transition-all px-2 py-0.5 rounded-md backdrop-blur-md whitespace-nowrap ${
          isDark
            ? isActive
              ? 'bg-white/[0.14] border border-white/25 text-white font-medium shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
              : 'bg-zinc-950/45 border border-white/[0.08] text-zinc-300 group-hover:bg-zinc-950/75 group-hover:border-white/25 group-hover:text-white'
            : isActive
            ? 'bg-slate-900/90 border border-slate-900 text-white font-medium shadow-[0_2px_8px_rgba(15,23,42,0.18)]'
            : 'bg-white/75 border border-slate-900/10 text-slate-700 group-hover:bg-white/95 group-hover:border-slate-900/25 group-hover:text-slate-950'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
