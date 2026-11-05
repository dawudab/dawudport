import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowId, ThemeMode } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  isActive?: boolean;
  zIndex: number;
  initialPosition: { top: number; left: number };
  initialSize: { width: string; height: string };
  onClose: () => void;
  onFocus: () => void;
  isMobile: boolean;
  theme?: ThemeMode;
}

const WindowComponent: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isVisible,
  isActive = false,
  zIndex,
  initialPosition,
  initialSize,
  onClose,
  onFocus,
  isMobile,
  theme = 'dark',
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
        newTop = Math.max(0, Math.min(newTop, parentRect.height - windowRef.current.offsetHeight));
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowRef.current.offsetWidth));
      }

      setPosition({ top: newTop, left: newLeft });
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

  if (!isVisible) {
    return null;
  }

  const isDark = theme === 'dark';

  const windowStyle: React.CSSProperties = {
    top: isMaximized
      ? '14px'
      : `${isMobile ? initialPosition.top : position.top}px`,
    left: isMaximized
      ? '12px'
      : isMobile
      ? `${initialPosition.left}vw`
      : `${position.left}px`,
    width: isMaximized ? 'calc(100vw - 24px)' : initialSize.width,
    height: isMaximized ? 'calc(100vh - 72px)' : initialSize.height,
    zIndex,
    position: isMobile || isMaximized ? 'fixed' : 'absolute',
  };

  return (
    <div
      ref={windowRef}
      id={id}
      className={`rounded-2xl backdrop-blur-[36px] transition-all duration-300 flex flex-col min-w-0 min-h-[220px] overflow-hidden pointer-events-auto ${
        isDark
          ? isActive
            ? 'bg-gradient-to-b from-white/[0.10] via-zinc-950/80 to-zinc-950/90 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_0_24px_rgba(255,255,255,0.02),0_32px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)]'
            : 'bg-gradient-to-b from-white/[0.07] via-zinc-950/75 to-zinc-950/85 border border-white/12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_20px_50px_rgba(0,0,0,0.65)] opacity-95'
          : isActive
          ? 'bg-gradient-to-b from-white/90 via-white/82 to-slate-50/90 border border-slate-900/15 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_28px_80px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.05)]'
          : 'bg-gradient-to-b from-white/80 via-white/75 to-slate-50/82 border border-slate-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_16px_40px_rgba(15,23,42,0.12)] opacity-95'
      }`}
      style={{
        ...windowStyle,
        width: isMaximized
          ? 'calc(100vw - 24px)'
          : isMobile
          ? 'calc(100% - 16px)'
          : windowStyle.width,
        height: isMaximized
          ? 'calc(100vh - 72px)'
          : isMobile
          ? 'calc(100vh - 108px)'
          : windowStyle.height,
        maxWidth: isMaximized
          ? 'none'
          : isMobile
          ? 'calc(100% - 16px)'
          : '1160px',
        left: isMaximized ? '12px' : isMobile ? '8px' : windowStyle.left,
        top: isMaximized ? '14px' : isMobile ? '48px' : windowStyle.top,
        maxHeight: isMaximized
          ? 'calc(100vh - 72px)'
          : isMobile
          ? 'calc(100vh - 108px)'
          : 'none',
      }}
      onClick={onFocus}
    >
      {/* Acrylic Specular Title Bar */}
      <div
        className={`px-4 py-3 flex justify-between items-center select-none backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-white/[0.09] via-white/[0.04] to-white/[0.07] border-b border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]'
            : 'bg-gradient-to-r from-slate-900/[0.04] via-slate-900/[0.02] to-slate-900/[0.04] border-b border-slate-900/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
        } ${isMobile || isMaximized ? '' : 'cursor-move'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Traffic Lights Controls */}
          <div className="flex items-center gap-2">
            {/* Close Button */}
            <button
              type="button"
              className="group w-3.5 h-3.5 rounded-full bg-rose-500/90 hover:bg-rose-500 border border-white/20 flex items-center justify-center cursor-pointer transition-all focus:outline-none shadow-[0_0_8px_rgba(244,63,94,0.4)]"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close (ESC)"
              aria-label="Close window"
            >
              <span className="text-[8px] leading-none text-zinc-950 opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                ✕
              </span>
            </button>

            {/* Minimize / Hide Button */}
            <button
              type="button"
              className="group w-3.5 h-3.5 rounded-full bg-amber-400/85 hover:bg-amber-400 border border-white/20 flex items-center justify-center cursor-pointer transition-all focus:outline-none shadow-[0_0_8px_rgba(251,191,36,0.3)]"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Minimize window"
              aria-label="Minimize window"
            >
              <span className="text-[8px] leading-none text-zinc-950 opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                −
              </span>
            </button>

            {/* Maximize / Restore Button */}
            <button
              type="button"
              className="group w-3.5 h-3.5 rounded-full bg-emerald-400/85 hover:bg-emerald-400 border border-white/20 flex items-center justify-center cursor-pointer transition-all focus:outline-none shadow-[0_0_8px_rgba(52,211,153,0.3)]"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((prev) => !prev);
              }}
              title={isMaximized ? 'Restore window' : 'Maximize window'}
              aria-label="Maximize or restore window"
            >
              <span className="text-[7px] leading-none text-zinc-950 opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                {isMaximized ? '⤦' : '⤢'}
              </span>
            </button>
          </div>

          {/* Title Badge */}
          <div
            className={`flex items-center gap-2 min-w-0 px-3 py-0.5 rounded-lg backdrop-blur-md border ${
              isDark
                ? 'bg-white/[0.05] border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                : 'bg-white/70 border-slate-900/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
            }`}
          >
            <span
              className={`font-['JetBrains_Mono'] text-xs select-none ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              τ
            </span>
            <span
              className={`font-['JetBrains_Mono'] text-xs sm:text-[13px] font-medium tracking-tight truncate ${
                isDark ? 'text-zinc-100' : 'text-slate-800'
              }`}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Right Action / ESC Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`rounded-lg px-2.5 py-1 text-[11px] font-['JetBrains_Mono'] cursor-pointer transition-all focus:outline-none whitespace-nowrap border ${
              isDark
                ? 'text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.14] border-white/[0.14] hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                : 'text-slate-700 hover:text-slate-950 bg-slate-900/[0.05] hover:bg-slate-900/[0.10] border-slate-900/[0.12]'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close terminal window"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Frosted Window Body */}
      <div
        className="flex-1 overflow-y-auto bg-transparent terminal-style"
        style={{
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default WindowComponent;