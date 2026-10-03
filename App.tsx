import React, { useState, useEffect, useCallback } from 'react';
import GlobeCanvas from './components/GlobeCanvas';
import CryptoTickerBar from './components/CryptoTickerBar';
import DesktopIconsContainer from './components/DesktopIconsContainer';
import WindowComponent from './components/Window';
import StatusBar from './components/StatusBar';
import ReadmeWindowContent from './components/windows/ReadmeWindowContent';
import ProjectsWindowContent from './components/windows/ProjectsWindowContent';
import ContactWindowContent from './components/windows/ContactWindowContent';
import InfoWindowContent from './components/windows/InfoWindowContent';
import { WindowId, WindowInstance } from './types';
import {
  INITIAL_WINDOW_Z_INDEX,
  DEFAULT_WINDOW_SIZE,
  PROJECTS_WINDOW_DESKTOP_SIZE,
  CONTACT_WINDOW_DESKTOP_SIZE
} from './constants';

const APP_HEADER_HEIGHT = 36; // px for CryptoTickerBar
const APP_FOOTER_HEIGHT = 38; // px for StatusBar
const DESKTOP_WINDOW_MARGIN_TOP_FROM_HEADER = 18; // px, min space between header and window top
const DESKTOP_WINDOW_STAGGER_OFFSET = 26; // px, for staggering multiple windows

const windowDefinitionOrder: WindowId[] = [WindowId.README, WindowId.PROJECTS, WindowId.CONTACT, WindowId.INFO];
const windowTitles: Record<WindowId, string> = {
  [WindowId.README]: './README.md --interactive',
  [WindowId.PROJECTS]: './projects --status',
  [WindowId.CONTACT]: './send_transmission --secure',
  [WindowId.INFO]: './dawud --info',
};

const calculateWindowLayout = (
  winId: WindowId,
  viewportWidth: number,
  viewportHeight: number,
  orderIndex: number // For staggering windows
): { position: { top: number; left: number }; size: { width: string; height: string } } => {
  let top: number;
  let left: number;
  let size: { width: string; height: string };

  // Determine size based on window ID, then center with stagger
  switch (winId) {
    case WindowId.PROJECTS:
      size = PROJECTS_WINDOW_DESKTOP_SIZE;
      break;
    case WindowId.CONTACT:
      size = CONTACT_WINDOW_DESKTOP_SIZE;
      break;
    default:
      size = DEFAULT_WINDOW_SIZE;
  }

  const currentWinWidthVw = parseFloat(size.width);
  const currentWinHeightVh = parseFloat(size.height);

  const windowClientWidth = (currentWinWidthVw / 100) * viewportWidth;
  const windowClientHeight = (currentWinHeightVh / 100) * viewportHeight;

  const usableViewportHeight = viewportHeight - APP_HEADER_HEIGHT - APP_FOOTER_HEIGHT;

  let centeredTop = APP_HEADER_HEIGHT + (usableViewportHeight - windowClientHeight) / 2;
  let centeredLeft = (viewportWidth - windowClientWidth) / 2;

  centeredTop = Math.max(APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP_FROM_HEADER, centeredTop);

  top = Math.round(centeredTop + orderIndex * DESKTOP_WINDOW_STAGGER_OFFSET);
  left = Math.round(centeredLeft + orderIndex * DESKTOP_WINDOW_STAGGER_OFFSET);

  top = Math.max(APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP_FROM_HEADER, top);
  left = Math.max(0, left);

  top = Math.min(top, viewportHeight - APP_FOOTER_HEIGHT - windowClientHeight - 5);
  left = Math.min(left, viewportWidth - windowClientWidth - 5);

  top = isNaN(top) || top < APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP_FROM_HEADER ? APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP_FROM_HEADER : top;
  left = isNaN(left) || left < 0 ? 0 : left;

  return { position: { top, left }, size };
};


