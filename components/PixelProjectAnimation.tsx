import React, { useEffect, useRef } from 'react';

interface PixelProjectAnimationProps {
  projectId: string;
  projectName: string;
}

const CANVAS_W = 160;
const CANVAS_H = 64;

const px = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
};

const drawPixelCircleOutline = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) => {
  ctx.fillStyle = color;
  for (let angle = 0; angle < Math.PI * 2; angle += 0.12) {
    const x = Math.round(cx + Math.cos(angle) * r);
    const y = Math.round(cy + Math.sin(angle) * r);
    ctx.fillRect(x, y, 1, 1);
  }
};

const drawQareeb = (ctx: CanvasRenderingContext2D, t: number) => {
  // Dusk sky & Nouakchott skyline
  px(ctx, 0, 0, CANVAS_W, 46, '#1f3642');
  px(ctx, 0, 46, CANVAS_W, 18, '#172129');

  // Distant buildings
  const buildings = [
    { x: 36, w: 12, h: 18, c: '#294656' },
    { x: 50, w: 15, h: 24, c: '#2d4d5e' },
    { x: 68, w: 11, h: 15, c: '#253f4d' },
    { x: 82, w: 16, h: 22, c: '#2d4d5e' },
    { x: 102, w: 13, h: 17, c: '#294656' },
  ];
  buildings.forEach((b, idx) => {
    px(ctx, b.x, 46 - b.h, b.w, b.h, b.c);
    // Warm lit pixel windows
    if ((Math.floor(t * 2) + idx) % 3 !== 0) {
      px(ctx, b.x + 3, 46 - b.h + 4, 2, 2, '#fde047');
    }
    px(ctx, b.x + 7, 46 - b.h + 9, 2, 2, '#93c5fd');
  });

  // Dashed scrolling road markings
  const roadOffset = Math.floor(t * 28) % 20;
  for (let x = -roadOffset; x < CANVAS_W; x += 20) {
    px(ctx, x, 54, 10, 2, '#d4d0c8');
  }

  // Left: Local grocery/restaurant storefront
  px(ctx, 6, 22, 24, 24, '#cbd5e1');
  px(ctx, 13, 33, 8, 13, '#1e3a5f');
  for (let i = 0; i < 6; i++) {
    px(ctx, 5 + i * 4, 18, 4, 5, i % 2 === 0 ? '#f97316' : '#ffffff');
  }
  px(ctx, 9, 25, 16, 5, '#fef3c7');

  // Right: Customer home & blinking pin
  px(ctx, 126, 26, 26, 20, '#334155');
  px(ctx, 124, 22, 30, 4, '#475569');
  px(ctx, 136, 34, 6, 12, '#0f172a');
  px(ctx, 129, 31, 4, 4, '#fde047');
  px(ctx, 145, 31, 4, 4, '#fde047');

  const blink = Math.floor(t * 4) % 2 === 0;
  const pinColor = blink ? '#ef4444' : '#fb7185';
  px(ctx, 135, 6, 8, 8, pinColor);
  px(ctx, 137, 4, 4, 2, pinColor);
  px(ctx, 137, 14, 4, 3, pinColor);
  px(ctx, 138, 17, 2, 2, pinColor);
  px(ctx, 138, 8, 2, 2, '#ffffff');
  const ringPulse = Math.floor((t * 12) % 6);
  px(ctx, 135 - ringPulse, 20, 8 + ringPulse * 2, 1, '#93c5fd');

  // Scooter rider weaving from store (x=28) to customer (x=116)
  const cycle = (t * 0.42) % 1;
  const isDelivering = cycle < 0.82;
  const progress = isDelivering ? cycle / 0.82 : 1;
  const sx = 28 + progress * 86;
  const laneWeave = Math.sin(progress * Math.PI * 3) * 3;
  const sy = Math.round(37 + laneWeave);

  if (isDelivering) {
    // Exhaust puffs
    const puff = Math.floor(t * 10) % 3;
    px(ctx, sx - 5 - puff * 2, sy + 9, 3, 2, '#9ca3af');
    px(ctx, sx - 9 - puff * 2, sy + 7, 2, 2, '#64748b');

    // Wheels
    px(ctx, sx + 2, sy + 8, 5, 5, '#0f172a');
    px(ctx, sx + 4, sy + 10, 1, 1, '#e5e7eb');
    px(ctx, sx + 14, sy + 8, 5, 5, '#0f172a');
    px(ctx, sx + 16, sy + 10, 1, 1, '#e5e7eb');

    // Scooter body + orange Qareeb box
    px(ctx, sx + 4, sy + 5, 14, 4, '#38bdf8');
    px(ctx, sx + 14, sy - 2, 3, 8, '#38bdf8');
    px(ctx, sx + 13, sy - 3, 5, 2, '#f8fafc');
    px(ctx, sx + 17, sy, 2, 2, '#fde047'); // headlight
    // Rider
    px(ctx, sx + 9, sy - 2, 4, 7, '#1e3a5f');
    px(ctx, sx + 9, sy - 6, 4, 4, '#f8fafc');
    // Grocery package box
    px(ctx, sx, sy - 1, 7, 6, '#f59e0b');
    px(ctx, sx + 1, sy, 5, 2, '#fef3c7');
  } else {
    // Delivered flash + Bankily badge
    px(ctx, 128, 12, 24, 9, '#16a34a');
    px(ctx, 130, 14, 20, 5, '#dcfce7');
    px(ctx, 132, 16, 16, 1, '#15803d');
  }
};

