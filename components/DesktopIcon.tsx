
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
      className="group flex flex-col items-center text-center w-[76px] md:w-[88px] cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-95 flex-shrink-0 focus:outline-none"
      onClick={onClick}
    >
      <div
        className={`w-[52px] h-[52px] md:w-[58px] md:h-[58px] p-3.5 mb-2 rounded-2xl backdrop-blur-xl transition-all duration-150 flex items-center justify-center ${
          isActive
            ? 'bg-white/[0.14] border border-white/30 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_10px_28px_rgba(0,0,0,0.55)]'
            : 'bg-white/[0.045] border border-white/[0.10] text-zinc-200 group-hover:bg-white/[0.09] group-hover:border-white/20 group-hover:text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_8px_24px_rgba(0,0,0,0.45)]'
        }`}
      >
        {icon}
      </div>
      <span
        className={`font-['JetBrains_Mono'] text-[11px] md:text-xs tracking-tight transition-colors whitespace-nowrap ${
          isActive ? 'text-white font-medium' : 'text-zinc-300 group-hover:text-white'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
