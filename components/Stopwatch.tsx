
import React, { useState, useEffect, useRef } from 'react';
import { Lap } from '../types';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  // Fix: Added initial value to useRef to resolve "Expected 1 arguments, but got 0" error.
  // Using undefined for the animation frame handle and 0 for the start time.
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);

  const animate = (now: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = now - time;
    setTime(now - startTimeRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = 0;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      min: minutes.toString().padStart(2, '0'),
      sec: seconds.toString().padStart(2, '0'),
      cs: centiseconds.toString().padStart(2, '0')
    };
  };

  const handleLap = () => {
    const lastLapOverall = laps.length > 0 ? laps[0].overall : 0;
    const newLap: Lap = {
      id: laps.length + 1,
      time: time - lastLapOverall,
      overall: time
    };
    setLaps([newLap, ...laps]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const { min, sec, cs } = formatTime(time);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-full aspect-square max-w-[320px] rounded-full border border-white/10 flex flex-col items-center justify-center bg-black/40 overflow-hidden">
        {/* Visual Progress Ring (Static or dynamic could go here) */}
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        
        <div className="z-10 text-center">
          <div className="mono text-6xl font-bold tracking-tighter">
            {min}:{sec}
            <span className="text-3xl opacity-30">.{cs}</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-2">Stopwatch</div>
        </div>

        {/* Dynamic sweeping line */}
        <div 
          className="absolute w-0.5 h-[48%] bg-white/50 origin-bottom transition-transform duration-75"
          style={{ 
            bottom: '50%',
            transform: `rotate(${(time / 1000) * 6}deg)`
          }}
        />
      </div>

      <div className="flex gap-4 w-full">
        {isRunning || time > 0 ? (
          <button 
            onClick={isRunning ? handleLap : handleReset}
            className="flex-1 glass py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            {isRunning ? 'Lap' : 'Reset'}
          </button>
        ) : null}
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${
            isRunning ? 'bg-white text-black' : 'bg-white text-black'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>

      <div className="w-full space-y-2 max-h-[240px] overflow-y-auto">
        {laps.map((lap) => {
          const l = formatTime(lap.time);
          const o = formatTime(lap.overall);
          return (
            <div key={lap.id} className="flex justify-between items-center py-4 border-b border-white/5 px-2 animate-in fade-in slide-in-from-right-2">
              <span className="text-white/40 font-bold text-xs uppercase tracking-tighter">Lap {lap.id}</span>
              <div className="text-right">
                <div className="mono text-lg">{l.min}:{l.sec}.{l.cs}</div>
                <div className="text-[10px] text-white/30 mono">{o.min}:{o.sec}.{o.cs}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stopwatch;