const drawEnergyMap = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, CANVAS_H, '#0d1b24');

  // Subtle GIS grid
  for (let x = 0; x < CANVAS_W; x += 16) {
    px(ctx, x, 0, 1, CANVAS_H, '#162d3b');
  }
  for (let y = 0; y < CANVAS_H; y += 16) {
    px(ctx, 0, y, CANVAS_W, 1, '#162d3b');
  }

  // City blocks (Nouakchott districts)
  const sectors = [
    { x: 12, y: 8, w: 28, h: 18, phase: 0 },
    { x: 46, y: 10, w: 22, h: 16, phase: 1.4 },
    { x: 92, y: 8, w: 26, h: 18, phase: 2.8 },
    { x: 124, y: 12, w: 24, h: 16, phase: 4.1 },
    { x: 16, y: 36, w: 24, h: 20, phase: 2.1 },
    { x: 48, y: 38, w: 22, h: 18, phase: 0.7 },
    { x: 92, y: 36, w: 24, h: 20, phase: 3.4 },
    { x: 122, y: 36, w: 26, h: 18, phase: 5.0 },
  ];

  // Central power hub
  px(ctx, 72, 24, 16, 16, '#1e3a5f');
  px(ctx, 74, 26, 12, 12, '#0ea5e9');
  // Central lightning bolt
  px(ctx, 79, 27, 4, 3, '#fde047');
  px(ctx, 77, 30, 5, 2, '#fde047');
  px(ctx, 79, 32, 3, 4, '#facc15');

  const scanX = (t * 46) % CANVAS_W;

  sectors.forEach((s) => {
    const val = Math.sin(t * 1.4 + s.phase);
    let statusColor = '#22c55e'; // online green
    let frameColor = '#14532d';
    if (val < -0.35) {
      statusColor = '#ef4444'; // outage red
      frameColor = '#7f1d1d';
    } else if (val < 0.25) {
      statusColor = '#f59e0b'; // fuel / brownout amber
      frameColor = '#78350f';
    }

    const scanned = Math.abs(scanX - (s.x + s.w / 2)) < 10;
    px(ctx, s.x, s.y, s.w, s.h, frameColor);
    px(ctx, s.x + 1, s.y + 1, s.w - 2, s.h - 2, '#13242e');

    // Transmission wire to central node
    const cx = s.x + s.w / 2;
    const cy = s.y + s.h / 2;
    px(ctx, Math.min(cx, 80), cy, Math.abs(80 - cx), 1, '#1e4e68');
    px(ctx, 80, Math.min(cy, 32), 1, Math.abs(32 - cy), '#1e4e68');

    // Status indicator cells inside sector
    px(ctx, s.x + 4, s.y + 4, 5, 4, statusColor);
    px(ctx, s.x + 12, s.y + 4, 5, 4, scanned ? '#ffffff' : statusColor);
    px(ctx, s.x + 4, s.y + 10, s.w - 8, 3, scanned ? '#38bdf8' : '#264657');
  });

  // Sweeping GIS scanner bar
  px(ctx, scanX, 0, 2, CANVAS_H, '#38bdf8');
  px(ctx, scanX - 3, 0, 3, CANVAS_H, 'rgba(56, 189, 248, 0.22)');
};

