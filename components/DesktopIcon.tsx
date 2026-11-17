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
      className="group flex flex-col items-center text-center w-[80px] md:w-[88px] cursor-pointer flex-shrink-0 focus:outline-none p-1.5"
      onClick={onClick}
    >
      <div
        className={`w-[48px] h-[48px] md:w-[54px] md:h-[54px] p-1.5 mb-1.5 flex items-center justify-center transition-transform group-active:translate-y-[1px] ${
          isActive ? 'bg-[#000080]/35 border border-dotted border-white' : ''
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">{icon}</div>
      </div>

      <span
        className={`font-pixel-ui text-[11px] leading-tight px-1.5 py-0.5 rounded-none whitespace-nowrap ${
          isActive
            ? 'bg-[#000080] text-white border border-dotted border-white font-bold'
            : 'text-white bg-[#1e2f38]/80 group-hover:bg-[#000080] group-hover:text-white shadow-[1px_1px_0px_rgba(0,0,0,0.6)]'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
