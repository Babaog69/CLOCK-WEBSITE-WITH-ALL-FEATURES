
import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import WorldClock from './components/WorldClock';
import AlarmView from './components/AlarmView';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import ClockNav from './components/ClockNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('world');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'world': return <WorldClock />;
      case 'alarm': return <AlarmView />;
      case 'stopwatch': return <Stopwatch />;
      case 'timer': return <Timer />;
      default: return <WorldClock />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center selection:bg-white selection:text-black">
      {/* Header / Digital Clock Overlay */}
      <header className="w-full max-w-4xl p-8 flex flex-col items-center justify-center animate-in fade-in duration-700">
        <h1 className="text-sm font-light tracking-[0.4em] uppercase opacity-40 mb-2">Monochrome Time</h1>
        <div className="mono text-7xl md:text-8xl font-bold tracking-tighter text-glow">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
        <div className="text-xs tracking-widest uppercase opacity-40 mt-4">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </header>

      {/* Main Feature Area */}
      <main className="flex-1 w-full max-w-3xl px-6 pb-32 overflow-y-auto">
        <div key={activeTab} className="transition-all duration-500 transform animate-in slide-in-from-bottom-4">
          {renderContent()}
        </div>
      </main>

      {/* Persistent Navigation */}
      <ClockNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