const drawTrashBounties = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, 44, '#18342e');
  px(ctx, 0, 44, CANVAS_W, 20, '#11221e');

  // Distant clean buildings
  px(ctx, 10, 18, 14, 26, '#274c43');
  px(ctx, 26, 12, 16, 32, '#2f5e52');
  px(ctx, 44, 20, 12, 24, '#274c43');
  px(ctx, 13, 22, 3, 3, '#a7f3d0');
  px(ctx, 30, 16, 3, 3, '#a7f3d0');
  px(ctx, 36, 16, 3, 3, '#a7f3d0');

  // 5 city sector tiles transforming from litter -> clean green park
  const cycle = (t * 0.35) % 1;
  const workerX = 14 + cycle * 96;
  const tileXs = [18, 38, 58, 78, 98];

  tileXs.forEach((tx, i) => {
    const cleared = workerX > tx + 4;
    if (cleared) {
      // Clean green park tile + flower/shrub
      px(ctx, tx, 44, 16, 5, '#16a34a');
      px(ctx, tx + 2, 42, 4, 2, '#4ade80');
      px(ctx, tx + 10, 40, 3, 4, '#22c55e');
      if (i % 2 === 0) {
        px(ctx, tx + 6, 39, 2, 2, '#fde047');
      }
    } else {
      // Litter tile + trash bags
      px(ctx, tx, 44, 16, 5, '#374151');
      px(ctx, tx + 3, 38, 5, 6, '#6b7280');
      px(ctx, tx + 9, 39, 4, 5, '#4b5563');
      px(ctx, tx + 5, 37, 2, 1, '#9ca3af');
    }
  });

  // Sanitation worker walking right
  const step = Math.floor(t * 8) % 2;
  const wx = Math.round(workerX);
  px(ctx, wx, 28, 6, 4, '#fde047'); // helmet
  px(ctx, wx + 1, 32, 4, 4, '#fed7aa'); // face
  px(ctx, wx, 36, 6, 6, '#22c55e'); // hi-vis vest
  px(ctx, wx + 6, 37, 4, 2, '#f59e0b'); // arm
  px(ctx, wx + 1 + step, 42, 2, 4, '#1e3a5f'); // leg 1
  px(ctx, wx + 3 - step, 42, 2, 4, '#1e3a5f'); // leg 2

  // Spinning gold bounty coin (top right)
  const spinWidth = Math.max(2, Math.round(Math.abs(Math.cos(t * 4)) * 16));
  const coinCx = 136;
  const coinCy = 20;
  px(ctx, coinCx - spinWidth / 2, coinCy - 8, spinWidth, 16, '#f59e0b');
  if (spinWidth > 5) {
    px(ctx, coinCx - (spinWidth - 4) / 2, coinCy - 6, spinWidth - 4, 12, '#fde047');
    px(ctx, coinCx - 1, coinCy - 4, 2, 8, '#b45309');
  }

  // Rising sparkle pixels around coin
  const sparkY = (Math.floor(t * 12) % 10);
  px(ctx, 123, 18 - sparkY, 2, 2, '#fef08a');
  px(ctx, 148, 22 - sparkY, 2, 2, '#86efac');
  px(ctx, 135, 36, 10, 8, '#16a34a'); // eco bin
  px(ctx, 134, 34, 12, 2, '#4ade80');
};

