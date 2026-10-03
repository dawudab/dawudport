
import React from 'react';

interface PulsingLightProps {
  color: 'green' | 'yellow' | 'red';
}

const PulsingLight: React.FC<PulsingLightProps> = ({ color }) => {
  let bgColorClass = '';
  switch (color) {
    case 'green':
      bgColorClass = 'bg-green-500';
      break;
    case 'yellow':
      bgColorClass = 'bg-yellow-500';
      break;
    case 'red':
      bgColorClass = 'bg-red-500';
      break;
  }

  return (
    <span className={`w-2.5 h-2.5 rounded-full self-center animate-pulse ${bgColorClass}`}></span>
  );
};

export default PulsingLight;
