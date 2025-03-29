import NoNotification from '@/components/icons/NoNotification'
import { Colors } from '@/constants/Colors'
import useNotificationStore from '@/store/NotificationStore'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

const NotificationPage = () => {
    const { notifications, clearNotifications } =
        useNotificationStore()

    const handleClearAll = () => {
        clearNotifications()
    };

    const filtered = notifications
        .slice()
        .sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())


    return (
        <View style={styles.container}>
            {/* Header with Clear Button */}
            {!!filtered.length && (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {filtered.length > 0 && (
                        <TouchableOpacity
                            onPress={handleClearAll}
                            style={[
                                styles.clearButton,
                                {
                                    backgroundColor:
                                        Colors.concordia.background,
                                },
                            ]}
                        >
                            <Text style={styles.clearButtonText}>
                                Clear All
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <View style={styles.notificationContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {filtered.length === 0 ? (
                        <View className="flex items-center justify-center">
                            <View className="mt-[70px]">
                                <NoNotification />
                            </View>
                            <View className="flex flex-col items-center justify-center mt-[70px]">
                                <Text className="text-red font-bold text-2xl">
                                    There are no notifications
                                </Text>
                                <Text className="text-lg">
                                    Your notifications will appear on this page
                                </Text>
                            </View>
                        </View>
                    ) : (
                        filtered.map(notification => (
                            <View
                                key={notification.id}
                                style={styles.notificationBox}
                            >
                                <Ionicons
                                    name="notifications-outline"
                                    size={28}
                                    color="#333"
                                    style={{ marginRight: 15 }}
                                />
                                <View style={styles.headerColumn}>
                                    <Text style={styles.message}>
                                        {notification.title}
                                    </Text>
                                    <Text style={styles.details}>
                                        {notification.body}
                                    </Text>
                                </View>
                                <Text style={styles.date}>
                                    {notification.dateTime.toDateString()}
                                </Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    clearButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#ff4d4d',
        borderRadius: 20,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
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
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    headerColumn: {
        flexDirection: 'column',
        marginBottom: 5,
        flex: 1,
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
        paddingRight: 80,
    },
})

export default NotificationPage
