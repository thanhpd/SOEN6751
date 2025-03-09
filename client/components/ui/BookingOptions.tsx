import React from 'react';
import { View } from 'react-native';
import { Surface ,Text} from 'react-native-paper';
import { Colors } from '@/constants/Colors';

const BookingOptions = () => {
  return (
    
    <View className="grid grid-cols-2 gap-4">
    <Surface className=" items-center justify-center" style={{ backgroundColor: Colors.boxPink.backgroundColor }} elevation={4}>
      <Text variant="headlineSmall">In - Person Activities</Text>
    </Surface>
    <Surface className="items-center justify-center" style={{ backgroundColor: Colors.boxYellow.backgroundColor }} elevation={4}>
      <Text variant="headlineSmall">Online Activities</Text>
    </Surface>
    <Surface className="items-center justify-center" style={{ backgroundColor: Colors.boxGray.backgroundColor }} elevation={4}>
      <Text variant="headlineSmall">Personal Training</Text>
    </Surface>
    <Surface className="items-center justify-center" style={{ backgroundColor: Colors.boxPurple.backgroundColor }} elevation={4}>
      <Text variant="headlineSmall">Nutrition Consultancy</Text>
    </Surface>
  </View>
  
  );
};
export default BookingOptions;



