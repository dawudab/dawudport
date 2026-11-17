import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BOOT_STEPS: Array<{ text: string; delayMs: number }> = [
  { text: 'Starting L3-OS...', delayMs: 150 },
  { text: 'Loading desktop environment...', delayMs: 700 },
  { text: 'Starting window manager...', delayMs: 1350 },
  { text: 'Ready.', delayMs: 1950 },
];

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_STEPS.forEach((step, index) => {
      const t = setTimeout(() => {
        setVisibleSteps(index + 1);
        setProgress(Math.round(((index + 1) / BOOT_STEPS.length) * 100));
      }, step.delayMs);
      timers.push(t);
    });

    const finishTimer = setTimeout(() => {
      onBootComplete();
    }, 2450);
    timers.push(finishTimer);

    const handleSkip = () => {
      onBootComplete();
    };

    window.addEventListener('keydown', handleSkip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onBootComplete]);

  const totalBlocks = 12;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const progressBar =
    '[' + '■'.repeat(filledBlocks) + '·'.repeat(Math.max(0, totalBlocks - filledBlocks)) + ']';

  return (
    <div
      onClick={onBootComplete}
      role="button"
      tabIndex={0}
      aria-label="L3-OS startup screen, click or press any key to skip"
      className="fixed inset-0 z-50 bg-[#111317] text-[#e5e7eb] font-mono-body p-4 sm:p-8 flex flex-col justify-center items-center cursor-pointer select-none overflow-hidden"
    >
      <div className="w-[92vw] max-w-sm space-y-5">
        {/* Clean Pixel Logo Header for L3-OS */}
        <div className="border-b border-[#374151] pb-3 flex items-baseline justify-between gap-2">
          <h1 className="font-pixel-ui text-xl sm:text-2xl font-bold text-white tracking-wider">
            L3-OS
          </h1>
          <span className="font-mono-body text-xs text-[#9ca3af] truncate">
            X11 Desktop Environment
          </span>
        </div>

        {/* Simple Startup Lines */}
        <div className="space-y-2 text-xs sm:text-sm text-[#d1d5db] min-h-[96px]">
          {BOOT_STEPS.slice(0, visibleSteps).map((step, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <span className="truncate">{step.text}</span>
              <span className="text-xs font-pixel-ui text-[#93c5fd] shrink-0">OK</span>
            </div>
          ))}
        </div>

        {/* Classic Segmented Progress Bar */}
        <div className="pt-3 border-t border-[#374151] space-y-2">
          <div className="font-mono-body text-xs sm:text-sm text-white tabular-nums tracking-widest">
            {progressBar} {progress}%
          </div>
          <div className="text-xs text-[#9ca3af]">
            [Tap or press any key to skip]
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
