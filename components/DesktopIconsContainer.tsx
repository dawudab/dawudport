import React from 'react';
import DesktopIcon from './DesktopIcon';
import { WindowId, ThemeMode } from '../types';
import { DESKTOP_ICON_CONFIGS } from '@/constants';

interface DesktopIconsContainerProps {
  onIconClick: (windowId: WindowId) => void;
  activeWindowId?: WindowId | null;
  theme?: ThemeMode;
}

const DesktopIconsContainer: React.FC<DesktopIconsContainerProps> = ({
  onIconClick,
  activeWindowId,
  theme = 'dark',
}) => {
  return (
    <div
      className="absolute top-4 md:top-7 left-0 md:left-7 w-full md:w-auto
                 flex flex-row md:flex-col md:flex-nowrap
                 justify-start md:justify-start items-start
                 overflow-x-auto md:overflow-x-visible
                 overflow-y-hidden md:overflow-y-visible
                 pb-2 md:pb-0
                 px-3 md:px-0
                 z-[6]"
    >
      <div className="flex flex-row flex-nowrap md:flex-col gap-5 md:gap-6 mx-auto md:mx-0">
        {DESKTOP_ICON_CONFIGS.map((config) => (
          <DesktopIcon
            key={config.id}
            icon={React.createElement(config.icon, { className: 'w-full h-full' })}
            label={config.label}
            isActive={activeWindowId === config.id}
            theme={theme}
            onClick={() => onIconClick(config.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopIconsContainer;
