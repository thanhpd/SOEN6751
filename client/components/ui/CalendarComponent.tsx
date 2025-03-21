import { CalendarEvent } from '@/constants/types'
import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/stores/CalendarStore'
import { Colors } from '@/constants/Colors'

const CalendarComponent = () => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noEventModalVisible, setNoEventModalVisible] = useState<boolean>(false)
    const { events } = useCalendarStore()

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay: string = day.dateString
        const eventList = events.filter(event => event.date === selectedDay)
    
        if (eventList.length > 0) {
            console.log('Activities for selected day:', eventList)
            setSelectedEvent(eventList[0] ?? null)
            setModalVisible(true)
        } else {
            console.log('No events for selected day')
            setNoEventModalVisible(true)
        }
    }

    const handleClose = () => {
        setSelectedEvent(null)
        setModalVisible(false)
    }

    const handleNoEventClose = () => {
        setNoEventModalVisible(false)
    }

    const markedDates = events.reduce((acc: any, event: any) => {
        if (!acc[event.date]) {
            acc[event.date] = { dots: [] };
        }
        if (!acc[event.date].dots.some((dot: any) => dot.key === (event.activity || `default-${event.date}-${acc[event.date].dots.length}`))) {
            acc[event.date].dots.push({
                color: event.selectedColor || 'blue',
                key: event.activity || `default-${event.date}-${acc[event.date].dots.length}`,
            });
        }
        return acc
    }, {})

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
                    }}
                />
            </View>

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
