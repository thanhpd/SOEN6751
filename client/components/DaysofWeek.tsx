import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function DaysOfWeek() {
  // Mock data for days of the week with dates and event indicator
  const days = [
    { day: 'Mon', date: 24, hasEvent: false },
    { day: 'Tue', date: 25, hasEvent: true },  // Event on this day
    { day: 'Wed', date: 26, hasEvent: false },
    { day: 'Thu', date: 27, hasEvent: true },  // Event on this day
    { day: 'Fri', date: 28, hasEvent: false },
    { day: 'Sat', date: 29, hasEvent: true },  // Event on this day
    { day: 'Sun', date: 30, hasEvent: false },
  ];

  // State to track the selected date
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {days.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.dayBox, 
            selectedDate === item.date ? styles.selectedBox : styles.unselectedBox
          ]}
          onPress={() => setSelectedDate(item.date)}
        >
          <Text style={selectedDate === item.date ? styles.selectedText : styles.unselectedText}>
            {item.day}
          </Text>
          <Text style={selectedDate === item.date ? styles.selectedText : styles.unselectedText}>
            {item.date}
          </Text>
          {/* Show dot only if the day has an event */}
          {item.hasEvent && <View style={styles.eventDot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Display the days in a row
    justifyContent: 'space-evenly', // Evenly space the items
    flexWrap: 'wrap', // Allow wrapping if the space is tight
    padding: 10, // Space around the container
  },
  dayBox: {
    width: 35, // Fixed width for each box
    height: 70, // Fixed height to make them equal in size
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    borderRadius: 20, // Rounded corners for the boxes
    margin: 5, // Space between the boxes
  },
  selectedBox: {
    backgroundColor: Colors.light.concordiaColor, // Strong color for selected date
  },
  unselectedBox: {
    backgroundColor: Colors.light.fadedconcordiaColor, // Faded color for unselected dates
  },
  selectedText: {
    fontSize: 12, 
    fontWeight: 'bold',
    color: '#fff', // White text for selected
  },
  unselectedText: {
    fontSize: 11, 
    fontWeight: 'bold',
    color: '#fff', // Faded text color for unselected
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3, // Make it a circle
    backgroundColor: Colors.light.concordiaColor, // Yellow dot for events
    marginTop: 4, // Space below the date
    position: 'absolute', // Position the dot relative to the parent
    bottom: 10, // Position the dot at the bottom
  },
});
