
import React from 'react';

interface PulsingLightProps {
  color: 'green' | 'yellow' | 'red';
}

const PulsingLight: React.FC<PulsingLightProps> = ({ color }) => {
  let bgColorClass = '';
  switch (color) {
    case 'green':
      bgColorClass = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
      break;
    case 'yellow':
      bgColorClass = 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]';
      break;
    case 'red':
      bgColorClass = 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]';
      break;
  }

  return (
    <span className={`w-2 h-2 rounded-full self-center flex-shrink-0 animate-pulse ${bgColorClass}`}></span>
  );
};

export default PulsingLight;
