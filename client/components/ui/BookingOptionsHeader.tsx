import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingOptionsHeader = () => {
  return (
    <View>
      <Text style={styles.header}>Lock in Your</Text>
      <Text style={styles.subHeader}>Next Fitness Move</Text>
      <Text style={styles.description}>
        Choose from in-person & online activities, personal training, or nutrition sessions.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '400',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookingOptionsHeader;
