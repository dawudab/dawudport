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
    <div className="fixed bottom-0 left-0 w-full h-10 bg-[#c0c0c0] z-[100] border-t-2 border-white shadow-[inset_0_1px_0_#ece9d8] flex items-center justify-between px-1.5 sm:px-2.5 gap-1 sm:gap-2 select-none text-[#111827] overflow-hidden">
      {/* Left: Compact L3-OS System Info Button */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onOpenWindow(WindowId.INFO)}
          className={`min-h-[28px] px-2 py-1 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
            isInfoActive ? 'x11-btn-depressed text-[#000080]' : 'x11-btn'
          }`}
          title="Open L3-OS System Info"
        >
          <span className="inline-block w-2 h-2 bg-[#1e3a5f] border border-white/60 shrink-0" />
          <span>L3-OS</span>
        </button>

        <div className="h-5 w-[2px] bg-[#808080] border-r border-white mx-0.5 shrink-0" />
      </div>

      {/* Middle: Scrollable/Truncating Open Window Taskbar Tabs */}
      <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar flex items-center gap-1">
        {openWindows.map((win) => {
          const isCurrent = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onTaskbarWindowClick(win.id)}
              className={`min-h-[28px] px-2 py-1 font-pixel-ui text-[11px] cursor-pointer whitespace-nowrap shrink-0 truncate max-w-[90px] sm:max-w-[140px] ${
                isCurrent ? 'x11-btn-depressed font-bold text-[#000080]' : 'x11-btn'
              }`}
              title={win.title}
            >
              {WINDOW_SHORT_LABELS[win.id]}
            </button>
          );
        })}
      </div>

      {/* Right: Log Out Button and Digital Clock */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onLogout}
          className="min-h-[28px] x11-btn px-2 py-1 font-pixel-ui text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0"
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
