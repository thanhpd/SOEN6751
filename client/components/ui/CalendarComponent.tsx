import { Activity } from '@/constants/types'
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'

const CalendarComponent = () => {
    const [selectedDay, setSelectedDay] = useState<any | null>(null)
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    )
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const handleDayPress = (day: any) => {
        const activity: Activity = {
            title: 'Cardio Dance',
            instructor: 'Danielle Hubbard',
            location: 'SGW – Le Gym – Studio C',
            days: 'Monday, Wednesday, Friday',
            time: '5:30 PM – 6:30 PM',
            description: '',
            price: '',
        }
        setSelectedDay(day)
        setSelectedActivity(activity)
        setModalVisible(true)
    }

    const handleClose = () => {
        setSelectedDay(null)
        setSelectedActivity(null)
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
                current={'2023-11-01'}
                markedDates={{
                    '2023-11-03': { selected: true, selectedColor: '#F4D03F' },
                    '2023-11-07': { selected: true, selectedColor: '#EC7063' },
                    '2023-11-18': { selected: true, selectedColor: '#F4D03F' },
                    '2023-11-23': { selected: true, selectedColor: '#EC7063' },
                }}
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

        {modalVisible && selectedActivity && (
            <EventDetailsPopup
                visible={modalVisible}
                activity={selectedActivity}
                handleClose={handleClose}
                month={new Date(selectedDay.dateString).toLocaleString(
                    'default',
                    { month: 'long' }
                )}
            />
        )}
    </View>
    )
}

export default CalendarComponent