const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<WindowId, WindowInstance>>(() => {
    const initialViewportWidth = window.innerWidth;
    const initialViewportHeight = window.innerHeight;

    const result: Partial<Record<WindowId, WindowInstance>> = {};
    windowDefinitionOrder.forEach((id, index) => {
      const layout = calculateWindowLayout(id, initialViewportWidth, initialViewportHeight, index);
      result[id] = {
        id,
        title: windowTitles[id],
        isVisible: false,
        zIndex: INITIAL_WINDOW_Z_INDEX,
        position: layout.position,
        size: layout.size,
        isMaximized: false,
      };
    });
    return result as Record<WindowId, WindowInstance>;
  });

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);

  const updateAllWindowsLayout = useCallback((viewportWidth: number, viewportHeight: number) => {
    setWindows(prevWindows => {
      const newWindowsState = { ...prevWindows };
      windowDefinitionOrder.forEach((id, index) => {
        const win = prevWindows[id];
        if (win) {
          const layout = calculateWindowLayout(id, viewportWidth, viewportHeight, index);
          newWindowsState[id] = {
            ...win,
            position: layout.position,
            size: layout.size,
          };
        }
      });
      return newWindowsState;
    });
  }, []);

  const openWindow = useCallback((windowId: WindowId) => {
    setWindows(prevWindows => {
      const newWindows = { ...prevWindows };
      const newZIndex = Math.max(...Object.values(prevWindows).map(w => w.zIndex)) + 1;

      // Calculate new position for the window being opened
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const windowCount = Object.values(prevWindows).filter(w => w.isVisible).length;
      const layout = calculateWindowLayout(windowId, viewportWidth, viewportHeight, windowCount);

      newWindows[windowId] = {
        ...newWindows[windowId],
        isVisible: true,
        zIndex: newZIndex,
        position: layout.position,
        size: layout.size,
        isMaximized: false,
      };
      return newWindows;
    });
    setActiveWindowId(windowId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateAllWindowsLayout(window.innerWidth, window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateAllWindowsLayout]);

  const focusWindow = useCallback((windowId: WindowId) => {
    setWindows(prevWindows => {
      const newWindows = { ...prevWindows };
      const maxZIndex = Math.max(...Object.values(prevWindows).map(w => w.zIndex));

      if (newWindows[windowId] && newWindows[windowId].zIndex < maxZIndex) {
        newWindows[windowId] = {
          ...newWindows[windowId],
          zIndex: maxZIndex + 1,
        };
      }

      return newWindows;
    });
    setActiveWindowId(windowId);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isVisible: false }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);


  const getWindowContent = (id: WindowId) => {
    switch (id) {
      case WindowId.README:
        return <ReadmeWindowContent onOpenWindow={openWindow} isActive={activeWindowId === WindowId.README} />;
      case WindowId.PROJECTS:
        return <ProjectsWindowContent />;
      case WindowId.CONTACT:
        return <ContactWindowContent />;
      case WindowId.INFO:
        return <InfoWindowContent />;
      default:
        return null;
    }
  };

  return (
    <div
      id="os-environment"
      className="fixed top-0 left-0 w-screen h-[100dvh] bg-[#050507] text-zinc-100 overflow-hidden font-['Plus_Jakarta_Sans'] select-none"
    >
      {/* Subtle Bittensor radial ambient light & micro-grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.055) 0%, rgba(148, 163, 184, 0.02) 38%, rgba(5, 5, 7, 0) 72%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <GlobeCanvas />
      <CryptoTickerBar />
      <DesktopIconsContainer onIconClick={openWindow} activeWindowId={activeWindowId} />

      <div id="windows-container" className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {(Object.keys(windows) as WindowId[]).map(id => {
          const win = windows[id];
          if (!win) return null;
          return (
            <WindowComponent
              key={win.id}
              id={win.id}
              title={win.title}
              isVisible={win.isVisible}
              isActive={activeWindowId === win.id}
              zIndex={win.zIndex}
              initialPosition={win.position}
              initialSize={win.size}
              isMobile={isMobile}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {getWindowContent(win.id)}
            </WindowComponent>
          );
        })}
      </div>

      <StatusBar onOpenWindow={openWindow} />
    </div>
  );
};

export default App;