import { Activity } from '../../constants/types'
import { InPersonActivityItem } from '@/components/ui/InPersonActivityItem'
import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import ActivityDetailsPopup from './ActivityDetailsPopup'
import useCalendarStore from '@/stores/CalendarStore'

export const InPersonActivityList = () => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    )
    const { events, addEvent, removeEvent, clearEvents } = useCalendarStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const handlePress = (activity: Activity) => {
        setSelectedActivity(activity)
        setModalVisible(true)
    }

    const handleClose = () => {
        setSelectedActivity(null)
        setModalVisible(false)
    }

    const handleBook = (activity: Activity) => {
        // find days to book
        const days = activity.days.split(',').map((day) => day.trim());
        console.log('Days:', days);
        days.forEach((day) => { 
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();

            // Find the next date matching the day
            const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].findIndex(
                (d) => d.toLowerCase() === day.toLowerCase()
            );

            let nextDate = new Date(today);
            nextDate.setDate(today.getDate() + ((7 + dayIndex - today.getDay()) % 7));

            if (nextDate.getMonth() !== currentMonth) {
                nextDate.setDate(nextDate.getDate() + 7); // Ensure it's in the current month
            }

            const formattedDate = nextDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            console.log('Formatted Date:', formattedDate + " day: " + day);
            // addEvent({
            //     id: activity.title,
            //     title: activity.title,
            //     date: '2023-11-03',
            //     selected: true,
            //     selectedColor: '#F4D03F',
            //     activity: activity
            // });
        });

        handleClose()
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={activityItems}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePress(item)}
                        activeOpacity={0.7}
                    >
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
    )
}

const activityItems: Activity[] = [
    {
        title: 'Cardio Dance',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Monday, Wednesday, Friday',
        time: '5:30 PM – 6:30 PM',
        image: '../../assets/images/cardio.png',
    },
    {
        title: 'Zumba Fitness',
        instructor: 'Veronica Aguirre',
        location: 'SGW – Le Gym – Gymnasium',
        price: '55',
        description:
            'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Tuesday, Thursday',
        time: '5:30 PM – 6:30 PM',
        image: '../../assets/images/zumba.png',
    },
    {
        title: 'Total Body Fitness',
        instructor: 'Daphne Cunliffe',
        location: 'SGW – Le Gym – Gymnasium',
        price: '100',
        description:
            'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
        days: 'Monday, Wednesday, Friday',
        time: '12:00 PM – 1:00 PM',
        image: '../../assets/images/aero.png',
    },
    {
        title: 'Hard Core',
        instructor: 'Vila Woo',
        location: 'SGW – Le Gym – Gymnasium',
        price: '100',
        description:
            'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
        days: 'Tuesday, Thursday',
        time: '12:00 PM – 1:00 PM',
        image: '../../assets/images/exercise_classes.png',
    },
]
