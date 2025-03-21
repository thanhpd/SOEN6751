import { StyleSheet, Image, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import HeroBanner from '../components/HeroBanner'
import { InPersonActivityList } from '@/components/ui/ActivityList'
import { CategoryList } from '@/components/CategoryList'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import BookingCard2 from '@/components/BookingCard2'
import BookingCard from '@/components/BookingCard'
import SearchBar from '@/components/SearchBar'
import { InPersonActivityItem } from '@/components/ui/InPersonActivityItem'

   

export default function InPersonActivity() {
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
    
    return (
        <View style={{ flex: 1 }}>
            <HeroBanner 
            title="In-Person Activities Winter 2025"
        description="Get inspired and moving at the same time."
        date="From April 10 to June 30"
        image={require('../assets/images/hero.png')} />
            <SearchBar />
            <CategoryList />
            
                      <InPersonActivityList />
                      
        </View>
    )
}

const styles = StyleSheet.create({

    upcomingBookingsContainer: {
        marginTop: 20,
        borderRadius: 10,
        
        
    },
    bookingCardContainer: {
      marginRight: 20, 
    },
})