
import React, { useState, useEffect } from 'react';
import { CITIES_FOR_CLOCK } from '../constants';

const WorldClock: React.FC = () => {
  const [clockData, setClockData] = useState<Array<{ name: string; time: string }>>([]);

  const updateWorldClocks = () => {
    const newClockData = CITIES_FOR_CLOCK.map(city => {
      try {
        const time = new Date().toLocaleTimeString('en-GB', {
            timeZone: city.timeZone,
            hour: '2-digit',
            minute: '2-digit'
        });
        return { name: city.name, time };
      } catch (e) {
        console.warn(`Could not get time for ${city.name} (${city.timeZone}): `, e);
        return { name: city.name, time: "N/A"};
      }
    });
    setClockData(newClockData);
  };

  useEffect(() => {
    updateWorldClocks();
    const intervalId = setInterval(updateWorldClocks, 30000); // Update every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  const renderClockItems = (instance: string) => clockData.map(cityTime => (
    <span key={`${instance}-${cityTime.name}`} className="mr-6 text-xs font-['JetBrains_Mono'] tabular-nums tracking-tight text-zinc-200">
      <span className="text-zinc-500">{cityTime.name.toUpperCase()}</span>{' '}
      <span className="text-zinc-100">{cityTime.time}</span>
    </span>
  ));

  return (
     <div id="world-clock-container" className="min-w-0 flex-grow overflow-hidden">
       <div className="inline-block animate-clock-scroll whitespace-nowrap">
         <span className="clock-item-container inline-block pl-4">
          {renderClockItems('first')}
         </span>
         <span className="clock-item-container inline-block pl-8">
          {renderClockItems('second')}
         </span>
       </div>
    </div>
  );
};

export default WorldClock;