const drawShtreli = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, 48, '#233140');
  px(ctx, 0, 48, CANVAS_W, 16, '#151e27');

  // Marketplace stall frame
  px(ctx, 14, 18, 86, 30, '#d4d0c8');
  px(ctx, 18, 22, 54, 16, '#1e293b'); // display window
  px(ctx, 76, 22, 20, 26, '#1e3a5f'); // stall door

  // Red & white striped awning
  for (let i = 0; i < 12; i++) {
    px(ctx, 12 + i * 8, 10, 8, 8, i % 2 === 0 ? '#ef4444' : '#ffffff');
  }

  // Rotating product items inside display window (cycle 0..2)
  const itemIdx = Math.floor(t * 0.7) % 3;
  const bob = Math.round(Math.sin(t * 4) * 1.5);
  if (itemIdx === 0) {
    // Pixel Laptop
    px(ctx, 26, 25 + bob, 16, 9, '#94a3b8');
    px(ctx, 28, 27 + bob, 12, 5, '#38bdf8');
    px(ctx, 24, 34 + bob, 20, 2, '#e2e8f0');
  } else if (itemIdx === 1) {
    // Pixel Car
    px(ctx, 26, 27 + bob, 18, 6, '#38bdf8');
    px(ctx, 30, 24 + bob, 10, 3, '#bae6fd');
    px(ctx, 28, 33 + bob, 4, 3, '#0f172a');
    px(ctx, 38, 33 + bob, 4, 3, '#0f172a');
  } else {
    // Pixel Smartphone
    px(ctx, 31, 24 + bob, 8, 12, '#0f172a');
    px(ctx, 32, 25 + bob, 6, 9, '#4ade80');
  }

  // Price tag bobbing next to product
  const tagBob = Math.round(Math.cos(t * 5) * 1.5);
  px(ctx, 50, 25 + tagBob, 18, 9, '#fde047');
  px(ctx, 52, 28 + tagBob, 12, 2, '#b45309');
  px(ctx, 52, 31 + tagBob, 8, 1, '#b45309');

  // Shopping cart/bag on right + floating sparkles
  const cartBob = Math.round(Math.sin(t * 3.5) * 2);
  px(ctx, 118, 14 + cartBob, 2, 6, '#fef3c7');
  px(ctx, 130, 14 + cartBob, 2, 6, '#fef3c7');
  px(ctx, 120, 12 + cartBob, 10, 2, '#fef3c7');
  px(ctx, 113, 20 + cartBob, 24, 24, '#f59e0b');
  px(ctx, 113, 20 + cartBob, 24, 3, '#fbbf24');
  px(ctx, 119, 28 + cartBob, 12, 9, '#ffffff');
  px(ctx, 122, 31 + cartBob, 6, 3, '#ef4444');

  // Sparkles rising from shopping bag
  const sp1 = Math.floor(t * 14) % 14;
  const sp2 = (Math.floor(t * 14) + 7) % 14;
  px(ctx, 110, 20 - sp1, 2, 2, '#fde047');
  px(ctx, 140, 24 - sp2, 2, 2, '#38bdf8');
  px(ctx, 126, 12 - sp1 / 2, 2, 2, '#ffffff');
};

