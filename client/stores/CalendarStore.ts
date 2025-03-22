import { Activity, CalendarEvent } from '@/constants/types';
import {create} from 'zustand';


interface CalendarState {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (eventId: string) => void;
  clearEvents: () => void;
}

const defaultBookedEvents: CalendarEvent[] = [
  {
    id: '2025-04-03',
    
    date: '2025-04-04',
    
    
      activity: {
      title: 'Cardio Dance',
      instructor: 'Danielle Hubbard',
      location: 'SGW – Le Gym – Studio C',
      price: 100,
      description:
        'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Monday, Wednesday, Friday',
      time: '5:30 PM - 6:30 PM',
      image: '../../assets/images/cardio.png',
      
    },
    user_id : "1"
  },
{
  id: '2025-03-25',
 
  date: '2025-03-25',
  
  
  activity: {
      title: 'Cooking Workshop',
      instructor: 'Chef Gordon',
      location: 'Community Center',
      days: 'Tuesday',
      time: '4:00 PM - 6:00 PM',
      description: 'Learn to cook delicious meals.',
      price: 25,
      
  },
    user_id : "1"
}];

const useCalendarStore = create<CalendarState>((set) => ({
  events: defaultBookedEvents,
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (eventId) =>
  set((state) => ({
    events: state.events.filter((event) => event.id !== eventId),
  })),
  clearEvents: () => set({ events: [] }),
}));

export default useCalendarStore;