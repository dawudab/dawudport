import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowId } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
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
      className="bg-black border-2 border-[#00ff41] rounded-lg shadow-[0_0_15px_rgba(0,255,65,0.5)] flex flex-col min-w-0 min-h-[200px] overflow-hidden pointer-events-auto"
      style={{
        ...windowStyle,
        width: isMobile ? 'calc(100% - 16px)' : windowStyle.width,
        height: isMobile ? 'calc(100vh - 120px)' : windowStyle.height,
        maxWidth: isMobile ? 'calc(100% - 16px)' : '1200px',
        left: isMobile ? '8px' : windowStyle.left,
        top: isMobile ? '60px' : windowStyle.top, // Positioned below the top bar
        position: isMobile ? 'fixed' : 'absolute',
        maxHeight: isMobile ? 'calc(100vh - 120px)' : 'none',
      }}
      onClick={onFocus}
    >
      <div
        className={`bg-black text-white p-2 font-['Orbitron'] font-bold flex justify-between items-center select-none ${isMobile ? '' : 'cursor-move'}`}
        onMouseDown={handleMouseDown}
      >
        <span>{title}</span>
        <button
          className="bg-[#ff5f56] w-[15px] h-[15px] rounded-full border border-black cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close window"
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-black" style={{
        WebkitOverflowScrolling: 'touch',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        WebkitTransform: 'translateZ(0)' // Force hardware acceleration on iOS
      }}>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WindowComponent;