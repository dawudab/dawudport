import React, { useState, useEffect, useCallback } from 'react';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import GlobeCanvas from './components/GlobeCanvas';
import DesktopIconsContainer from './components/DesktopIconsContainer';
import WindowComponent from './components/Window';
import StatusBar from './components/StatusBar';
import ReadmeWindowContent from './components/windows/ReadmeWindowContent';
import ProjectsWindowContent from './components/windows/ProjectsWindowContent';
import ContactWindowContent from './components/windows/ContactWindowContent';
import InfoWindowContent from './components/windows/InfoWindowContent';
import { WindowId, WindowInstance, OSStage, LoggedInUser } from './types';
import {
  INITIAL_WINDOW_Z_INDEX,
  DEFAULT_WINDOW_SIZE,
  PROJECTS_WINDOW_DESKTOP_SIZE,
  CONTACT_WINDOW_DESKTOP_SIZE,
} from './constants';

const APP_HEADER_HEIGHT = 0; // No market ticker bar
const APP_FOOTER_HEIGHT = 40; // px for StatusBar (h-10)
const DESKTOP_WINDOW_MARGIN_TOP = 24;
const DESKTOP_WINDOW_STAGGER_OFFSET = 24;

const windowDefinitionOrder: WindowId[] = [
  WindowId.README,
  WindowId.PROJECTS,
  WindowId.CONTACT,
  WindowId.INFO,
];

const windowTitles: Record<WindowId, string> = {
  [WindowId.README]: 'README',
  [WindowId.PROJECTS]: 'Projects',
  [WindowId.CONTACT]: 'Contact',
  [WindowId.INFO]: 'L3-OS — System Info',
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
  const [osStage, setOsStage] = useState<OSStage>('booting');
  const [, setLoggedInUser] = useState<LoggedInUser>('User');

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
        isMinimized: false,
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

  const handleBootComplete = useCallback(() => {
    setOsStage((prev) => (prev === 'booting' ? 'login' : prev));
  }, []);

  const handleLogin = useCallback((user: LoggedInUser) => {
    setLoggedInUser(user);
    setOsStage('desktop');
  }, []);

  const handleLogout = useCallback(() => {
    setOsStage('login');
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

      const existing = prevWindows[windowId];
      newWindows[windowId] = {
        ...existing,
        isVisible: true,
        isMinimized: false,
        zIndex: newZIndex,
        position: existing?.isVisible ? existing.position : layout.position,
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

      if (newWindows[windowId]) {
        newWindows[windowId] = {
          ...newWindows[windowId],
          isMinimized: false,
          zIndex:
            newWindows[windowId].zIndex < maxZIndex
              ? maxZIndex + 1
              : newWindows[windowId].zIndex,
        };
      }

      return newWindows;
    });
    setActiveWindowId(windowId);
  }, []);

  const minimizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: true },
      }));
      if (activeWindowId === id) {
        setActiveWindowId(null);
      }
    },
    [activeWindowId]
  );

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isVisible: false, isMinimized: false },
      }));
      if (activeWindowId === id) {
        setActiveWindowId(null);
      }
    },
    [activeWindowId]
  );

  const handleTaskbarWindowClick = useCallback(
    (windowId: WindowId) => {
      const target = windows[windowId];
      if (!target) return;
      if (target.isMinimized || activeWindowId !== windowId) {
        focusWindow(windowId);
      } else {
        minimizeWindow(windowId);
      }
    },
    [windows, activeWindowId, focusWindow, minimizeWindow]
  );

  const getWindowContent = (id: WindowId) => {
    switch (id) {
      case WindowId.README:
        return (
          <ReadmeWindowContent
            onOpenWindow={openWindow}
            isActive={activeWindowId === WindowId.README}
          />
        );
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
      className="fixed top-0 left-0 w-screen h-[100dvh] bg-[#2b4c59] text-[#111827] overflow-hidden font-mono-body select-none"
    >
      {/* Subtle 16-bit Linux Desktop Wallpaper Pixel Dithering */}
      <div className="pointer-events-none absolute inset-0 z-0 x11-wallpaper-dither" />

      {/* Stage A: Classic Retro Linux Boot Sequence */}
      {osStage === 'booting' && <BootScreen onBootComplete={handleBootComplete} />}

      {/* Stage B & C share the rotating wireframe globe over the slate-teal desktop wallpaper */}
      {osStage !== 'booting' && <GlobeCanvas />}

      {/* Stage B: Retro Linux Display Manager / Login Window */}
      {osStage === 'login' && <LoginScreen onLogin={handleLogin} />}

      {/* Stage C: L3-OS Desktop Environment */}
      {osStage === 'desktop' && (
        <>
          <DesktopIconsContainer onIconClick={openWindow} activeWindowId={activeWindowId} />

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
                  isMinimized={win.isMinimized}
                  isActive={activeWindowId === win.id}
                  zIndex={win.zIndex}
                  initialPosition={win.position}
                  initialSize={win.size}
                  isMobile={isMobile}
                  onClose={() => closeWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                >
                  {getWindowContent(win.id)}
                </WindowComponent>
              );
            })}
          </div>

          <StatusBar
            windows={windows}
            activeWindowId={activeWindowId}
            onOpenWindow={openWindow}
            onTaskbarWindowClick={handleTaskbarWindowClick}
            onLogout={handleLogout}
          />
        </>
      )}
    </div>
  );
};

export default App;