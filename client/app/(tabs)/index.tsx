import {
    Image,
    StyleSheet,
    Platform,
    View,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import '../../global.css'
import UpcomingBookingCard from '@/components/UpcomingBooking'
import DaysOfWeek from '@/components/DaysofWeek'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import UserQRCodeModal from '@/components/UserQRCodeModal'
import BookingCard2 from '@/components/BookingCard2'
import Icon from 'react-native-vector-icons/FontAwesome';


import BookingCard from '@/components/BookingCard'

export default function HomeScreen() {
    const upcomingBookings = [
        {
            id: 1,
            serviceName: 'Personal training',
            customerName: 'John Doe',
            bookingDate: '2025-03-21',
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            status: 'Confirmed',
            image: require('@/assets/images/linkedin1.jpg'), // You can replace with your image path or URL
        },
        {
            id: 2,
            serviceName: 'Massage Therapy',
            customerName: 'Jane Smith',
            bookingDate: '2025-03-23',
            startTime: '12:00 PM',
            endTime: '1:00 PM',
            status: 'Pending',
            image: 'https://example.com/images/massage.jpg', // You can replace with your image path or URL
        },
        {
            id: 3,
            serviceName: 'Massage Therapy',
            customerName: 'Jane Smith',
            bookingDate: '2025-03-25',
            startTime: '12:00 PM',
            endTime: '1:00 PM',
            status: 'Pending',
            image: 'https://example.com/images/massage.jpg', // You can replace with your image path or URL
        },
    ]

    const [isModalVisible, setIsModalVisible] = useState(false)

    // Dummy user data (replace with real data)
    const userData = {
        name: 'Younes Nouri',
        email: 'y_nouri@concordia.ca',
        phone: '+1234567890',
    }

    // Toggle modal visibility
    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false)

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date()
        return today.toISOString().split('T')[0] // Format: 'YYYY-MM-DD'
    })

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',  // Full weekday name (e.g., "Thursday")
        day: 'numeric',  // Day of the month (e.g., "16")
        month: 'long',    // Full month name (e.g., "May")
        year: 'numeric'   // Year (e.g., "2025")
    });


    const filteredBookings = upcomingBookings.filter((booking) => {
        const bookingDate = new Date(booking.bookingDate);
        const bookingDateFormatted = bookingDate.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

        // Return only bookings that match the selected date
        return bookingDateFormatted === selectedDate;
    });




    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* The whole Home Page container */}
            <ThemedView style={styles.welcomeBox}>
                <View style={styles.leftContainer}>
                    <ThemedText style={styles.subtitle}>Welcome </ThemedText>
                    <ThemedText style={styles.title}>Younes! </ThemedText>
                    <Image
                        source={require('@/assets/images/linkedin1.jpg')} // Change to your logo path
                        style={styles.picture}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.qrCodeContainer}>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons
                            name="qr-code-outline"
                            size={28}
                            color="#333"
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.rightContainer}>
                    <Image
                        source={require('@/assets/images/Streak.png')} // Change to your logo path
                        style={{ width: 100, height: 100, marginLeft: 15 }}
                        resizeMode="contain"
                    />
                    <ThemedText
                        type="defaultSemiBold"
                        style={styles.streakCount}
                    >
                        5 days streak
                    </ThemedText>
                </View>
            </ThemedView>


            <View></View>
            <ThemedText style={styles.today}>Today </ThemedText>
            <ThemedText style={styles.date}>{today}</ThemedText>



            <DaysOfWeek
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                upcomingBookings={upcomingBookings}
            />

{/* <View style ={{backgroundColor :'black', borderTopLeftRadius: 25, borderTopRightRadius: 25}}> */}
            <ThemedText style={styles.titles}>Upcoming Bookings</ThemedText>
            {/* Upcoming Bookings */}


            {/* <View style={styles.upcomingBookingsContainer}>
                {upcomingBookings.map((booking, index) => (
                    <UpcomingBookingCard key={index} bookingData={booking} />
                ))}
            </View> */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.upcomingBookingsContainer}>
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                        <View
                            style={[
                                styles.bookingCardContainer,
                                { marginLeft: index === 0 ? 10 : 0 },
                            ]}
                            key={booking.id} // Always use a unique key for each item in the list
                        >
                            <BookingCard2 bookingData={booking} />
                        </View>
                    ))
                ) : (
                    // If no bookings for the selected date, display the message
                    <View style={styles.noBookingsMessageContainer}>
                        <Text style={styles.noBookingsMessageText}>
                            You have no upcoming bookings on {selectedDate}
                        </Text>
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.calendar}>
                <Text style={styles.calendarText}>View full calendar</Text>
                <Icon name="chevron-right" size={8} color="black" />
            </TouchableOpacity>
            {/* </View> */}


            {/* QR Code Modal */}
            {isModalVisible && (
                <UserQRCodeModal userData={userData} closeModal={closeModal} />
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
        backgroundColor: Colors.light.fadedconcordiaColor,
        padding: 20, // Increased padding for a bigger box
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        marginTop: 30, // Added margin to the top
        marginRight: 15, // Added margin to the right
        marginLeft: 15, // Added margin to the left

    },
    leftContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        flex: 1,
    },
    rightContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.concordiaColor,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    streakLabel: {
        fontSize: 48,
        fontWeight: '600',
        color: '#FF5733',
    },
    streakCount: {
        fontSize: 18,
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
        height: '75%', // Make the divider span the entire height
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
    },

    titles: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
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


    },


    noBookingsMessageContainer: {
        width: 230,  // Adjust based on the expected width of a booking card
        height: 150, // Adjust to match the height of the booking card
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.fadedconcordiaColor, // Optional: to make it visually consistent
        borderRadius: 10, // Optional: to make it look like a card
        marginLeft: 20, // Optional: to match spacing with other cards
        padding: 10,
        marginTop: 15,
    },
    noBookingsMessageText: {
        fontSize: 17,
        color: 'black', // Or any color you prefer
        textAlign: 'center',
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
        paddingVertical :5,
        gap: 5,
        marginBottom: 10,

    },

    calendarText: {

        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',


    },
})
