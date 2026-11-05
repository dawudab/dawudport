import React, { useState, useEffect, useCallback } from 'react';
import GlobeCanvas from './components/GlobeCanvas';
import DesktopIconsContainer from './components/DesktopIconsContainer';
import WindowComponent from './components/Window';
import StatusBar from './components/StatusBar';
import ReadmeWindowContent from './components/windows/ReadmeWindowContent';
import ProjectsWindowContent from './components/windows/ProjectsWindowContent';
import ContactWindowContent from './components/windows/ContactWindowContent';
import InfoWindowContent from './components/windows/InfoWindowContent';
import { WindowId, WindowInstance, ThemeMode } from './types';
import {
  INITIAL_WINDOW_Z_INDEX,
  DEFAULT_WINDOW_SIZE,
  PROJECTS_WINDOW_DESKTOP_SIZE,
  CONTACT_WINDOW_DESKTOP_SIZE,
} from './constants';

const APP_HEADER_HEIGHT = 0; // Top ticker removed for a clean, open 3D desktop canvas
const APP_FOOTER_HEIGHT = 46; // px for StatusBar
const DESKTOP_WINDOW_MARGIN_TOP = 24; // px, min space from top viewport edge
const DESKTOP_WINDOW_STAGGER_OFFSET = 26; // px, for staggering multiple windows

const windowDefinitionOrder: WindowId[] = [
  WindowId.README,
  WindowId.PROJECTS,
  WindowId.CONTACT,
  WindowId.INFO,
];

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
  orderIndex: number
): { position: { top: number; left: number }; size: { width: string; height: string } } => {
  let top: number;
  let left: number;
  let size: { width: string; height: string };

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
  const centeredLeft = (viewportWidth - windowClientWidth) / 2;

  centeredTop = Math.max(APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP, centeredTop);

  top = Math.round(centeredTop + orderIndex * DESKTOP_WINDOW_STAGGER_OFFSET);
  left = Math.round(centeredLeft + orderIndex * DESKTOP_WINDOW_STAGGER_OFFSET);

  top = Math.max(APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP, top);
  left = Math.max(0, left);

  top = Math.min(top, viewportHeight - APP_FOOTER_HEIGHT - windowClientHeight - 8);
  left = Math.min(left, viewportWidth - windowClientWidth - 8);

  top =
    isNaN(top) || top < APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP
      ? APP_HEADER_HEIGHT + DESKTOP_WINDOW_MARGIN_TOP
      : top;
  left = isNaN(left) || left < 0 ? 0 : left;

  return { position: { top, left }, size };
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [impulseTrigger, setImpulseTrigger] = useState<number>(0);

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

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const trigger3DPulse = useCallback(() => {
    setImpulseTrigger((prev) => prev + 1);
  }, []);

  const updateAllWindowsLayout = useCallback((viewportWidth: number, viewportHeight: number) => {
    setWindows((prevWindows) => {
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
    setWindows((prevWindows) => {
      const newWindows = { ...prevWindows };
      const newZIndex = Math.max(...Object.values(prevWindows).map((w) => w.zIndex)) + 1;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const windowCount = Object.values(prevWindows).filter((w) => w.isVisible).length;
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
    setWindows((prevWindows) => {
      const newWindows = { ...prevWindows };
      const maxZIndex = Math.max(...Object.values(prevWindows).map((w) => w.zIndex));

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

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isVisible: false },
      }));
      if (activeWindowId === id) {
        setActiveWindowId(null);
      }
    },
    [activeWindowId]
  );

  const getWindowContent = (id: WindowId) => {
    switch (id) {
      case WindowId.README:
        return (
          <ReadmeWindowContent
            onOpenWindow={openWindow}
            isActive={activeWindowId === WindowId.README}
            theme={theme}
          />
        );
      case WindowId.PROJECTS:
        return <ProjectsWindowContent theme={theme} />;
      case WindowId.CONTACT:
        return <ContactWindowContent theme={theme} />;
      case WindowId.INFO:
        return <InfoWindowContent theme={theme} />;
      default:
        return null;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      id="os-environment"
      className={`fixed top-0 left-0 w-screen h-[100dvh] overflow-hidden font-['Plus_Jakarta_Sans'] select-none transition-colors duration-500 ${
        isDark ? 'bg-[#050507] text-zinc-100' : 'bg-[#eef2f7] text-slate-900'
      }`}
    >
      {/* Ambient Radial Light & Architectural Micro-Grid Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 85% 55% at 50% -10%, rgba(56, 189, 248, 0.10) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(148, 163, 184, 0.015) 45%, rgba(5, 5, 7, 0) 80%)'
            : 'radial-gradient(ellipse 85% 55% at 50% -10%, rgba(56, 189, 248, 0.18) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(226, 232, 240, 0.4) 55%, rgba(238, 242, 247, 0) 85%)',
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 z-0 ${
          isDark ? 'opacity-[0.04]' : 'opacity-[0.06]'
        }`}
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <GlobeCanvas theme={theme} impulseTrigger={impulseTrigger} />
      <DesktopIconsContainer
        onIconClick={openWindow}
        activeWindowId={activeWindowId}
        theme={theme}
      />

      <div
        id="windows-container"
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      >
        {(Object.keys(windows) as WindowId[]).map((id) => {
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
              theme={theme}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {getWindowContent(win.id)}
            </WindowComponent>
          );
        })}
      </div>

      <StatusBar
        onOpenWindow={openWindow}
        theme={theme}
        onToggleTheme={toggleTheme}
        onTrigger3DPulse={trigger3DPulse}
      />
    </div>
  );
};

export default App;