const drawMahdara = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, CANVAS_H, '#162d30');

  // Courtyard twin Andalusian arches
  const drawArch = (ax: number) => {
    px(ctx, ax, 14, 4, 36, '#d6c7a9');
    px(ctx, ax + 24, 14, 4, 36, '#d6c7a9');
    px(ctx, ax + 2, 10, 24, 4, '#e7dcc8');
    px(ctx, ax + 6, 7, 16, 3, '#fde047');
    px(ctx, ax + 4, 14, 20, 32, '#0e1e20');
  };
  drawArch(12);
  drawArch(120);
  px(ctx, 0, 50, CANVAS_W, 14, '#102124');

  // Hanging lantern in center top with warm pulsing glow
  const glow = (Math.sin(t * 3.5) + 1) * 0.5;
  const glowRadius = 11 + Math.round(glow * 4);
  px(ctx, 80 - glowRadius, 12 - glowRadius / 2, glowRadius * 2, glowRadius, 'rgba(253, 224, 71, 0.14)');
  px(ctx, 79, 0, 2, 8, '#9ca3af');
  px(ctx, 76, 8, 8, 9, '#f59e0b');
  px(ctx, 77, 10, 6, 5, glow > 0.4 ? '#fef08a' : '#fde047');

  // Open classical manuscript in center
  px(ctx, 48, 24, 64, 30, '#92400e'); // cover
  px(ctx, 51, 21, 28, 30, '#fefce8'); // left page
  px(ctx, 81, 21, 28, 30, '#fef9c3'); // right page
  px(ctx, 79, 22, 2, 30, '#78350f'); // spine
  px(ctx, 79, 52, 3, 6, '#dc2626'); // bookmark

  // Static calligraphy lines on pages
  for (let row = 0; row < 4; row++) {
    px(ctx, 55, 27 + row * 5, 19, 2, row === 0 ? '#1e3a5f' : '#64748b');
    px(ctx, 85, 27 + row * 5, 19, 2, row === 0 ? '#1e3a5f' : '#64748b');
  }

  // Animated page turn sweeping from right page to left page
  const pageTurn = (t * 0.65) % 1;
  if (pageTurn < 0.7) {
    const p = pageTurn / 0.7;
    const flipX = Math.round(108 - p * 56);
    const flipW = Math.max(2, Math.round(Math.abs(Math.cos(p * Math.PI)) * 12));
    const liftY = Math.round(Math.sin(p * Math.PI) * 5);
    px(ctx, flipX, 20 - liftY, flipW, 29, '#ffffff');
    px(ctx, flipX, 20 - liftY, 1, 29, '#cbd5e1');
  }

  // Floating lantern light motes
  const moteY = (t * 8) % 18;
  px(ctx, 64, 20 - moteY, 2, 2, '#fef08a');
  px(ctx, 96, 22 - ((moteY + 9) % 18), 2, 2, '#fde047');
};

const drawGRN = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, CANVAS_H, '#0b1520');

  // Subtle dark HUD grid
  for (let x = 0; x < CANVAS_W; x += 20) px(ctx, x, 0, 1, CANVAS_H, '#122233');
  for (let y = 0; y < CANVAS_H; y += 16) px(ctx, 0, y, CANVAS_W, 1, '#122233');

  const cx = 80;
  const cy = 32;
  const r = 22;

  // Globe core
  for (let dy = -r; dy <= r; dy++) {
    const span = Math.round(Math.sqrt(r * r - dy * dy));
    px(ctx, cx - span, cy + dy, span * 2, 1, '#132a42');
  }

  // Latitude rings
  [-12, 0, 12].forEach((ly) => {
    const span = Math.round(Math.sqrt(r * r - ly * ly));
    px(ctx, cx - span, cy + ly, span * 2, 1, ly === 0 ? '#7dd3fc' : '#2563eb');
  });

  // Rotating wireframe meridians
  for (let m = 0; m < 4; m++) {
    const angle = (t * 0.9 + (m * Math.PI) / 4) % Math.PI;
    const xScale = Math.cos(angle);
    for (let dy = -r + 2; dy <= r - 2; dy += 2) {
      const latSpan = Math.sqrt(r * r - dy * dy);
      const mx = cx + Math.round(latSpan * xScale);
      px(ctx, mx, cy + dy, 1, 2, '#38bdf8');
    }
  }

  drawPixelCircleOutline(ctx, cx, cy, r, '#38bdf8');

  // Sweeping radar beam
  const beamAngle = t * 2.2;
  for (let dist = 2; dist < r; dist += 2) {
    px(ctx, cx + Math.cos(beamAngle) * dist, cy + Math.sin(beamAngle) * dist, 2, 2, '#60a5fa');
  }

  // Pulsing OSINT alert hotspots
  const hotspots = [
    { ox: -8, oy: -6, c: '#ef4444', phase: 0 },
    { ox: 7, oy: 4, c: '#f59e0b', phase: 1.5 },
    { ox: 2, oy: -10, c: '#ef4444', phase: 3.0 },
  ];
  hotspots.forEach((h) => {
    const pulse = Math.floor((t * 4 + h.phase) % 4);
    px(ctx, cx + h.ox, cy + h.oy, 3, 3, h.c);
    if (pulse < 2) {
      drawPixelCircleOutline(ctx, cx + h.ox + 1, cy + h.oy + 1, 3 + pulse * 2, h.c);
    }
  });

  // Left & Right concentric telemetry signal bars
  const wave = Math.floor(t * 5) % 3;
  for (let b = 0; b < 3; b++) {
    const h = 10 + b * 8;
    const y = cy - h / 2;
    const color = wave === b ? '#93c5fd' : '#1e3a5f';
    px(ctx, 32 - b * 8, y, 2, h, color);
    px(ctx, 126 + b * 8, y, 2, h, color);
  }
};

