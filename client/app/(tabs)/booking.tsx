import React from 'react'
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import HeroBanner from '../../components/HeroBanner'
import BookingOptions from '@/components/ui/BookingOptions'
import BookingOptionsHeader from '@/components/ui/BookingOptionsHeader'
import UpcomingBookings from '@/components/ui/UpcomingBookings'

export default function Booking() {
    return (
        <SafeAreaView>
            <StatusBar />
            <View style={styles.container}>
                <BookingOptionsHeader/>
                <BookingOptions/>
                <UpcomingBookings/>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 18,
    fontWeight: '400',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
});
