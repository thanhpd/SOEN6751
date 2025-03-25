import { CalendarEvent } from '@/constants/types'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventDetailsPopup from './EventDetailsPopup'
import useCalendarStore from '@/store/CalendarStore'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@/store'
import { RootState } from '@/store'
import { Colors } from '@/constants/Colors'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const CalendarComponent = () => {
    const { currentUser } = useAuth()
    const userId = currentUser?.id || ''
    const dispatch = useAppDispatch()

    const calendarEvents = Object.values(
        useAppSelector((state: RootState) => state.CalendarDb.entities)
    ).filter((event) => event.user_id === userId) as CalendarEvent[]

    const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[] | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noEventModalVisible, setNoEventModalVisible] = useState<boolean>(false)

    // 🛠 FIXED handleDayPress function
    const handleDayPress = (day: { dateString: string }) => {
        const selectedDay = day.dateString
        const eventList = calendarEvents.filter(event => event.date === selectedDay)

        if (eventList.length > 0) {
            setSelectedEvents(eventList) // Choose the first event
            setModalVisible(true)
        } else {
            setNoEventModalVisible(true)
        }
    }

    const handleClose = () => {
        setSelectedEvents(null)
        setModalVisible(false)
    }

    const handleNoEventClose = () => {
        setNoEventModalVisible(false)
    }

    // 🛠 FIXED Marked Dates Mapping
    const markedDates = calendarEvents.reduce((acc: any, event: CalendarEvent) => {
        if (!acc[event.date]) {
            acc[event.date] = { dots: [] }
        }

        const activityColors = {
            InPerson: 'blue',
            Online: 'green',
            Personal: 'orange',
            Nutrition: 'red',
        }

        const highlightColor = activityColors[event.activity.type as keyof typeof activityColors] || 'gray'

        // Prevent duplicate dots for the same type
        if (!acc[event.date].dots.some((dot: any) => dot.color === highlightColor)) {
            acc[event.date].dots.push({ color: highlightColor, key: uuidv4() })
        }

        return acc
    }, {})

    return (
        <View className="p-1 bg-white">
            <Text className="text-center text-xl font-bold text-black">
                Calendar
            </Text>
            <Text className="text-center text-base text-gray-600">
                View your upcoming bookings
            </Text>

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
                            width: 5,
                            height: 5,
                            borderRadius: 5,
                        },
                    }}
                />
            </View>

            {/* Legend for Activity Types */}
            <View className="flex-row justify-center mt-1">
                {[
                    { color: 'bg-blue-400', label: 'In-Person' },
                    { color: 'bg-green-400', label: 'Online' },
                    { color: 'bg-orange-400', label: 'Personal Train' },
                    { color: 'bg-red-400', label: 'Nutrition' },
                ].map((item, index) => (
                    <View key={index} className="flex-row items-center mx-1">
                        <View className={`w-3 h-3 rounded-full ${item.color} mr-2`} />
                        <Text className="text-black">{item.label}</Text>
                    </View>
                ))}
            </View>

            {/* Event Details Popup */}
            {modalVisible && selectedEvents && (
                <EventDetailsPopup
                    visible={modalVisible}
                    events={selectedEvents}
                    close={handleClose}
                />
            )}

            {/* No Event Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={noEventModalVisible}
                onRequestClose={handleNoEventClose}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <Text className="text-lg font-bold text-black text-center">
                            No Events
                        </Text>
                        <Text className="text-center text-gray-600 text-lg mt-2">
                            There are no activities scheduled for this day.
                        </Text>
                        <TouchableOpacity
                            onPress={handleNoEventClose}
                            className="bg-blue-600 p-3 rounded-lg"
                            style={{
                                backgroundColor: Colors.concordia.background,
                            }}
                        >
                            <Text className="text-center text-white xl">
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CalendarComponent
