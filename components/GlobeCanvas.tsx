import React, { useEffect, useRef } from 'react';

const GlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let rotationY = 0;

    // Render at slightly lower internal resolution and scale up with image-rendering: pixelated
    // for authentic crisp retro pixel-aliased wireframe lines
    const PIXEL_SCALE = 2;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width / PIXEL_SCALE));
      canvas.height = Math.max(1, Math.floor(height / PIXEL_SCALE));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.imageSmoothingEnabled = false;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const TILT_X = 0.34;
    const LAT_LINES = 8;
    const LON_LINES = 12;
    const SEGMENTS = 44;

    const projectPoint = (
      x: number,
      y: number,
      z: number,
      cx: number,
      cy: number,
      radius: number
    ) => {
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;

      const cosX = Math.cos(TILT_X);
      const sinX = Math.sin(TILT_X);
      const ry = y * cosX - rz * sinX;
      const rz2 = y * sinX + rz * cosX;

      return {
        sx: Math.round(cx + rx * radius),
        sy: Math.round(cy + ry * radius),
        z: rz2,
      };
    };

    const drawGlobe = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cx = Math.floor(width / 2);
      const cy = Math.floor(height / 2);
      const radius = Math.floor(Math.min(width, height) * 0.32);

      // Outer wireframe boundary circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude parallels
      for (let i = 1; i < LAT_LINES; i++) {
        const lat = (i / LAT_LINES) * Math.PI - Math.PI / 2;
        const y = Math.sin(lat);
        const r = Math.cos(lat);

        for (let s = 0; s < SEGMENTS; s++) {
          const a1 = (s / SEGMENTS) * Math.PI * 2;
          const a2 = ((s + 1) / SEGMENTS) * Math.PI * 2;

          const p1 = projectPoint(r * Math.cos(a1), y, r * Math.sin(a1), cx, cy, radius);
          const p2 = projectPoint(r * Math.cos(a2), y, r * Math.sin(a2), cx, cy, radius);

          const isFront = (p1.z + p2.z) * 0.5 >= 0;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = isFront
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(255, 255, 255, 0.10)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Longitude meridians
      for (let j = 0; j < LON_LINES; j++) {
        const lon = (j / LON_LINES) * Math.PI * 2;

        for (let s = 0; s < SEGMENTS; s++) {
          const phi1 = (s / SEGMENTS) * Math.PI - Math.PI / 2;
          const phi2 = ((s + 1) / SEGMENTS) * Math.PI - Math.PI / 2;

          const p1 = projectPoint(
            Math.cos(phi1) * Math.cos(lon),
            Math.sin(phi1),
            Math.cos(phi1) * Math.sin(lon),
            cx,
            cy,
            radius
          );
          const p2 = projectPoint(
            Math.cos(phi2) * Math.cos(lon),
            Math.sin(phi2),
            Math.cos(phi2) * Math.sin(lon),
            cx,
            cy,
            radius
          );

          const isFront = (p1.z + p2.z) * 0.5 >= 0;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = isFront
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(255, 255, 255, 0.10)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const tick = () => {
      if (!reducedMotion) {
        rotationY += 0.0035;
      }
      drawGlobe();
      animationFrameId = requestAnimationFrame(tick);
    };

    drawGlobe();
    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.unobserve(container);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default GlobeCanvas;
