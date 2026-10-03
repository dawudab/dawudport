import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowId } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  isActive?: boolean;
  zIndex: number;
  initialPosition: { top: number; left: number }; // For mobile: top is px, left is vw units. For desktop: top/left are px units.
  initialSize: { width: string; height: string };
  onClose: () => void;
  onFocus: () => void;
  isMobile: boolean;
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
}) => {
  // 'position' state stores pixel values for top/left, primarily for desktop dragging.
  // For mobile, 'initialPosition' is used directly for styling, with 'left' interpreted as 'vw'.
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When initialPosition changes (e.g., due to layout recalculation on resize or mobile toggle),
    // update the internal 'position' state. This is mainly relevant for desktop.
    setPosition(initialPosition);
  }, [initialPosition]);


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !windowRef.current) return; // Disable dragging on mobile
    if ((e.target as HTMLElement).closest('input, textarea, button, select, .terminal-option')) {
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile || !isDragging || !windowRef.current) return;

    let newTop = e.clientY - dragStartPos.current.y;
    let newLeft = e.clientX - dragStartPos.current.x;

    const parentRect = windowRef.current.parentElement?.getBoundingClientRect();
    if (parentRect) {
        newTop = Math.max(0, Math.min(newTop, parentRect.height - windowRef.current.offsetHeight));
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowRef.current.offsetWidth));
    }

    setPosition({ top: newTop, left: newLeft });
  }, [isDragging, isMobile]);

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

  // Style calculation based on mobile/desktop and source of position values
  const windowStyle: React.CSSProperties = {
    top: `${isMobile ? initialPosition.top : position.top}px`, // Mobile uses initialPosition.top (px), Desktop uses internal state (px)
    left: isMobile ? `${initialPosition.left}vw` : `${position.left}px`, // Mobile uses initialPosition.left (vw), Desktop uses internal state (px)
    width: initialSize.width,
    height: initialSize.height,
    zIndex,
    position: 'absolute',
  };


  return (
    <div
      ref={windowRef}
      id={id}
      className={`rounded-2xl backdrop-blur-2xl bg-[#09090d]/78 border transition-colors duration-150 flex flex-col min-w-0 min-h-[200px] overflow-hidden pointer-events-auto ${
        isActive
          ? 'border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.20),0_30px_80px_rgba(0,0,0,0.82)]'
          : 'border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_20px_50px_rgba(0,0,0,0.65)]'
      }`}
      style={{
        ...windowStyle,
        width: isMobile ? 'calc(100% - 16px)' : windowStyle.width,
        height: isMobile ? 'calc(100vh - 116px)' : windowStyle.height,
        maxWidth: isMobile ? 'calc(100% - 16px)' : '1120px',
        left: isMobile ? '8px' : windowStyle.left,
        top: isMobile ? '52px' : windowStyle.top,
        position: isMobile ? 'fixed' : 'absolute',
        maxHeight: isMobile ? 'calc(100vh - 116px)' : 'none',
      }}
      onClick={onFocus}
    >
      <div
        className={`bg-white/[0.03] border-b border-white/[0.08] px-4 py-2.5 flex justify-between items-center select-none ${
          isMobile ? '' : 'cursor-move'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="group w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 border border-white/10 flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
            >
              <span className="text-[8px] leading-none text-black/80 opacity-0 group-hover:opacity-100 font-bold">✕</span>
            </button>
            <span className="w-3 h-3 rounded-full bg-white/[0.10] border border-white/[0.08]" />
            <span className="w-3 h-3 rounded-full bg-white/[0.10] border border-white/[0.08]" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-zinc-500 font-['JetBrains_Mono'] text-xs select-none">τ</span>
            <span className="font-['JetBrains_Mono'] text-xs sm:text-[13px] font-medium tracking-tight text-zinc-200 truncate">
              {title}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.10] border border-white/[0.08] rounded-md px-2 py-0.5 text-[11px] font-['JetBrains_Mono'] cursor-pointer transition-colors focus:outline-none whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close terminal window"
        >
          ESC
        </button>
      </div>
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