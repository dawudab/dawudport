import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowId } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  isMinimized?: boolean;
  isActive?: boolean;
  zIndex: number;
  initialPosition: { top: number; left: number };
  initialSize: { width: string; height: string };
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  isMobile: boolean;
}

const WindowComponent: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isVisible,
  isMinimized = false,
  isActive = false,
  zIndex,
  initialPosition,
  initialSize,
  onClose,
  onMinimize,
  onFocus,
  isMobile,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isMaximized || !windowRef.current) return;
    if ((e.target as HTMLElement).closest('input, textarea, button, select, a, .terminal-option')) {
      return;
    }

    setIsDragging(true);
    onFocus();
    const rect = windowRef.current.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !isDragging || !windowRef.current || isMaximized) return;

      let newTop = e.clientY - dragStartPos.current.y;
      let newLeft = e.clientX - dragStartPos.current.x;

      const parentRect = windowRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        newTop = Math.max(8, Math.min(newTop, parentRect.height - windowRef.current.offsetHeight - 48));
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowRef.current.offsetWidth));
      }

      setPosition({ top: Math.round(newTop), left: Math.round(newLeft) });
    },
    [isDragging, isMobile, isMaximized]
  );

  const handleMouseUp = useCallback(() => {
    if (isMobile) return;
    setIsDragging(false);
  }, [isMobile]);

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, isMobile]);

  if (!isVisible || isMinimized) {
    return null;
  }

  // On mobile viewports (< 768px), dock cleanly inside the safe desktop area (top: 8px, left: 8px, right: 8px, bottom: 48px)
  const windowStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        top: '8px',
        left: '8px',
        right: '8px',
        bottom: '48px',
        width: 'auto',
        height: 'auto',
        maxWidth: 'calc(100vw - 16px)',
        zIndex,
      }
    : isMaximized
    ? {
        position: 'fixed',
        top: '8px',
        left: '8px',
        right: '8px',
        bottom: '48px',
        width: 'auto',
        height: 'auto',
        maxWidth: 'calc(100vw - 16px)',
        zIndex,
      }
    : {
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: initialSize.width,
        height: initialSize.height,
        maxWidth: '1220px',
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      id={id}
      className="rounded-none x11-window-frame p-1 flex flex-col min-w-0 min-h-[200px] max-w-full overflow-hidden pointer-events-auto"
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Classic 90s/2000s Linux Navy Title Bar */}
      <div
        className={`px-2.5 py-1 flex justify-between items-center gap-2 select-none shrink-0 ${
          isActive
            ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white'
            : 'bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-[#e5e7eb]'
        } ${isMobile || isMaximized ? '' : 'cursor-move'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="inline-block w-3 h-3 bg-[#d4d0c8] border-t border-l border-white border-r border-b border-[#404040] shrink-0" />
          <span className="font-pixel-ui text-xs font-bold tracking-wide truncate">
            {title}
          </span>
        </div>

        {/* Tactile 3D Beveled Window Controls (Touch-friendly on mobile) */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            className="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] px-1.5 x11-btn font-pixel-ui text-xs font-bold leading-none flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) {
                onMinimize();
              } else {
                onClose();
              }
            }}
            title="Minimize window"
            aria-label="Minimize window"
          >
            _
          </button>

          {!isMobile && (
            <button
              type="button"
              className="min-w-[28px] min-h-[28px] px-1.5 x11-btn font-pixel-ui text-xs font-bold leading-none flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((prev) => !prev);
              }}
              title={isMaximized ? 'Restore window' : 'Maximize window'}
              aria-label="Maximize or restore window"
            >
              □
            </button>
          )}

          <button
            type="button"
            className="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] px-2 x11-btn font-pixel-ui text-xs font-bold leading-none flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close window"
            aria-label="Close window"
          >
            [ X ]
          </button>
        </div>
      </div>

      {/* Sunken Window Content Area */}
      <div
        className="flex-1 mt-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#e5e7eb] x11-inset terminal-style"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default WindowComponent;