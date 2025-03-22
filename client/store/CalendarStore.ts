import { CalendarEvent } from '@/constants/types';
import {create} from 'zustand';

interface Notification {
  id: number;
  message: string;
  date: string;
  details: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  selected: boolean;
  selectedColor: string;
  activity: any;
}

interface CalendarStore {
  events: Event[];
  notifications: Notification[];
  addEvent: (event: Event) => void;
  addNotification: (message: string, details: string) => void;
}


const defaultBookedEvents: CalendarEvent[] = [
  {
    id: '2025-03-03',
    title: 'Cardio Dance',
    date: '2025-03-03',
    selected: true, 
    selectedColor: '#EC7063',
      activity: {
      title: 'Cardio Dance',
      instructor: 'Danielle Hubbard',
      location: 'SGW – Le Gym – Studio C',
      price: '100',
      description:
        'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Monday, Wednesday, Friday',
      time: '5:30 PM - 6:30 PM',
      image: '../../assets/images/cardio.png',
      type: 'InPersonActivity',
    }
  },
{
  id: '2025-03-25',
  title: 'Zumba Fitness',
  date: '2025-03-25',
  selected: true, 
  selectedColor: '#F4D03F',
  activity: {
      title: 'Cooking Workshop',
      instructor: 'Chef Gordon',
      location: 'Community Center',
      days: 'Tuesday',
      time: '4:00 PM - 6:00 PM',
      description: 'Learn to cook delicious meals.',
      price: '$25',
      type: 'InPersonActivity',
  }
}];

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