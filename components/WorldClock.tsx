
import React, { useState } from 'react';
import AnalogClock from './AnalogClock';

interface City {
  name: string;
  tz: string;
}

const INITIAL_CITIES: City[] = [
  { name: 'London', tz: 'Europe/London' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
  { name: 'San Francisco', tz: 'America/Los_Angeles' },
];

const WorldClock: React.FC = () => {
  const [cities] = useState<City[]>(INITIAL_CITIES);

  const getTimeString = (tz: string) => {
    return new Date().toLocaleTimeString('en-GB', { 
      timeZone: tz, 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getOffset = (tz: string) => {
    const now = new Date();
    const local = new Date(now.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
    const target = new Date(now.toLocaleString("en-US", { timeZone: tz }));
    const diff = (target.getTime() - local.getTime()) / (1000 * 60 * 60);
    const rounded = Math.round(diff);
    return rounded === 0 ? 'Same as local' : `${rounded > 0 ? '+' : ''}${rounded} hrs`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold tracking-tight">World Clock</h2>
        <button className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <i className="fas fa-plus mr-2"></i> Add City
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((city) => (
          <div key={city.name} className="glass p-6 rounded-3xl flex items-center gap-6 hover:bg-white/5 transition-colors group">
            <AnalogClock timezone={city.tz} size={100} />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{city.name}</h3>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{getOffset(city.tz)}</p>
                </div>
                <div className="mono text-2xl font-bold group-hover:text-glow transition-all">
                  {getTimeString(city.tz)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
