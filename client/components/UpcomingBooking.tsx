import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

interface BookingData {
    serviceName: string
    customerName: string
    bookingDate: string
    startTime: string
    endTime: string
    status: string
    image: string
}

export default function UpcomingBookingCard({
    bookingData,
}: {
    bookingData: BookingData
}) {
    const {
        serviceName,
        customerName,
        bookingDate,
        startTime,
        endTime,
        status,
        image,
    } = bookingData

    return (
        <View style={styles.cardContainer}>
            {/* Vertical line (outside the card) */}

            <View style={styles.timeContainer}>
                <Text style={styles.time}>{startTime}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.time}>{endTime}</Text>
            </View>

            {/* The Card */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    {/* // <Image source={require('@/assets/images/linkedin1.jpg')} style={styles.cardImage} /> */}
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.serviceName}>{serviceName}</Text>
                        <Text style={styles.customerName}>{customerName}</Text>
                        {/* <Text style={styles.bookingDate}>{bookingDate}</Text>
            <Text style={styles.status}>{status}</Text> */}
                    </View>
                </View>

                {/* Start and End Time */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', // Align the card and the vertical line horizontally
        marginVertical: 15,
        paddingLeft: 40, // Space between the vertical line and card
    },
    verticalLine: {
        width: 3,
        backgroundColor: 'rgba(42, 157, 143, 1)', // Your desired color for the line
        marginRight: 0, // Space between the line and the card
        height: '70%', // Make the line extend vertically
        borderRadius: 15, // Rounded corners
        position: 'absolute', // Position the line relative to the parent
        marginTop: 15, // Adjust the line's position
    },
    card: {
        backgroundColor: 'rgba(42, 157, 143, 0.3)',
        borderRadius: 10,
        padding: 15,
        width: '70%', // Adjust width to fit your design
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    cardTextContainer: {
        justifyContent: 'center',
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    customerName: {
        fontSize: 14,
        color: '#777',
    },
    bookingDate: {
        fontSize: 12,
        color: '#555',
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF5733',
    },
    timeContainer: {
        flexDirection: 'column',
        alignItems: 'center',

        gap: 75,
        marginRight: 10,
    },
    time: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#555',
    },
})