const drawIslamicContracts = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, CANVAS_H, '#162733');

  // Chain track rails
  px(ctx, 12, 37, 88, 2, '#334155');
  // Animated pulse packet sliding along chain
  const packetX = 16 + ((t * 48) % 80);
  px(ctx, packetX, 36, 5, 4, '#fde047');

  // 3 linked cryptographic blocks
  const blockXs = [14, 44, 74];
  blockXs.forEach((bx, idx) => {
    const active = Math.floor(t * 2) % 3 === idx;
    px(ctx, bx, 28, 18, 18, active ? '#7dd3fc' : '#38bdf8');
    px(ctx, bx + 2, 30, 14, 14, '#1e3a5f');
    px(ctx, bx + 6, 34, 6, 6, active ? '#4ade80' : '#fde047');
  });

  // Balance scale (Al-Mizan) at top left-center gently balancing
  const tilt = Math.round(Math.sin(t * 2.5) * 2);
  px(ctx, 51, 8, 2, 16, '#fbbf24'); // pillar
  px(ctx, 47, 23, 10, 2, '#fbbf24'); // base
  px(ctx, 38, 10, 28, 2, '#fde047'); // beam
  px(ctx, 38, 12, 1, 5 + tilt, '#e5e7eb');
  px(ctx, 65, 12, 1, 5 - tilt, '#e5e7eb');
  px(ctx, 35, 17 + tilt, 7, 3, '#38bdf8');
  px(ctx, 62, 17 - tilt, 7, 3, '#4ade80');

  // Contract scroll & verified halal seal on right
  px(ctx, 106, 10, 42, 4, '#d97706');
  px(ctx, 108, 14, 38, 36, '#fefce8');
  px(ctx, 106, 50, 42, 4, '#d97706');

  px(ctx, 113, 19, 26, 2, '#1e3a5f');
  px(ctx, 113, 25, 22, 2, '#64748b');
  px(ctx, 113, 30, 18, 2, '#64748b');
  px(ctx, 113, 35, 14, 2, '#64748b');

  // Pulsing halal contract seal
  const sealGlow = Math.floor(t * 3) % 2 === 0;
  px(ctx, 130, 36, 12, 12, sealGlow ? '#22c55e' : '#16a34a');
  px(ctx, 132, 38, 8, 8, '#86efac');
  px(ctx, 134, 41, 2, 3, '#14532d');
  px(ctx, 136, 39, 3, 2, '#14532d');
};

