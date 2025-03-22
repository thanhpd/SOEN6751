import { CalendarEvent } from '@/constants/types'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/stores/CalendarStore'
import { useAuth } from '@/hooks/useAuth';
import { setCalendarEvents } from '../../store/CalendarDb';
import { removeCalendarEvent } from '../../store/CalendarDb';
import { addCalendarEvent } from '../../store/CalendarDb';

import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store'


const defaultBookedEvents: CalendarEvent[] = [
    {
      id: '2025-04-03',
      title: 'Cardio Dance',
      date: '2025-04-04',
      selected: true, 
      selectedColor: '#EC7063',
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
        inPerson: true
      },
      user_id : "3"
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
        price: 25,
        inPerson: false
    },
      user_id : "3"
  }];

const CalendarComponent = () => {

    const { currentUser } = useAuth(); // Get currentUser from useAuth
  const userId = currentUser?.id || ''; // Safely access the id property

    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null
    )
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const dispatch = useAppDispatch();
  const calendarEventss = Object.values(useAppSelector((state: RootState) => state.CalendarDb.entities)) as CalendarEvent[];

  // Filter and set initial events when the user logs in
// useEffect(() => {
//     const userEvents = defaultBookedEvents.filter((event: CalendarEvent) => event.user_id === userId);
//     userEvents.forEach((event) => {
//         dispatch(addCalendarEvent(event));
//     });
//   }, [userId, dispatch]);

    
    
   const calendarEvents = calendarEventss.filter(event => event.user_id === userId);

    // console.log("Current events in store:", events);

    console.log("Current events store:", calendarEvents);

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay: string = day.dateString
        const event = Array.isArray(calendarEvents) 
            ? calendarEvents.find((calendarEvent: CalendarEvent) => calendarEvent.date === selectedDay) 
            : undefined;

        if (event) {
            setSelectedEvent(event ?? null)
            setModalVisible(true)
        }
    }

    const handleClose = () => {
        setSelectedEvent(null)
        setModalVisible(false)
    }

    return (
        <View className="p-1 bg-white">
        <Text className="text-center text-xl font-bold text-black">
            Calendar
        </Text>
        <Text className="text-center text-base text-gray-600">
            View your upcoming bookings
        </Text>

        {/* Set a fixed height for the calendar */}
        <View style={{ height: 280, width :340, }}>
            <Calendar
                onDayPress={handleDayPress}
                current={'2025-03-20'}
                markedDates={calendarEvents.reduce((acc: any, event: any) => {
                    acc[event.date] = {
                        selected: event.selected,
                        selectedColor: event.selectedColor,
                        activity: event.activity,
                    }
                    return acc
                }, {})}
                theme={{
                    calendarBackground: '#fff',
                    textSectionTitleColor: '#000',
                    dayTextColor: '#000',
                    todayTextColor: '#000',
                    monthTextColor: '#000',
                    arrowColor: '#000',
                }}
            />
        </View>

        {/* Legend */}
        <View className="flex-row justify-center mt-4">
            <View className="flex-row items-center mx-4">
                <View className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                <Text className="text-black">In-Person</Text>
            </View>
            <View className="flex-row items-center mx-4">
                <View className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                <Text className="text-black">Online</Text>
            </View>
        </View>

        {modalVisible && selectedEvent && (
                <EventDetailsPopup
                    visible={modalVisible}
                    event={selectedEvent}
                    close={handleClose}
                />
            )}
    </View>
    )
}

export default CalendarComponent
