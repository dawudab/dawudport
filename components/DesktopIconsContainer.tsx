import React from 'react';
import DesktopIcon from './DesktopIcon';
import { WindowId } from '../types';
import { DESKTOP_ICON_CONFIGS } from '@/constants';

interface DesktopIconsContainerProps {
  onIconClick: (windowId: WindowId) => void;
  activeWindowId?: WindowId | null;
}

const DesktopIconsContainer: React.FC<DesktopIconsContainerProps> = ({
  onIconClick,
  activeWindowId,
}) => {
  return (
    <div
      className="absolute top-3 md:top-6 left-0 md:left-5 w-full md:w-auto
                 flex flex-row md:flex-col
                 justify-center md:justify-start items-start
                 px-3 md:px-0
                 z-[6]"
    >
      <div className="flex flex-row md:flex-col items-center justify-center gap-4 sm:gap-6 md:gap-4 max-w-full">
        {DESKTOP_ICON_CONFIGS.map((config) => (
          <DesktopIcon
            key={config.id}
            icon={React.createElement(config.icon, { className: 'w-full h-full' })}
            label={config.label}
            isActive={activeWindowId === config.id}
            onClick={() => onIconClick(config.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopIconsContainer;
