export interface Activity {
    title: string;
    instructor: string;
    description: string;
    location: string;
    price: string;
    time: string;
    days: string;
    image?: string;
  }
  
  export interface Category {
    name: string;
    isActive?: boolean;
  }
  