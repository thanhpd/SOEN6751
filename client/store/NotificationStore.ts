import * as Notifications from "expo-notifications";
import { Notification } from '@/constants/types';
import {create} from 'zustand';
import { Alert, Platform } from "react-native";
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


interface NotificationStore {
  notifications: Notification[];
  addNotification: (dateTime: Date, title: string, body: string) => void;
  scheduleNotification: (dateTime: Date, title: string, body: string) => void;
  clearNotifications: () => void;
  markAllAsRead: () => void;
}


const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: async(dateTime, title, body) => {
      const newNotification: Notification = {
          id: Date.now(),
          title,
          dateTime,
          body,
          isRead: false,
      };
      set((state) => ({ notifications: [newNotification, ...state.notifications] }));
  },
  scheduleNotification : schedulePushNotification,
  clearNotifications: () => set({ notifications: [] }),
  markAllAsRead: () => set((state) => {
      const updatedNotifications = state.notifications.map(notification => ({
          ...notification,
          isRead: true,
      }));
      return { notifications: updatedNotifications, hasUnreadNotifications: false };
  }),
}));


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('myNotificationChannel', {
        name: 'A channel is needed for the permissions prompt to appear',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

async function schedulePushNotification(dateTime: Date, title: string, body: string) {
    console.log('Scheduling notification');
    await registerForPushNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📅 Reminder',
        body: body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: dateTime,
      },
    });

    console.log('Notification sent');
  }

export default useNotificationStore;