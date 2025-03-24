import { Activity } from '../../constants/types'
import { InPersonActivityItem } from '@/components/ui/InPersonActivityItem'
import React, { useState, useMemo } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import ActivityDetailsPopup from './ActivityDetailsPopup'
import useCalendarStore from '@/store/CalendarStore'
import { useRoute } from '@react-navigation/native'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import useNotificationStore from '@/store/NotificationStore'

export const ActivityList: React.FC<{ activities: Activity[] }> = ({
    activities,
}) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    )
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { scheduleNotification, addNotification } = useNotificationStore()

    const route = useRoute()
    const isInPersonScreen = route.name === 'InPerson'

    const handlePress = (activity: Activity) => {
        setSelectedActivity(activity)
        setModalVisible(true)
    }

    const handleClose = () => {
        setSelectedActivity(null)
        setModalVisible(false)
    }

    const showDummyNotification = () => {
        scheduleNotification(
            new Date(Date.now() + 1000),
            `Upcoming activity: ${selectedActivity?.title}`,
            `${selectedActivity?.title} is scheduled for ${selectedActivity?.time} at ${selectedActivity?.location}.`
        )
    }

    const addEvent = useCalendarStore(state => state.addEvent)

    const handleBook = (activity: Activity) => {
        const days = activity.days.split(',').map(day => day.trim())
        days.forEach(day => {
            for (let weekOffset = 0; weekOffset < 8; weekOffset++) {
                const formattedDate = getFormattedDateForWeek(day, weekOffset)

                function getFormattedDateForWeek(
                    day: string,
                    weekOffset: number
                ): string {
                    const today = new Date()
                    const dayIndex = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ].findIndex(d => d.toLowerCase() === day.toLowerCase())

                    let nextDate = new Date(today)
                    nextDate.setDate(
                        today.getDate() +
                            ((7 + dayIndex - today.getDay()) % 7) +
                            weekOffset * 7
                    )

                    return nextDate.toISOString().split('T')[0]
                }

                const id = uuidv4()
                addEvent({
                    id: id,
                    date: formattedDate,
                    activity: activity,
                })

                // **Add Notification**
                const existingEvent = useCalendarStore
                    .getState()
                    .events.find(event => event.id === id)
                if (!existingEvent) {
                    // Add notification for the event if needed.
                    // addNotification(
                    //     `${activity.title}`,
                    //     `Your class is booked for ${day} at ${activity.time} at ${activity.location}.`
                    // );
                }
            }
        })

        if (activity.title.toLowerCase().includes('test')) {
            addNotification(
                new Date(Date.now() + 1000),
                `${selectedActivity?.title}`,
                `The activity is scheduled for ${selectedActivity?.time} at ${selectedActivity?.location}.`
            )
            showDummyNotification()
        }

        handleClose()
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={activities}
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
