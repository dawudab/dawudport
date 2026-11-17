import React from 'react';

interface PulsingLightProps {
  color: 'green' | 'yellow' | 'red';
}

const PulsingLight: React.FC<PulsingLightProps> = ({ color }) => {
  let bgColorClass = '';
  switch (color) {
    case 'green':
      bgColorClass = 'bg-[#16a34a] border-[#14532d]';
      break;
    case 'yellow':
      bgColorClass = 'bg-[#d97706] border-[#78350f]';
      break;
    case 'red':
      bgColorClass = 'bg-[#dc2626] border-[#7f1d1d]';
      break;
  }

  return (
    <span className={`inline-block w-2.5 h-2.5 border self-center flex-shrink-0 ${bgColorClass}`} />
  );
};

export default PulsingLight;
