import { useRouter } from 'expo-router';
import React from 'react';
import { Card, Button } from 'react-native-paper'
import { View, Dimensions } from 'react-native';
import UpcomingBookings from '@/components/ui/CalendarComponent';
import BookingOptionsHeader from '@/components/ui/BookingOptionsHeader';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BookingOptions from '@/components/ui/BookingOptions';
import CalendarComponent from '@/components/ui/CalendarComponent';

const { width } = Dimensions.get('window'); // Get screen width
export default function BookingPage() {

    const router = useRouter(); // Use Expo Router for navigation

    const handlePress = (path: string) => {
        router.push(path as any); // Navigate to the selected screen
    };

    
    return (
<View >
<BookingOptionsHeader/>
<BookingOptions/>
<CalendarComponent/>
</View>

       
    );
}
