
import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [duration, setDuration] = useState(0); // in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputVal, setInputVal] = useState('05:00');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // alert("Timer finished!");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (!isActive) {
      if (timeLeft === 0) {
        const [m, s] = inputVal.split(':').map(Number);
        const total = (m || 0) * 60 + (s || 0);
        setDuration(total);
        setTimeLeft(total);
      }
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center">
        {/* Circular Progress Bar SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%" cy="50%" r="48%"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/10"
          />
          <circle
            cx="50%" cy="50%" r="48%"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="301.6%"
            strokeDashoffset={`${301.6 * (1 - progress / 100)}%`}
            className="text-white transition-all duration-1000 linear"
            strokeLinecap="round"
          />
        </svg>

        <div className="z-10 text-center">
          {isActive || timeLeft > 0 ? (
            <div className="mono text-7xl font-bold tracking-tighter animate-pulse-slow">
              {formatTime(timeLeft)}
            </div>
          ) : (
            <input 
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="mono text-7xl font-bold tracking-tighter bg-transparent border-none text-center focus:ring-0 focus:outline-none w-full"
              placeholder="00:00"
            />
          )}
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-2">Countdown</div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={handleReset}
          disabled={!isActive && timeLeft === 0}
          className="flex-1 glass py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-20"
        >
          Cancel
        </button>
        <button 
          onClick={handleStart}
          className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest bg-white text-black transition-all"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {[1, 5, 10].map(m => (
          <button 
            key={m}
            onClick={() => {
              setDuration(m * 60);
              setTimeLeft(m * 60);
              setIsActive(false);
            }}
            className="glass py-4 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-white/10"
          >
            {m}m
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
