import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
 import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import { InPersonActivityList } from '@/components/ui/ActivityList';

const { width } = Dimensions.get('window');

export default function OnlinePage() {
  return (
    <View style={styles.container}>
     <HeroBanner title="Online Workouts Spring 2025"
        description="Stay fit and healthy from home."
        date="From April 10 to June 30"
        image={require('../assets/images/online.png')}
/>

<SearchBar/>
<InPersonActivityList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width - 40,
  },
  cardText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
});
