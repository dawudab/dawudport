import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <button
      type="button"
      className="group flex flex-col items-center text-center w-[80px] md:w-[92px] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 active:scale-95 flex-shrink-0 focus:outline-none"
      onClick={onClick}
    >
      <div
        className={`w-[56px] h-[56px] md:w-[62px] md:h-[62px] p-3.5 mb-2 rounded-2xl backdrop-blur-[24px] transition-all duration-200 flex items-center justify-center ${
          isActive
            ? 'bg-gradient-to-b from-white/[0.22] via-white/[0.12] to-white/[0.06] border border-white/50 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_14px_36px_rgba(0,0,0,0.75)]'
            : 'bg-gradient-to-b from-white/[0.10] via-white/[0.04] to-white/[0.015] border border-white/20 text-zinc-300 group-hover:from-white/[0.16] group-hover:to-white/[0.06] group-hover:border-white/40 group-hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_28px_rgba(0,0,0,0.55)]'
        }`}
      >
        <div className="w-full h-full flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {icon}
        </div>
      </div>
      <span
        className={`font-['JetBrains_Mono'] text-[11px] md:text-xs tracking-tight transition-all px-2 py-0.5 rounded-md backdrop-blur-md whitespace-nowrap ${
          isActive
            ? 'bg-white/[0.12] border border-white/20 text-white font-medium shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
            : 'bg-zinc-950/40 border border-white/[0.06] text-zinc-300 group-hover:bg-zinc-950/70 group-hover:border-white/20 group-hover:text-white'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
