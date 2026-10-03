
import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center text-center w-[70px] md:w-[90px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 flex-shrink-0"
      onClick={onClick}
    >
      <div className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] mb-2 text-white fill-current">
        {icon}
      </div>
      <span className="font-['Share_Tech_Mono'] text-[0.7rem] md:text-[0.8rem] text-white text-shadow-sm shadow-black">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
