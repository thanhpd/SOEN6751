import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

// Define the types for notifications
interface Notification {
    id: number;
    message: string;
    date: string;
    details: string;
}

const NotificationPage = () => {
    // Sample notifications data
    const notifications: Notification[] = [
        { id: 1, message: 'Personal Training', date: '2 days ago', details: 'Your booking is confirmed for tomorrow at 10 AM.' },
        { id: 2, message: 'Zumba Class', date: '3 days ago', details: 'Congrats on reaching ' },
        { id: 3, message: 'Crossfit Session', date: '1 week ago', details: 'Your order #1234 has been shipped via Express Courier.' },
    ];

    return (
        <View style={styles.container}>
            {/* Previous page content as overlay */}
            <View style={styles.overlayContent}>
                <Text style={styles.overlayText}>Previous Page Content</Text>
            </View>

            {/* Notification page content, taking up half the screen */}
            <View style={styles.notificationContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {notifications.map((notification) => (

                        <View>

                        <View key={notification.id} style={styles.notificationBox}>

                            <Ionicons
                                name="notifications-outline"
                                size={28}
                                color="#333"
                                style={{ marginRight: 15 }}
                            />

                            

                           <View style={styles.headerColumn}>
                                <Text style={styles.message}>{notification.message}</Text>
                                <Text style={styles.details}>{notification.details}</Text>
                            
                                </View>

                                <Text style={styles.date}>{notification.date}</Text>
                            
                            
                        </View>

                        <View style ={styles.details}> 
                        <Text> </Text>
                    </View>
                    </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    overlayContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay
        zIndex: 0, // Overlay below the notification page
    },
    overlayText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    notificationContainer: {
        flex: 1,
        height: height / 2, // Take up half the screen height
        backgroundColor: '#fff', // Background color for the notification area
        zIndex: 1, // Ensure this is above the overlay content
    },
    scrollContainer: {
        padding: 20,
    },
    notificationBox: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        // Border removed
        borderWidth: 0,
        borderColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerColumn: {
        flexDirection: 'column',
         // Place message and date on opposite ends
        marginBottom: 5, // Space between the message/date and the details
    },
    message: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    date: {
        fontSize: 14,
        color: '#888',
        position: 'absolute',
        right: 10,  
        top: 10,
        
    },
    details: {
        fontSize: 14,
    color: '#333',
    marginTop: 5, // Add space above details
       paddingRight: 120, // Add padding to the right
    },
});

export default NotificationPage;
