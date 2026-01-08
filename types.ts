
export type Tab = 'world' | 'alarm' | 'stopwatch' | 'timer';

export interface Alarm {
  id: string;
  time: string; // "HH:mm"
  label: string;
  enabled: boolean;
  days: number[]; // 0-6 (Sun-Sat)
}

export interface WorldClockCity {
  id: string;
  name: string;
  timezone: string;
}

export interface Lap {
  id: number;
  time: number;
  overall: number;
}
