import { CalendarEvent } from '@/constants/types';
import {create} from 'zustand';

interface Notification {
  id: number;
  message: string;
  date: string;
  details: string;
}

interface CalendarStore {
  events: CalendarEvent[];
  notifications: Notification[];
  addEvent: (event: CalendarEvent) => void;
  addNotification: (message: string, details: string) => void;
}

const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],
  notifications: [],
  addEvent: (event) => set((state) => {
    if (!conflictCheck(event, state.events)) {
      set({ events: [...state.events, event] });
      return { events: [...state.events, event] };
    } else {
      console.warn('Event conflict detected. Event not added {event}', event);
      return state;
    }
  }),
  addNotification: (message, details) => {
      const newNotification: Notification = {
          id: Date.now(),
          message,
          date: new Date().toDateString(),
          details,
      };
      set((state) => ({ notifications: [newNotification, ...state.notifications] }));
  },
}));


function conflictCheck (event: CalendarEvent, events: CalendarEvent[]) {

  const date = event.date;
  const time = event.activity.time;
  const {startTime, endTime} = getTimeRange(time);
  const hasConflict = events.some(event => {
      if (event.date !== date) return false;

      const {startTime: eventStartTime, endTime: eventEndTime} = getTimeRange(event.activity.time);
      return (startTime >= eventStartTime && startTime < eventEndTime) 
        || (endTime > eventStartTime && endTime <= eventEndTime);
  });

  return hasConflict
}



function getTimeRange(time: string): { startTime: number, endTime: number } {
  // Function to convert 12-hour format to 24-hour integer format
  function convertTo24HourFormat(time: string): number {
    const [hourMinute, period] = time.split(/(AM|PM)/i);
    let [hour, minute] = hourMinute.split(':').map(Number);
    if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
    return hour * 100 + minute; // Convert to 24-hour integer format (e.g., 1730)
  }

  const [startTime, endTime] = time.split('-').map(t => t.trim());
  return {
    startTime: convertTo24HourFormat(startTime),
    endTime: convertTo24HourFormat(endTime),
  };
}


export default useCalendarStore;