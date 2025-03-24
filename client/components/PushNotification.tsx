import { useState, useEffect, useRef } from 'react'
import * as Device from 'expo-device'
import {
    View,
    Text,
    Button,
    Alert,
    FlatList,
    StyleSheet,
    Platform,
} from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import * as Notifications from 'expo-notifications'
import DateTimePicker from '@react-native-community/datetimepicker'
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

const CalendarComponent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)
    const [reminders, setReminders] = useState<
        { date: string; time: string }[]
    >([])
    const [markedDates, setMarkedDates] = useState<{
        [date: string]: { marked: boolean; dotColor: string }
    }>({})
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false)

    const [expoPushToken, setExpoPushToken] = useState('')
    const [channels, setChannels] = useState<
        Notifications.NotificationChannel[]
    >([])
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined)
    const notificationListener = useRef<Notifications.EventSubscription>()
    const responseListener = useRef<Notifications.EventSubscription>()

    useEffect(() => {
        registerForPushNotificationsAsync().then(
            token => token && setExpoPushToken(token)
        )

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value =>
                setChannels(value ?? [])
            )
        }
        notificationListener.current =
            Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification)
            })

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response)
            })

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                )
            responseListener.current &&
                Notifications.removeNotificationSubscription(
                    responseListener.current
                )
        }
    }, [])

    async function registerForPushNotificationsAsync() {
        let token

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync(
                'myNotificationChannel',
                {
                    name: 'A channel is needed for the permissions prompt to appear',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                }
            )
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            try {
                const projectId =
                    Constants?.expoConfig?.extra?.eas?.projectId ??
                    Constants?.easConfig?.projectId
                if (!projectId) {
                    throw new Error('Project ID not found')
                }
                token = (
                    await Notifications.getExpoPushTokenAsync({
                        projectId,
                    })
                ).data
                console.log(token)
            } catch (e) {
                token = `${e}`
            }
        } else {
            alert('Must use physical device for Push Notifications')
        }

        return token
    }

    async function schedulePushNotification() {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please select a date and time.')
            return
        }
        console.log(
            'Scheduling at ' +
                selectedDate +
                ' time: ' +
                selectedTime +
                ' curr: ' +
                new Date()
        )
        const targetTime = selectedTime

        // Add the event to the reminders list
        const newReminder = {
            date: selectedDate,
            time: selectedTime.toLocaleTimeString(),
        }
        setReminders(prevReminders => [...prevReminders, newReminder])

        await Notifications.scheduleNotificationAsync({
            content: {
                title: '📅 Reminder',
                body: 'Time to get ready for fitness',
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: targetTime,
            },
        })

        console.log('Notification sent')
    }

    const showPicker = () => {
        setShowTimePicker(true)
    }

    const onTimeChange = (event: any, selected?: Date) => {
        setShowTimePicker(Platform.OS === 'ios') // Close picker on Android
        if (selected) {
            console.log('Selected: ' + selected)
            setSelectedTime(selected)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Date & Time</Text>

            {/* Calendar with marked dates */}
            <Calendar
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
            />

            {/* Time Picker Button */}
            <View style={styles.buttonContainer}>
                <Button title="Pick a Time" onPress={showPicker} />
            </View>

            {/* Time Picker */}
            {showTimePicker && (
                <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time"
                    display="spinner"
                    onChange={onTimeChange}
                />
            )}

            {/* Show Selected Date & Time */}
            {selectedDate && selectedTime && (
                <Text style={styles.info}>
                    Selected: {selectedDate} at{' '}
                    {selectedTime.toLocaleTimeString()}
                </Text>
            )}

            {/* Schedule Notification Button */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Set Reminder"
                    onPress={schedulePushNotification}
                />
            </View>

            {/* List of Reminders */}
            <Text style={styles.reminderTitle}>Upcoming Reminders:</Text>
            <FlatList
                data={reminders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.reminderItem}>
                        {item.date} at {item.time}
                    </Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        marginVertical: 10,
    },
    reminderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    reminderItem: {
        fontSize: 16,
        paddingVertical: 5,
    },
})

export default CalendarComponent
