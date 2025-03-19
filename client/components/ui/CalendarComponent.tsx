import { CalendarEvent } from '@/constants/types'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/stores/CalendarStore'

const CalendarComponent = () => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null
    )
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { events } = useCalendarStore()

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay: string = day.dateString
        const event = events.find(event => event.date === selectedDay)

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
                markedDates={events.reduce((acc: any, event: any) => {
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
