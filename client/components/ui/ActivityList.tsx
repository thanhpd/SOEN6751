import { Activity } from '../../constants/types';
import { InPersonActivityItem } from '@/components/ui/InPersonActivityItem';
import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ActivityDetailsPopup from './ActivityDetailsPopup';
import useCalendarStore from '@/store/CalendarStore';
import { useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const InPersonActivityList: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const route = useRoute();
    const isInPersonScreen = route.name === 'InPerson';
    
    const filteredActivities = useMemo(() => {
        if (selectedCategory === 'All Activities') {
            return activityItems;
        }
        return activityItems.filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    const handlePress = (activity: Activity) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectedActivity(null);
        setModalVisible(false);
    };

    const addEvent = useCalendarStore((state) => state.addEvent);
    const addNotification = useCalendarStore((state) => state.addNotification);
    const handleBook = (activity: Activity) => {
        console.log('handlebook', activity);
        const days = activity.days.split(',').map(day => day.trim());
        days.forEach(day => {
            const formattedDate = getFormattedDate(day);

            function getFormattedDate(day: string): string {
                const today = new Date();
                const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    .findIndex(d => d.toLowerCase() === day.toLowerCase());

                let nextDate = new Date(today);
                nextDate.setDate(today.getDate() + ((7 + dayIndex - today.getDay()) % 7));

                return nextDate.toISOString().split('T')[0];
            }

            const activityColors = {
                InPersonActivity: 'lightblue',
                online: 'lightgreen',
                personal: 'orange',
                nutrition: 'peachpuff',

              };
              
              const highlightColor = activityColors[activity.type as keyof typeof activityColors] || 'gray';


            const timeStart = activity.time.substring(0, activity.time.indexOf('-')).trim();
            const timeEnd = activity.time.substring(activity.time.indexOf('-') + 1).trim();

            const hasConflict = useCalendarStore.getState().events.some(event => {
                const existingDate = event.date;
                const existingStartTime = event.activity.time.substring(0, 7).trim();
                const existingEndTime = event.activity.time.substring(9, 17).trim();

                if (existingDate !== formattedDate) return false;

                const convertTo24HourFormat = (time: string): number => {
                    console.log('time', time);
                    const [hourMinute, period] = time.split(/(AM|PM)/i);
                    let [hour, minute] = hourMinute.split(':').map(Number);
                    if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12;
                    if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
                    return hour * 60 + minute; // Convert to minutes for easier comparison
                };

                const startMinutes = convertTo24HourFormat(timeStart);
                const endMinutes = convertTo24HourFormat(timeEnd);
                const existingStartMinutes = convertTo24HourFormat(existingStartTime);
                const existingEndMinutes = convertTo24HourFormat(existingEndTime);

                return (
                    (startMinutes >= existingStartMinutes && startMinutes < existingEndMinutes) ||
                    (endMinutes > existingStartMinutes && endMinutes <= existingEndMinutes) ||
                    (startMinutes <= existingStartMinutes && endMinutes >= existingEndMinutes)
                );
            });

            console.log('hasConflict', hasConflict);
            if (hasConflict) {
                // **Add Notification**
                addNotification(
                    `${activity.title}`,
                    `Conflict ${day} at ${activity.time} at ${activity.location}.`
                );
                return;
            }

            addEvent({
                id: uuidv4(),
                title: activity.title,
                date: formattedDate,
                selected: true,
                selectedColor: highlightColor,
                activity: activity,
            });
            // **Add Notification**
            addNotification(
                `${activity.title}`,
                `Your class is booked for ${day} at ${activity.time} at ${activity.location}.`
            );
        });

        handleClose();
    };


    return (
        <View style={{ flex: 1 }}>
        <FlatList
            data={filteredActivities}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
                    <InPersonActivityItem activity={item} />
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        {modalVisible && selectedActivity && (
            <ActivityDetailsPopup
                visible={modalVisible}
                activity={selectedActivity}
                handleClose={handleClose}
                handleBook={() => handleBook(selectedActivity)}
            />
        )}
    </View>
    );
};

const activityItems: Activity[] = [
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
        type: 'InPersonActivity',
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
        type: 'InPersonActivity',
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
        type: 'InPersonActivity',
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
        type: 'InPersonActivity',
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
        type: 'online',
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
        type: 'online',
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
        type: 'online',
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
        type: 'online',
        category: 'Drop-In Recreation',
    },
]
