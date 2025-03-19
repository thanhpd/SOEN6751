import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5' // Importing vector icons

interface BookingData {
    serviceName: string
    customerName: string
    bookingDate: string
    startTime: string
    endTime: string
    status: string
    location: string // Added location to booking data
    image: string
}

export default function BookingCard({
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
        location,
        image,
    } = bookingData

    return (
        <View style={styles.cardContainer}>
            {/* Vertical line (outside the card) */}

            {/* The Card */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Image
                        source={require('@/assets/images/linkedin1.jpg')}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.serviceName}>{serviceName}</Text>
                        <Text style={styles.customerName}>{customerName}</Text>
                        {/* Date, Time, Location Icons */}
                        {/* <View style={styles.row}> */}
                        <View style={styles.infoContainer}>
                            <FontAwesome5
                                name="calendar-alt"
                                size={16}
                                color="#333"
                            />
                            <Text style={styles.infoText}>{bookingDate}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome5 name="clock" size={16} color="#333" />
                            <Text style={styles.infoText}>
                                {startTime} - {endTime}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome5
                                name="map-marker-alt"
                                size={16}
                                color="#333"
                            />
                            <Text style={styles.infoText}>{location}</Text>
                        </View>
                    </View>
                </View>
                {/* </View> */}

                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
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
        padding: 10,
        width: '90%', // Adjust width to fit your design
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
        width: 80,
        height: 80,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    },
    cancelButton: {
        backgroundColor: '#E74C3C', // Red color for cancel
        paddingVertical: 10,
        borderRadius: 25,
        marginTop: 15,
        alignItems: 'center',
        width: '90%',
        marginLeft: 15,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