const drawAlJisr = (ctx: CanvasRenderingContext2D, t: number) => {
  px(ctx, 0, 0, CANVAS_W, 48, '#1e3a4c');
  // Animated flowing water
  px(ctx, 0, 48, CANVAS_W, 16, '#0284c7');
  const waveShift = Math.floor(t * 18) % 24;
  for (let x = -waveShift; x < CANVAS_W; x += 24) {
    px(ctx, x, 52, 10, 2, '#7dd3fc');
    px(ctx, x + 12, 57, 8, 2, '#38bdf8');
  }

  // Bridge stone pillars & deck
  px(ctx, 22, 22, 10, 26, '#d4d0c8');
  px(ctx, 20, 20, 14, 3, '#ffffff');
  px(ctx, 128, 22, 10, 26, '#d4d0c8');
  px(ctx, 126, 20, 14, 3, '#ffffff');

  px(ctx, 10, 34, 140, 4, '#e5e7eb');
  px(ctx, 10, 38, 140, 2, '#9ca3af');

  // Suspension cables
  px(ctx, 32, 24, 16, 2, '#fbbf24');
  px(ctx, 48, 28, 18, 2, '#fbbf24');
  px(ctx, 94, 28, 18, 2, '#fbbf24');
  px(ctx, 112, 24, 16, 2, '#fbbf24');

  // Walking learner (left) and teacher (right) meeting on bridge
  const walk = Math.abs(Math.sin(t * 1.2));
  const learnerX = Math.round(38 + walk * 26);
  const teacherX = Math.round(114 - walk * 26);
  const step = Math.floor(t * 7) % 2;

  // Learner sprite
  px(ctx, learnerX, 22, 6, 4, '#f59e0b');
  px(ctx, learnerX + 1, 26, 4, 5, '#38bdf8');
  px(ctx, learnerX + 1 + step, 31, 2, 3, '#1e3a5f');
  px(ctx, learnerX + 3 - step, 31, 2, 3, '#1e3a5f');

  // Teacher sprite
  px(ctx, teacherX, 22, 6, 4, '#f8fafc');
  px(ctx, teacherX + 1, 26, 4, 5, '#16a34a');
  px(ctx, teacherX + 1 + step, 31, 2, 3, '#1e3a5f');
  px(ctx, teacherX + 3 - step, 31, 2, 3, '#1e3a5f');

  // Floating bilingual speech bubbles ("EN" / "عربي")
  const bobL = Math.round(Math.sin(t * 3) * 1.5);
  const bobR = Math.round(Math.cos(t * 3) * 1.5);

  // Left bubble: EN
  px(ctx, learnerX - 4, 6 + bobL, 18, 11, '#ffffff');
  px(ctx, learnerX + 2, 17 + bobL, 3, 2, '#ffffff');
  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 7px monospace';
  ctx.fillText('EN', learnerX, 14 + bobL);

  // Right bubble: Arabic glyph/label
  px(ctx, teacherX - 6, 6 + bobR, 22, 11, '#fef08a');
  px(ctx, teacherX + 2, 17 + bobR, 3, 2, '#fef08a');
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('عربي', teacherX - 4, 14 + bobR);
};

const PixelProjectAnimation: React.FC<PixelProjectAnimationProps> = ({
  projectId,
  projectName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    const startTime = performance.now();

    const drawFrame = (now: number) => {
      const elapsedSec = prefersReducedMotion ? 0.5 : (now - startTime) / 1000;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      switch (projectId) {
        case 'qareeb':
          drawQareeb(ctx, elapsedSec);
          break;
        case 'nouakchott-energy-map':
          drawEnergyMap(ctx, elapsedSec);
          break;
        case 'charity-trash-bounties':
          drawTrashBounties(ctx, elapsedSec);
          break;
        case 'shtreli':
          drawShtreli(ctx, elapsedSec);
          break;
        case 'mahdara-al-andalous':
          drawMahdara(ctx, elapsedSec);
          break;
        case 'global-resistance-network':
          drawGRN(ctx, elapsedSec);
          break;
        case 'islamic-contracts':
          drawIslamicContracts(ctx, elapsedSec);
          break;
        case 'al-jisr-institute':
        default:
          drawAlJisr(ctx, elapsedSec);
          break;
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    rafId = requestAnimationFrame(drawFrame);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [projectId]);

  return (
    <div className="w-full h-28 sm:h-32 bg-[#111827] x11-inset p-1 overflow-hidden select-none relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        aria-label={`${projectName} animated pixel preview`}
        className="w-full h-full block"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default PixelProjectAnimation;
