
import React from 'react';
import { Tab } from '../types';

interface ClockNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const ClockNav: React.FC<ClockNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: Tab; icon: string; label: string }[] = [
    { id: 'world', icon: 'fa-globe', label: 'World' },
    { id: 'alarm', icon: 'fa-bell', label: 'Alarm' },
    { id: 'stopwatch', icon: 'fa-stopwatch', label: 'Watch' },
    { id: 'timer', icon: 'fa-hourglass-half', label: 'Timer' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl border border-white/10 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center w-16 py-2 rounded-full transition-all duration-300 ${
            activeTab === item.id 
              ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <i className={`fas ${item.icon} text-sm`}></i>
          <span className="text-[10px] uppercase tracking-tighter mt-1 font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default ClockNav;
