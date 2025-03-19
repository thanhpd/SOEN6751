import { Activity } from '@/constants/types';
import {create} from 'zustand';

interface Event {
  id: string;
  title: string;
  date: string; // Date of the event, can be adjusted based on your needs    
  selected: boolean, 
  selectedColor: string,
  activity?: Activity;
}

interface CalendarState {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  clearEvents: () => void;
}

const defaultBookedEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Cardio Dance',
    date: '2023-11-03',
    selected: true, 
    selectedColor: '#F4D03F',
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
    }
  },
{
  id: 'event-2',
  title: 'Zumba Fitness',
  date: '2023-11-07',
  selected: true, 
  selectedColor: '#EC7063', 
  activity: {
      title: 'Cooking Workshop',
      instructor: 'Chef Gordon',
      location: 'Community Center',
      days: 'Tuesday',
      time: '4:00 PM - 6:00 PM',
      description: 'Learn to cook delicious meals.',
      price: '$25',
  }
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