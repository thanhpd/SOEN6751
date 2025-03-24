import { CalendarEvent } from '@/constants/types'
import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/store/CalendarStore'
import { Colors } from '@/constants/Colors'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const CalendarComponent = () => {
    const { events } = useCalendarStore();
    const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noEventModalVisible, setNoEventModalVisible] = useState<boolean>(false)

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay: string = day.dateString
        const eventList = events.filter(event => event.date === selectedDay)
    
        if (eventList.length > 0) {
            console.log('Activities for selected day:', eventList)
            setSelectedEvents(eventList)
            setModalVisible(true)
        } else {
            console.log('No events for selected day')
            setNoEventModalVisible(true)
        }
    }

    const handleClose = () => {
        setSelectedEvents([])
        setModalVisible(false)
    }

    const handleNoEventClose = () => {
        setNoEventModalVisible(false)
    }

    const markedDates = events.reduce((acc: any, event: CalendarEvent) => {
    if (!acc[event.date]) {
        acc[event.date] = { dots: [] };
    }

    // Check if the event already exists in the marked dots
    const isDuplicate = acc[event.date].dots.some(
        (dot: any) => dot.key === event.activity
    );


const activityColors = {
    InPerson: 'blue',
    Online: 'green',
    Personal: 'orange',
    Nutrition: 'red',

    };
    
    const highlightColor = activityColors[event.activity.type as keyof typeof activityColors] || 'gray';
    if (!isDuplicate) {
        acc[event.date].dots.push({
            color: highlightColor || 'gray',
            key: uuidv4(),
            
        });
    }

    return acc;
}, {});

    return (
        <View className="p-1 bg-white">
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

            {modalVisible && selectedEvents.length > 0 && (
                <EventDetailsPopup
                    visible={modalVisible}
                    events={selectedEvents}
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
