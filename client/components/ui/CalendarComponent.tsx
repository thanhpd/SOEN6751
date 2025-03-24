import { CalendarEvent } from '@/constants/types'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/store/CalendarStore'
import { useAuth } from '@/hooks/useAuth';
import { setCalendarEvents } from '../../store/CalendarDb';
import { removeCalendarEvent } from '../../store/CalendarDb';
import { addCalendarEvent } from '../../store/CalendarDb';

import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store'


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

        type: 'InPerson' // Added type property
      },
      user_id : "3"
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

        type: 'Online' // Added type property
    },

    user_id: "3"
  }
];
import { Colors } from '@/constants/Colors'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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

    //console.log("Current events store:", calendarEvents);
    const [noEventModalVisible, setNoEventModalVisible] = useState<boolean>(false)

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay: string = day.dateString
        const event = Array.isArray(calendarEvents)
            ? calendarEvents.find((calendarEvent: CalendarEvent) => calendarEvent.date === selectedDay)
            : undefined;

        if (event) {
            setSelectedEvent(event ?? null)
        const eventList = [event]; // Wrap the single event in an array

        if (eventList.length > 0) {
            console.log('Activities for selected day:', eventList)
            setSelectedEvent(event)
            setModalVisible(true)
        } else {
            console.log('No events for selected day')
            setNoEventModalVisible(true)
            }
        }
    }

    const handleClose = () => {
        setSelectedEvent(null)
        setModalVisible(false)
    }

    const handleNoEventClose = () => {
        setNoEventModalVisible(false)
    }

    const markedDates = calendarEvents.reduce((acc: any, event: CalendarEvent) => {
    if (!acc[event.date]) {
        acc[event.date] = { dots: [] };
    }

    // Check if the event already exists in the marked dots
    const isDuplicate = acc[event.date].dots.some(
        (dot: any) => dot.key === event.activity
    );

    console.log(event.activity.type)

const activityColors = {
    InPerson: 'blue',
    Online: 'green',
    Personal: 'orange',
    Nutrition: 'red',

    };

    const highlightColor = event.activity ? activityColors[event.activity.type as keyof typeof activityColors] || 'gray' : 'gray';
    if (!isDuplicate) {
        acc[event.date].dots.push({
            color: highlightColor || 'gray',
            key: uuidv4(),

        });
    }

    return acc;
}, {});

    return (
        <View className="p-1  bg-white">
            <Text className="text-center text-xl font-bold text-black">Calendar</Text>
            <Text className="text-center text-base text-gray-600">View your upcoming bookings</Text>

            <View className="h-50 w-50">
                <Calendar
                    onDayPress={handleDayPress}
                    current={'2025-03-20'}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    theme={{
                        calendarBackground: '#fff',
                        textSectionTitleColor: '#000',
                        dayTextColor: '#000',
                        todayTextColor: '#000',
                        monthTextColor: '#000',
                        arrowColor: '#000',
                        dotStyle: {
                            width: 5, // Increase the width of the dots
                            height: 5, // Increase the height of the dots
                            borderRadius: 5, // Ensure the dots remain circular
                        },
                    }}
                />
            </View>

            <View className="flex-row justify-center mt-1">
                <View className="flex-row items-center mx-1">
                    <View className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                    <Text className="text-black">In-Person</Text>
                </View>
                <View className="flex-row items-center mx-1">
                    <View className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                    <Text className="text-black">Online</Text>
                </View>
                <View className="flex-row items-center mx-1">
                    <View className="w-3 h-3 rounded-full bg-orange-400 mr-2" />
                    <Text className="text-black">Personal Train</Text>
                </View>
                <View className="flex-row items-center mx-1">
                    <View className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                    <Text className="text-black">Nutrition</Text>
                </View>
            </View>

            {modalVisible && selectedEvent && (
                <EventDetailsPopup
                    visible={modalVisible}
                    events={selectedEvent ? [selectedEvent] : []}
                    close={handleClose}
                />
            )}

            <Modal
                transparent={true}
                animationType="fade"
                visible={noEventModalVisible}
                onRequestClose={handleNoEventClose}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <Text className="text-lg font-bold text-black text-center">No Events</Text>
                        <Text className="text-center text-gray-600 text-lg mt-2">There are no activities scheduled for this day.</Text>
                        <TouchableOpacity onPress={handleNoEventClose} className="bg-blue-600 p-3 rounded-lg "
                                                    style={{
                                                        backgroundColor: Colors.concordia.background,
                                                    }}
                                                >
                                                    <Text className="text-center text-white xl">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CalendarComponent
