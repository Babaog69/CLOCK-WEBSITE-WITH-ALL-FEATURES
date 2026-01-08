
import React, { useState } from 'react';
import { Alarm } from '../types';

const AlarmView: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: '1', time: '06:30', label: 'Wake Up', enabled: true, days: [1, 2, 3, 4, 5] },
    { id: '2', time: '08:00', label: 'Workout', enabled: false, days: [0, 6] },
    { id: '3', time: '22:00', label: 'Sleep', enabled: true, days: [0, 1, 2, 3, 4, 5, 6] },
  ]);

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const daysAbbr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold tracking-tight">Alarms</h2>
        <button className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <i className="fas fa-plus mr-2"></i> New Alarm
        </button>
      </div>

      <div className="space-y-4">
        {alarms.map((alarm) => (
          <div key={alarm.id} className={`glass p-6 rounded-3xl transition-all duration-500 ${!alarm.enabled && 'opacity-40 grayscale'}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="mono text-5xl font-bold tracking-tighter">{alarm.time}</span>
                <span className="text-sm text-white/60 mt-1 uppercase tracking-widest">{alarm.label}</span>
              </div>
              <button 
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${alarm.enabled ? 'bg-white' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${alarm.enabled ? 'left-7 bg-black' : 'left-1 bg-white/20'}`} />
              </button>
            </div>
            
            <div className="flex gap-2">
              {daysAbbr.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    alarm.days.includes(idx) 
                      ? 'border-white bg-white text-black' 
                      : 'border-white/10 text-white/30'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmView;
