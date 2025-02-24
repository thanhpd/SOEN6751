import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, FlatList, StyleSheet, Platform } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [reminders, setReminders] = useState<{ date: string; time: string }[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: { marked: boolean; dotColor: string } }>({});
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);


async function registerForPushNotificationsAsync() {
    let token;
    console.log("Registering for push notifications...");
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log("Permission status: " + status);

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Notification Token: " + token);

    return token;
}

const generateNotification = async () => {
    console.log('Generating notification....')
    await registerForPushNotificationsAsync()
  //show the notification to the user
  Notifications.scheduleNotificationAsync({
    //set the content of the notification
    content: {
      title: "Demo title",
      body: "Demo body",
    },
    trigger: null,
  });
};
//   useEffect(() => {
//     async function requestPermissions() {
//       const { status } = await Notifications.getPermissionsAsync();
//       if (status !== "granted") {
//         await Notifications.requestPermissionsAsync();
//       }
//     }
//     requestPermissions();
//   }, []);

  const showPicker = () => {
    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selected?: Date) => {
    setShowTimePicker(Platform.OS === "ios"); // Close picker on Android
    if (selected) {
      setSelectedTime(selected);
    }
  };

  const scheduleNotification = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select a date and time.");
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0);

    // Allow same-day reminders but ensure the time is in the future
    if (selectedDateTime < now) {
      Alert.alert("Error", "Reminder time must be in the future.");
      return;
    }

    console.log("Scheduling notification for:", selectedDateTime.toLocaleString());

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📅 Reminder",
        body: `Event on ${selectedDate} at ${selectedTime.toLocaleTimeString()}`,
        sound: "default",
      },
      trigger: {
        date: selectedDateTime,
      },
    });

    const newReminder = { date: selectedDate, time: selectedTime.toLocaleTimeString() };
    setReminders((prev) => [...prev, newReminder]);

    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: { marked: true, dotColor: "blue" },
    }));

    Alert.alert("Reminder Set!", `Reminder for ${selectedDate} at ${selectedTime.toLocaleTimeString()}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date & Time</Text>

      {/* Calendar with marked dates */}
      <Calendar
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />

      {/* Time Picker Button */}
      <View style={styles.buttonContainer}>
        <Button title="Pick a Time" onPress={showPicker} />
      </View>

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="spinner"
          onChange={onTimeChange}
        />
      )}

      {/* Show Selected Date & Time */}
      {selectedDate && selectedTime && (
        <Text style={styles.info}>
          Selected: {selectedDate} at {selectedTime.toLocaleTimeString()}
        </Text>
      )}

      {/* Schedule Notification Button */}
      <View style={styles.buttonContainer}>
        <Button title="Set Reminder" onPress={() => generateNotification()} />
      </View>

      {/* List of Reminders */}
      <Text style={styles.reminderTitle}>Upcoming Reminders:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.reminderItem}>{item.date} at {item.time}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  reminderItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default CalendarComponent;
