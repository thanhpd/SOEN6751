import { Activity } from '@/constants/types';
import {create} from 'zustand';

interface ActivityStore {
  activities: Activity[];
}

const defaultActivityItems: Activity[] = [
    {
        title: 'Test Activity',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Wednesday',
        time: '5:30 PM - 6:30 PM',
        image: '../../assets/images/cardio.png',
        type: 'InPerson',
        category: 'Dance',
    },
  {
      title: 'Cardio Dance',
      instructor: 'Danielle Hubbard',
      location: 'SGW – Le Gym – Studio C',
      price: '100',
      description:
          'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Monday, Wednesday, Friday',
      time: '5:30 PM - 6:30 PM',
      image: '../../assets/images/cardio.png',
      type: 'InPerson',
      category: 'Dance',
  },
  {
      title: 'Zumba Fitness',
      instructor: 'Veronica Aguirre',
      location: 'SGW - Le Gym – Gymnasium',
      price: '55',
      description:
          'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Tuesday, Thursday',
      time: '5:30 PM - 6:30 PM',
      image: '../../assets/images/zumba.png',
      type: 'InPerson',
      category: 'Dance',
  },
  {
      title: 'Total Body Fitness',
      instructor: 'Daphne Cunliffe',
      location: 'SGW - Le Gym – Gymnasium',
      price: '100',
      description:
          'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
      days: 'Monday, Wednesday, Friday',
      time: '12:00 PM - 1:00 PM',
      image: '../../assets/images/aero.png',
      type: 'InPerson',
      category: 'Aerobics',
  },
  {
      title: 'Hard Core',
      instructor: 'Vila Woo',
      location: 'SGW - Le Gym – Gymnasium',
      price: '100',
      description:
          'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
      days: 'Saturday, Sunday',
      time: '12:00 PM - 1:00 PM',
      image: '../../assets/images/exercise_classes.png',
      type: 'InPerson',
      category: 'Fitness & Relaxation',
  },

  {
      title: 'Cardio Dance-Online',
      instructor: 'Danielle Hubbard',
      location: 'Online',
      price: '100',
      description:
          'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Monday, Wednesday, Friday',
      time: '8:30 PM - 10:30 PM',
      image: '../../assets/images/cardio.png',
      type: 'InPerson',
      category: 'Spinning',
  },
  {
      title: 'Zumba Fitness-Online',
      instructor: 'Veronica Aguirre',
      location: 'Online',
      price: '55',
      description:
          'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
      days: 'Tuesday, Thursday',
      time: '2:30 PM - 4:30 PM',
      image: '../../assets/images/zumba.png',
      type: 'Online',
      category: 'Instructional Activities',
  },
  {
      title: 'Total Body Fitness-Online',
      instructor: 'Daphne Cunliffe',
      location: 'Online',
      price: '100',
      description:
          'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
      days: 'Monday, Wednesday, Friday',
      time: '4:00 PM - 5:00 PM',
      image: '../../assets/images/aero.png',
      type: 'Online',
      category: 'Martial Arts',
  },
  {
      title: 'Hard Core-Online',
      instructor: 'Vila Woo',
      location: 'Online',
      price: '100',
      description:
          'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
      days: 'Saturday, Sunday',
      time: '4:00 PM - 5:00 PM',
      image: '../../assets/images/exercise_classes.png',
      type: 'Online',
      category: 'Drop-In Recreation',
  },
];


const useActivityStore = create<ActivityStore>((set) => ({
  activities: defaultActivityItems,
}));

export default useActivityStore;