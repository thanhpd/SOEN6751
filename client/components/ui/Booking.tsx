import React from 'react'
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import BookingOptions from '@/components/ui/BookingOptions'
import BookingOptionsHeader from '@/components/ui/BookingOptionsHeader'
import UpcomingBookings from '@/components/ui/UpcomingBookings'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Booking = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <BookingOptionsHeader />
                <BookingOptions />
                <UpcomingBookings />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
})

export default Booking
