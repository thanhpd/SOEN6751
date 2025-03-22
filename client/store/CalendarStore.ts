import {create} from 'zustand';

interface Notification {
  id: number;
  message: string;
  date: string;
  details: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  selected: boolean;
  selectedColor: string;
  activity: any;
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
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
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

export default useCalendarStore;