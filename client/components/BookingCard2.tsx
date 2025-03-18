import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons'; // Importing vector icons

interface BookingData {
  serviceName: string;
  customerName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  location: string; // Added location to booking data
  image: string;
}

export default function BookingCard2({ bookingData }: { bookingData: BookingData }) {
  const { serviceName, customerName, bookingDate, startTime, endTime, status, location, image } = bookingData;

  return (
    <View style={styles.card}>
      {/* Image Above */}
      <Image source={require('@/assets/images/cycling-equipment-healthy-fit-fitness.jpg')} style={styles.cardImage} />
      <View style={styles.tag}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>Weekly</Text>
          </View>
      
      {/* Details Below */}
      <View style={styles.cardTextContainer}>
        
        <Text style={styles.serviceName}>{serviceName}</Text>
        <Text style={styles.customerName}>{customerName}</Text>

        <View style={styles.infoContainer}>
          <FontAwesome5 name="calendar-alt" size={15} color="#333" />
          <Text style={styles.infoText}>{bookingDate}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome5 name="clock" size={14} color="#333" />
          <Text style={styles.infoText}>{startTime} - {endTime}</Text>
        </View>

        {/* Optional: Location */}
        {/* <View style={styles.infoContainer}>
          <FontAwesome5 name="map-marker-alt" size={16} color="#333" />
          <Text style={styles.infoText}>{location}</Text>
        </View> */}
      </View>

      {/* Cancel Button */}
      {/* <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'rgba(42, 157, 143, 0.3)',
    borderRadius: 10,
    padding: 10,
    width: 240, // You can adjust the width to fit your design
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    height: 160, // Adjust the height to fit the image and content
    alignItems: 'flex-start', // Center-align the content
  },
  cardImage: {
    width: 240,
    height: 150,
    borderRadius: 10,
    marginBottom: 10, // Add space between the image and text
  },
  cardTextContainer: {
    justifyContent: 'flex-start', // Align text to the left
    alignItems: 'flex-start', // Align text centrally
  },
  serviceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  customerName: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5, // Space between customer name and booking details
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3, // Adjust margin between icons and text
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#E74C3C', // Red color for cancel
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
    width: '90%',
    marginLeft: 15,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  tag :{
    position: 'absolute',
    top: 20,
    right: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 143, 1)',
    padding: 5,
  }
});
