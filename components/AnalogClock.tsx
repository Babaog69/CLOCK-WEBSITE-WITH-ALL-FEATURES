
import React, { useState, useEffect } from 'react';

interface AnalogClockProps {
  timezone?: string;
  size?: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timezone, size = 160 }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTargetTime = () => {
    if (!timezone) return time;
    return new Date(time.toLocaleString("en-US", { timeZone: timezone }));
  };

  const t = getTargetTime();
  const seconds = t.getSeconds();
  const minutes = t.getMinutes();
  const hours = t.getHours() % 12;

  const sDeg = (seconds / 60) * 360;
  const mDeg = ((minutes + seconds / 60) / 60) * 360;
  const hDeg = ((hours + minutes / 60) / 12) * 360;

  return (
    <div style={{ width: size, height: size }} className="relative rounded-full border border-white/20 flex items-center justify-center bg-black/40">
      {/* Markers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-white/30"
          style={{
            height: i % 3 === 0 ? '8px' : '4px',
            transform: `rotate(${i * 30}deg) translateY(-${size / 2 - 10}px)`,
          }}
        />
      ))}
      
      {/* Hour Hand */}
      <div 
        className="absolute w-1 bg-white rounded-full origin-bottom"
        style={{ 
          height: '25%', 
          bottom: '50%',
          transform: `rotate(${hDeg}deg)` 
        }}
      />
      
      {/* Minute Hand */}
      <div 
        className="absolute w-0.5 bg-white/70 rounded-full origin-bottom"
        style={{ 
          height: '35%', 
          bottom: '50%',
          transform: `rotate(${mDeg}deg)` 
        }}
      />
      
      {/* Second Hand */}
      <div 
        className="absolute w-[1px] bg-white origin-bottom clock-sweep"
        style={{ 
          height: '42%', 
          bottom: '50%',
          transform: `rotate(${sDeg}deg)` 
        }}
      />
      
      {/* Center Dot */}
      <div className="absolute w-2 h-2 bg-white rounded-full z-10" />
    </div>
  );
};

export default AnalogClock;
