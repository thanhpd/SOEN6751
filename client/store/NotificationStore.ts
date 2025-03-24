import * as Notifications from "expo-notifications";
import { Notification } from '@/constants/types';
import {create} from 'zustand';
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


interface NotificationStore {
  notifications: Notification[];
  addNotification: (dateTime: Date, title: string, body: string) => void;
}


const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (dateTime, title, body) => {
      const newNotification: Notification = {
          id: Date.now(),
          title,
          dateTime,
          body,
      };
      set((state) => ({ notifications: [newNotification, ...state.notifications] }));
  },
  scheduleNotification : schedulePushNotification,
}));


// const NotificationComponent: React.FC = () => {
//   //const [expoPushToken, setExpoPushToken] = useState('');
//   //const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
// //   const [notification, setNotification] = useState<Notifications.Notification | undefined>(
// //      undefined
// //    );
//   const notificationListener = useRef<Notifications.EventSubscription>();
//   const responseListener = useRef<Notifications.EventSubscription>();

//    useEffect(() => {
//       registerForPushNotificationsAsync();//.then(token => token && setExpoPushToken(token));
  
//       if (Platform.OS === 'android') {
//        // Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
//       }
//       notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//         //setNotification(notification);
//       });
  
//       responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//         console.log(response);
//       });
  
//       return () => {
//         notificationListener.current &&
//           Notifications.removeNotificationSubscription(notificationListener.current);
//         responseListener.current &&
//           Notifications.removeNotificationSubscription(responseListener.current);
//       };
//     }, []);

    
// };


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

async function schedulePushNotification(selectedDate: Date, selectedTime: Date) {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select a date and time.");
      return;
    }
    console.log("Scheduling at " + selectedDate + " time: " + selectedTime + " curr: " + new Date());
    const targetTime = selectedTime;

    // // Add the event to the reminders list
    // const newReminder = {
    //   date: selectedDate,
    //   time: selectedTime.toLocaleTimeString(),
    // };
    // setReminders(prevReminders => [...prevReminders, newReminder]);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📅 Reminder',
        body: "Time to get ready for fitness",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: targetTime,
      },
    });

    console.log('Notification sent');
  }

export default useNotificationStore;