export interface Activity {
    title: string;
    instructor: string;
    description: string;
    location: string;
    price: number;
    time: string;
    days: string;
    image?: string;
    type?: string;
    category?: string;
  }
  
  export interface Category {
    name: string;
    isActive?: boolean;
  }
  
  
export interface CalendarEvent {
  id: string;
  date: string;
  activity: Activity;
  user_id : string
  // bookedActivities: Activity[];
}


export interface Notification {
  id: number;
  title: string;
  dateTime: Date;
  body: string;
}