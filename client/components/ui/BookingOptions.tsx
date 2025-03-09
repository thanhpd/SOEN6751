import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingOptions = () => {
  return (
    <View>
      <View style={styles.grid}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.box, styles.boxPink]}>
        <Text style={styles.boxText}>In - Person Activities</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box, styles.boxYellow]}>
        <Text style={styles.boxText}>Online Activities</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.box, styles.boxGray]}>
        <Text style={styles.boxText}>Personal Training</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.box, styles.boxPurple]}>
        <Text style={styles.boxTextBold}>Nutrition Consultancy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
 
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  box: {
    width: 160,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  boxTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  boxPink: {
    backgroundColor: '#F8D7DA',
  },
  boxYellow: {
    backgroundColor: '#FCE5B1',
  },
  boxGray: {
    backgroundColor: '#B0B6BD',
  },
  boxPurple: {
    backgroundColor: '#B5A3E5',
  },
});

export default BookingOptions;
