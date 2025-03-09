import { Activity } from '@/constants/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventDetailsPopup from './EventDetailsPopup';

const UpcomingBookings = () => {
    const [selectedDay, setSelectedDay] = useState<any | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleDayPress = (day: any) => {
        const activity : Activity = {
            title: 'Cardio Dance',
            instructor: 'Danielle Hubbard',
            location: 'SGW – Le Gym – Studio C',
            days: 'Monday, Wednesday, Friday',
            time: '5:30 PM – 6:30 PM',
            description: '',
            price: ''
        };
        setSelectedDay(day);
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectedDay(null);
        setSelectedActivity(null);
        setModalVisible(false);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>
      <Text style={styles.subHeader}>View your upcoming bookings</Text>

      <Calendar
        onDayPress={handleDayPress}
        current={'2023-11-01'}
        markedDates={{
          '2023-11-03': { selected: true, selectedColor: '#F4D03F' },
          '2023-11-07': { selected: true, selectedColor: '#EC7063' },
          '2023-11-18': { selected: true, selectedColor: '#F4D03F' },
          '2023-11-23': { selected: true, selectedColor: '#EC7063' },
        }}
        theme={{
          calendarBackground: '#fff',
          textSectionTitleColor: '#000',
          dayTextColor: '#000',
          todayTextColor: '#000',
          monthTextColor: '#000',
          arrowColor: '#000',
        }}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendCircle, { backgroundColor: '#EC7063' }]} />
          <Text style={styles.legendText}>In - Person</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendCircle, { backgroundColor: '#F4D03F' }]} />
          <Text style={styles.legendText}>Online</Text>
        </View>
      </View>

      {modalVisible && selectedActivity && (
             <EventDetailsPopup 
                visible={modalVisible} 
                activity={selectedActivity} 
                handleClose={handleClose} 
                month={new Date(selectedDay.dateString).toLocaleString('default', { month: 'long' })} 
             />
         )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // backgroundColor: 'red',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeader: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
});

export default UpcomingBookings;
