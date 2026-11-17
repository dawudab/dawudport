import React from 'react';
import { WindowId, WindowInstance } from '../types';
import WorldClock from './WorldClock';

interface StatusBarProps {
  windows: Record<WindowId, WindowInstance>;
  activeWindowId: WindowId | null;
  onOpenWindow: (windowId: WindowId) => void;
  onTaskbarWindowClick: (windowId: WindowId) => void;
  onLogout: () => void;
}

const WINDOW_SHORT_LABELS: Record<WindowId, string> = {
  [WindowId.README]: 'README',
  [WindowId.PROJECTS]: 'Projects',
  [WindowId.CONTACT]: 'Contact',
  [WindowId.INFO]: 'Info',
};

const StatusBar: React.FC<StatusBarProps> = ({
  windows,
  activeWindowId,
  onOpenWindow,
  onTaskbarWindowClick,
  onLogout,
}) => {
  const openWindows = (Object.values(windows) as WindowInstance[]).filter((w) => w.isVisible);
  const isInfoActive =
    windows[WindowId.INFO]?.isVisible &&
    !windows[WindowId.INFO]?.isMinimized &&
    activeWindowId === WindowId.INFO;

  return (
    <div className="fixed bottom-0 left-0 w-full h-[44px] bg-[#c0c0c0] z-[100] border-t-2 border-white shadow-[inset_0_1px_0_#ece9d8] flex items-center justify-between px-2 sm:px-3 gap-2 select-none text-[#111827]">
      {/* Left: 3D Beveled [ L3-OS ] System Info Button + Compact Active Window Tabs */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onOpenWindow(WindowId.INFO)}
          className={`min-h-[32px] px-2.5 py-1 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            isInfoActive ? 'x11-btn-depressed text-[#000080]' : 'x11-btn'
          }`}
          title="Open L3-OS System Info"
        >
          <span className="inline-block w-2.5 h-2.5 bg-[#1e3a5f] shrink-0" />
          <span>[ L3-OS ]</span>
        </button>

        <div className="h-5 w-[2px] bg-[#808080] border-r border-white mx-0.5 shrink-0" />

        {/* Compact Open Window Taskbar Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto min-w-0">
          {openWindows.map((win) => {
            const isCurrent = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => onTaskbarWindowClick(win.id)}
                className={`min-h-[32px] px-2.5 py-1 font-pixel-ui text-[11px] cursor-pointer whitespace-nowrap shrink-0 ${
                  isCurrent ? 'x11-btn-depressed font-bold text-[#000080]' : 'x11-btn'
                }`}
              >
                {WINDOW_SHORT_LABELS[win.id]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Log Out Button and Digital Clock */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={onLogout}
          className="min-h-[32px] x11-btn px-2.5 py-1 font-pixel-ui text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0"
          title="Log Out to L3-OS Login Screen"
        >
          Log Out
        </button>

        <WorldClock />
      </div>
    </div>
  );
};

export default StatusBar;
