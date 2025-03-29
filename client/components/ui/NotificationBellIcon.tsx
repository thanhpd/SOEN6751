import useNotificationStore from "@/store/NotificationStore"
import { View, Text } from "react-native"

 
export default function NotificationBellIcon() {
    const { notifications, hasUnreadNotifications } = useNotificationStore()
    const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
    );

    return (
        <View style={{
            position: 'absolute',
            top: -5,
            right: 10,
        }}>
        {hasUnreadNotifications && unreadNotifications.length > 0 && (
            <View
                style={{
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                    }}
                >
                    {unreadNotifications.length}
                </Text>
            </View>
        )}
        </View>
    )
}
