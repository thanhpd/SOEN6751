import useNotificationStore from '@/store/NotificationStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const NotificationPage = () => {
    const { unreadNotifications, clearUnreadNotifications } = useNotificationStore();
    const notifications = unreadNotifications.slice().sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
    const clear = () => clearUnreadNotifications();
   // clear();
    return (
        <View style={styles.container}>
            <View style={styles.notificationContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {notifications.length === 0 ? (
                        <Text style={styles.emptyMessage}>No new notifications</Text>
                    ) : (
                        notifications.map((notification) => (
                            <View key={notification.id} style={styles.notificationBox}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={28}
                                    color="#333"
                                    style={{ marginRight: 15 }}
                                />
                                <View style={styles.headerColumn}>
                                    <Text style={styles.message}>{notification.title}</Text>
                                    <Text style={styles.details}>{notification.body}</Text>
                                </View>
                                <Text style={styles.date}>{notification.dateTime.toDateString()}</Text>
                            </View>
                        ))
                    )}
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
    notificationContainer: {
        flex: 1,
        height: height / 2,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    scrollContainer: {
        padding: 20,
    },
    notificationBox: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerColumn: {
        flexDirection: 'column',   
        marginBottom: 5,
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
        marginTop: 5,
        paddingRight: 120,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default NotificationPage;
