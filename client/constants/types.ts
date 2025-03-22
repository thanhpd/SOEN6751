export interface Activity {
    title: string;
    instructor: string;
    description: string;
    location: string;
    price: string;
    time: string;
    days: string;
    image?: string;
    type?: 'InPerson' | 'Online' | 'Personal' | 'Nutrition';
    category?: string;
  }
  
  export interface Category {
    name: string;
    isActive?: boolean;
  }
  
  export interface CalendarEvent {
    id: string;
    title: string;
    date: string; // Date of the event, can be adjusted based on your needs    
    selected: boolean, 
    selectedColor: string,
    activity?: Activity;
  }
  