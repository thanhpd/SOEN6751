import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import moment from 'moment' // Import moment.js for date handling

interface DaysOfWeekProps {
    selectedDate: string
    setSelectedDate: (date: string) => void
    upcomingBookings: { bookingDate: string }[]
}

export default function DaysOfWeek({
    selectedDate,
    setSelectedDate,
    upcomingBookings,
}: DaysOfWeekProps) {
    // Generate an array of 7 days starting from today
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = moment().add(i, 'days') // Get today + i days
        return {
            day: date.format('ddd'), // Short day name (Thu, Fri, etc.)
            date: date.format('YYYY-MM-DD'), // Full date format (2025-03-20)
            displayDate: date.format('D'), // Only day number (20, 21, 22, etc.)
        }
    })

    // Function to check if a date has an event
    const hasEvent = (date: string) =>
        upcomingBookings.some(booking => booking.bookingDate === date)

    return (
        <View style={styles.container}>
            {days.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.dayBox,
                        selectedDate === item.date
                            ? styles.selectedBox
                            : styles.unselectedBox,
                    ]}
                    onPress={() => setSelectedDate(item.date)}
                >
                    <Text
                        style={
                            selectedDate === item.date
                                ? styles.selectedText
                                : styles.unselectedText
                        }
                    >
                        {item.day}
                    </Text>
                    <Text
                        style={
                            selectedDate === item.date
                                ? styles.selectedText
                                : styles.unselectedText
                        }
                    >
                        {item.displayDate}
                    </Text>
                    {/* Show a dot if there is an event on this date */}
                    {hasEvent(item.date) && <View style={styles.eventDot} />}
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    dayBox: {
        width: 40,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
    },
    selectedBox: {
        backgroundColor: Colors.light.concordiaColor,
    },
    unselectedBox: {
        backgroundColor: Colors.light.fadedconcordiaColor,
    },
    selectedText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    unselectedText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#fff',
    },
    eventDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.concordiaColor,
        marginTop: 4,
        position: 'absolute',
        bottom: 10,
    },
})
