import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import '../../global.css'
import DaysOfWeek from '@/components/DaysofWeek'
import { useState } from 'react'
import UserQRCodeModal from '@/components/UserQRCodeModal'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '@/hooks/useAuth'
import EventDetailsPopup from '@/components/ui/EventDetailsPopup'

import { router } from 'expo-router'
import { RootState, useAppSelector } from '@/store'
import { CalendarEvent } from '@/constants/types'
import GymOccupancy from '@/components/GymOccupancy'
import UpcomingBookingCard from '@/components/UpcomingBooking'
import LeStreakModal from '../LeStreak'

export default function HomeScreen() {
    const calendarEvents = Object.values(
        useAppSelector((state: RootState) => state.CalendarDb.entities)
    ) as CalendarEvent[]

    const { currentUser } = useAuth()
    console.log(currentUser)

    const [eventModalVisible, setEventModalVisible] = useState<boolean>(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)

    const handleLeStreakModal = () => {
        setModalVisible(true) // Show modal when navigating
        // You can also trigger any other navigation logic here
    }
    const handleClose = () => {
        setSelectedBooking(null)
        setEventModalVisible(false)
    }

    const [isModalVisible, setIsModalVisible] = useState(false)

    // Dummy user data (replace with real data)
    const userData = {
        name: 'Younes Nouri',
        email: 'y_nouri@concordia.ca',
        phone: '+1234567890',
    }

    // Toggle modal visibility
    const closeModal = () => setIsModalVisible(false)

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date()
        return today.toISOString().split('T')[0] // Format: 'YYYY-MM-DD'
    })

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', // Full weekday name (e.g., "Thursday")
        day: 'numeric', // Day of the month (e.g., "16")
        month: 'long', // Full month name (e.g., "May")
        year: 'numeric', // Year (e.g., "2025")
    })

    const filteredBookings = calendarEvents.filter(booking => {
        const bookingDate = booking.date
        // const bookingDateFormatted = bookingDate.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

        // Ensure selectedDate and selectedId are defined
        return (
            bookingDate === selectedDate && booking.user_id === currentUser?.id
        )
    })

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* The whole Home Page container */}
            {!currentUser?.gamificationToggle && (
                <ThemedView style={styles.welcomeBox2}>
                    <ThemedText style={styles.subtitle3}>Welcome</ThemedText>
                    <Text style={styles.title2}>
                        {currentUser?.firstName || 'Guest'}{' '}
                    </Text>
                    <ThemedText style={styles.subtitle4}>
                        Earn Your Progress Today.{' '}
                    </ThemedText>
                </ThemedView>
            )}
            {currentUser?.gamificationToggle && (
                <ThemedView style={styles.welcomeBox}>
                    <View style={styles.leftContainer}>
                        <ThemedText style={styles.subtitle}>Welcome</ThemedText>
                        <Text style={styles.title}>
                            {currentUser?.firstName || 'Guest'}{' '}
                        </Text>
                        <ThemedText style={styles.subtitle2}>
                            Earn Your Progress Today.{' '}
                        </ThemedText>

                        {/* <TouchableOpacity
                        style={styles.qrcontainer}
                        onPress={openModal}
                    >
                        <Ionicons
                            name="qr-code-outline"
                            size={35}
                            color="white"
                            style={{ marginTop: 0, padding: 0 }}
                        />
                        <View style={styles.qrTextContainer}>
                            <Text style={styles.qrText}>Gym Check-in</Text>
                            <Text style={styles.qrsubText}>
                                Tap here to scan QR code
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                    </View>

                    <View style={styles.divider} />

                    {/* <View style={styles.qrCodeContainer}>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons
                            name="qr-code-outline"
                            size={28}
                            color="#333"
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                </View> */}

                    <View style={styles.rightContainer}>
                        <Image
                            source={require('@/assets/images/Streak.png')} // Change to your logo path
                            style={{
                                width: 80,
                                height: 70,
                                marginLeft: 0,
                                marginBottom: 0,
                                padding: 0,
                            }}
                            resizeMode="contain"
                        />

                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'absolute',
                                marginTop: 55,
                            }}
                        >
                            <View style={{ width: '100%' }}>
                                <Text
                                    className="text-3xl font-bold"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontWeight: 'bold',
                                        color: '#FFC107',
                                        textShadowColor: '#FF6600',
                                        textShadowOffset: {
                                            width: 2,
                                            height: 2,
                                        },
                                        textShadowRadius: 2,
                                        textAlign: 'center',
                                        marginTop: 5,
                                    }}
                                >
                                    {currentUser?.gamificationProgress}
                                </Text>
                                <Text
                                    className="text-1xl font-bold"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontWeight: 'bold',
                                        color: '#FFC107',
                                        textShadowColor: '#FF6600',
                                        textShadowOffset: {
                                            width: 1,
                                            height: 1,
                                        },
                                        textShadowRadius: 1,
                                        textAlign: 'center',
                                        marginTop: -8,
                                        marginBottom: 5,
                                        fontSize: 18,
                                    }}
                                >
                                    Days
                                </Text>
                            </View>

                            {/* <Text style={styles.streakCount}>Days</Text> */}
                            <TouchableOpacity
                                style={styles.details}
                                onPress={handleLeStreakModal}
                            >
                                <Text style={styles.calendarText}>
                                    See Details
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ThemedView>
            )}

            <ThemedText style={styles.today}>Today </ThemedText>
            <ThemedText style={styles.date}>{today}</ThemedText>

            <DaysOfWeek
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                upcomingBookings={calendarEvents
                    .filter(event => event.user_id === currentUser?.id) // Filter by user_id
                    .map(event => ({ bookingDate: event.date }))}
            />

            {/* <View style ={{backgroundColor :'black', borderTopLeftRadius: 25, borderTopRightRadius: 25}}> */}
            <ThemedText style={styles.titles}>Upcoming Bookings</ThemedText>
            {/* Upcoming Bookings */}

            {/* // <View
                    //     style={[
                    //         styles.bookingCardContainer,
                    //         { marginLeft: index === 0 ? 10 : 0 },
                    //     ]}
                    //     key={booking.id} // Always use a unique key for each item in the list
                    // >
                    //     <BookingCard2 bookingData={booking} />
                    // </View> */}

            {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedBooking(booking) // Store selected booking
                            setEventModalVisible(true) // Open modal
                        }}
                        style={styles.upcomingBookingsContainer}
                    >
                        {filteredBookings.map((booking, index) => (
                            <UpcomingBookingCard
                                key={index}
                                bookingData={{
                                    serviceName:
                                        booking.title || 'Unknown Service',
                                    customerName:
                                        booking.activity.instructor ||
                                        'Unknown Customer',
                                    bookingDate: booking.date,
                                    startTime:
                                        booking.activity.time?.split(
                                            ' - '
                                        )[0] || '00:00',
                                    endTime:
                                        booking.activity.time?.split(
                                            ' - '
                                        )[1] || '00:00',
                                    location:
                                        booking.location || 'Unknown Location',
                                }}
                            />
                        ))}
                    </TouchableOpacity>
                ))
            ) : (
                // If no bookings for the selected date, display the message
                <View style={styles.noBookingsMessageContainer}>
                    <Text style={styles.noBookingsMessageText}>
                        You have no upcoming bookings on {selectedDate}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.calendar}
                onPress={() => router.push('/booking' as any)}
            >
                <Text style={styles.calendarText}>View full calendar</Text>
                <Icon name="chevron-right" size={8} color="white" />
            </TouchableOpacity>
            {/* </View> */}

            {eventModalVisible && selectedBooking && (
                <EventDetailsPopup
                    visible={eventModalVisible}
                    events={selectedBooking ? [selectedBooking] : []}
                    close={handleClose}
                />
            )}

            <LeStreakModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />

            <View style={{ marginTop: 10 }}>
                <GymOccupancy />
            </View>

            {/* QR Code Modal */}
            {isModalVisible && (
                <UserQRCodeModal
                    userData={currentUser}
                    closeModal={closeModal}
                />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 0,
    },

    welcomeBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10, // Increased padding for a bigger box
        borderRadius: 10,

        marginBottom: 40,
        marginTop: 20, // Added margin to the top
        marginRight: 15, // Added margin to the right
        marginLeft: 15, // Added margin to the left
    },

    welcomeBox2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10, // Increased padding for a bigger box
        borderRadius: 10,

        marginBottom: 40,
        marginTop: 40, // Added margin to the top
        marginRight: 15, // Added margin to the right
        marginLeft: 15, // Added margin to the left
    },
    leftContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        flex: 1,
    },
    rightContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 40,

        gap: 2,
        flex: 1,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.light.concordiaColor,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        bottom: 35,
        textTransform: 'uppercase',
        paddingRight: 5,
    },

    subtitle2: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        top: 37,
    },

    title2: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.light.concordiaColor,
        textAlign: 'center',
    },
    subtitle3: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        bottom: 40,
        textTransform: 'uppercase',
        textAlign: 'center',
    },

    subtitle4: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        top: 40,
        textAlign: 'center',
    },
    streakLabel: {
        fontSize: 48,
        fontWeight: '600',
        color: '#FF5733',
    },
    streakCount: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FF5733',
    },
    picture: {
        width: 80,
        height: 80,
        borderRadius: 20, // Makes it circular
        borderWidth: 2, // Optional: Adds a border
        borderColor: '#93243a', // Concordia color border
        marginLeft: 10,
        shadowColor: '#000', // Optional: Adds a subtle shadow
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // For Android shadow effect
    },

    divider: {
        width: 1.5, // Adjust the width of the divider
        height: '95%', // Make the divider span the entire height
        backgroundColor: 'black', // Use backgroundColor for the divider color
        marginVertical: 15, // Adjust the spacing above and below the divider
    },

    upcomingBookingsContainer: {
        marginTop: 20,
        borderRadius: 10,

        maxHeight: 220,
    },
    bookingCardContainer: {
        marginRight: 20,
        marginBottom: 100,
    },

    titles: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    qrCodeContainer: {
        position: 'absolute',
        right: 1,
        top: 10,
    },

    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.concordiaColor,
        marginLeft: 20,
    },

    today: {
        fontSize: 17,

        color: '#888',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 15,
    },

    noBookingsMessageContainer: {
        width: 245, // Adjust based on the expected width of a booking card
        height: 95, // Adjust to match the height of the booking card
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.fadedconcordiaColor, // Optional: to make it visually consistent
        borderRadius: 10, // Optional: to make it look like a card
        marginLeft: 90, // Optional: to match spacing with other cards
        padding: 10,
        marginTop: 35,
        marginBottom: 15,
    },
    noBookingsMessageText: {
        fontSize: 15,
        color: 'black', // Or any color you prefer
        textAlign: 'center',
        fontWeight: 'bold',
    },

    calendar: {
        borderRadius: 20,
        backgroundColor: Colors.light.concordiaColor,
        width: 120,
        justifyContent: 'flex-start',

        paddingHorizontal: 10,
        marginLeft: 250,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 5,
        marginBottom: 10,
    },

    details: {
        borderRadius: 20,
        backgroundColor: Colors.light.concordiaColor,

        justifyContent: 'center',

        paddingHorizontal: 12,

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        gap: 5,
        marginBottom: 10,
    },

    qrcontainer: {
        borderRadius: 25,
        backgroundColor: Colors.light.concordiaColor,

        justifyContent: 'flex-start',

        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',

        gap: 5,
        marginBottom: 0,
        width: 165,
        height: 60,
    },

    qrText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },

    qrsubText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
    },

    qrTextContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    calendarText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

    LeStreakCard: {
        flexDirection: 'column',
        borderRadius: 10,
        borderColor: Colors.light.concordiaColor,
        borderWidth: 1,
    },
})
