import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import '../../global.css'
import DaysOfWeek from '@/components/DaysofWeek'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import UserQRCodeModal from '@/components/UserQRCodeModal'
import BookingCard2 from '@/components/BookingCard2'
import { router } from 'expo-router'
import { Text } from 'react-native'
import React from 'react'

import GymOccupancy from '@/components/GymOccupancy'

export default function HomeScreen() {
    const upcomingBookings = [
        {
            id: 1,
            serviceName: 'Personal training',
            customerName: 'John Doe',
            bookingDate: 'March 6, 2025',
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            status: 'Confirmed',
            image: require('@/assets/images/linkedin1.jpg'), // You can replace with your image path or URL
        },
        {
            id: 2,
            serviceName: 'Massage Therapy',
            customerName: 'Jane Smith',
            bookingDate: 'March 6, 2025',
            startTime: '12:00 PM',
            endTime: '1:00 PM',
            status: 'Pending',
            image: 'https://example.com/images/massage.jpg', // You can replace with your image path or URL
        },
    ]

    const [isModalVisible, setIsModalVisible] = useState(false)

    // Dummy user data (replace with real data)
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    }

    // Toggle modal visibility
    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false)

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

            <ThemedText style={styles.today}>Today </ThemedText>
            <ThemedText style={styles.date}>Thursday 16, May 2025 </ThemedText>
            <DaysOfWeek />

            <ThemedText style={styles.titles}>Upcoming Bookings</ThemedText>
            {/* Upcoming Bookings */}

            {/* <View style={styles.upcomingBookingsContainer}>
                {upcomingBookings.map((booking, index) => (
                    <UpcomingBookingCard key={index} bookingData={booking} />
                ))}
            </View> */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.upcomingBookingsContainer}
            >
                {upcomingBookings.map((booking, index) => (
                    <View
                        key={index}
                        style={[
                            styles.bookingCardContainer,
                            { marginLeft: index === 0 ? 10 : 0 },
                        ]}
                    >
                        <BookingCard2 key={index} bookingData={booking} />
                    </View>
                ))}
            </ScrollView>

            <View style={{ marginTop: 30 }}>
                <GymOccupancy />
            </View>

            <View>
                <Pressable onPress={() => router.push('/order-review')}>
                    <Text>Test Order</Text>
                </Pressable>
            </View>

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
        backgroundColor: '#fff',
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
    },
    bookingCardContainer: {
        marginRight: 20,
        marginBottom: 100,
    },

    titles: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    qrCodeContainer: {
        position: 'absolute',
        right: 1,
        top: 10,
    },

    date: {
        fontSize: 20,
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
})
