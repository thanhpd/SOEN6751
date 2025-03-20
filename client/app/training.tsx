import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import TrainerCard from '@/components/TrainerCard';
import TrainerCard2 from '@/components/TrainerCardSwipe';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/Colors';
import HeroBanner from '@/components/HeroBanner';

const { width } = Dimensions.get('window'); // Get screen width

export default function PersonalTrainingPage() {
  const cards = [
    { id: '1', title: '1 ', price: '49', path: 'in-person', bgColor: '#3498db', circleColor: '#2980b9', buttonColor: '#2980b9' }, // Blue
    { id: '2', title: '5 ', price: '55', path: 'online', bgColor: '#27ae60', circleColor: '#1e8449', buttonColor: '#1e8449' }, // Green
    { id: '3', title: '10', price: '150', path: 'training', bgColor: '#e67e22', circleColor: '#d35400', buttonColor: '#d35400' }, // Orange
    { id: '4', title: '20', price: '55', path: 'nutrition', bgColor: '#c0392b', circleColor: '#922b21', buttonColor: '#922b21' }, // Red
  ];

  
  return (
    <ScrollView style={styles.container}>
      <HeroBanner title="Personal Training Spring 2025"
                                  description="helping you achieve your fitness goals."
                                  date="From April 10 to June 30"
                                  image={require('../assets/images/training.jpg')}
                              />
      <Text style = {styles.title}>Personal Training Packages</Text>

      {/* Card Section */}
      <View style={styles.cardContainer}>
  {cards.map((item) => (
    <TouchableOpacity key={item.id} style={[styles.card, { backgroundColor: item.bgColor }]}>
      <View style={[styles.price, { backgroundColor: item.circleColor }]}>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <Text style={styles.number}>{item.title}</Text>
      <Text style={styles.session}>{item.id === '1' ? "Session" : "Sessions"}</Text>
      <View style={[styles.booking, { backgroundColor: item.buttonColor }]}>
        <Text style={styles.cardText}>Book Now</Text>
      </View>
    </TouchableOpacity>
  ))}
</View>

      {/* Trainer Card Section */}
      <Text style = {styles.title}>Meet Our Trainers</Text>
      <View style={styles.trainerContainer}>
        <TrainerCard
          profilePic={require('@/assets/images/trainer.png')} // Replace with actual URL or local file
          name="Jane Smith"
          certification="Certified Strength and Conditioning "
          education="Master's in Kinesiology"
        />
        <TrainerCard
          profilePic={require('@/assets/images/trainer1.png')} // Replace with actual URL or local file
          name="John Doe"
          certification="Certified Personal Trainer (CPT)"
          education="Bachelor's in Exercise Science"
        />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    padding: 0,
  },
  cardContainer: {
    flexDirection: 'row', // Make the cards appear in a row
    flexWrap: 'wrap', // Allow wrapping to the next line if there is no space
    justifyContent: 'center', // Space out the items in the row
    marginBottom: 10, // Add some space between the cards and the trainer section
  },
  card: {
    backgroundColor: 'rgb(176, 49, 35)',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    width: (width / 2) - 40, // Each card takes half of the screen width minus margins
  },
  cardText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  trainerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title : {
    fontSize: 17,
    margin: 10,
    fontWeight :'bold',
    marginLeft: 25,
  } ,  

  price :{

    position: 'absolute',
    top: 10, // Align to the top of the card
    right: 10, // Align to the right of the card 
    padding: 0,
     // Add a semi-transparent background color
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,

    backgroundColor: '#922b21',
    
    fontWeight: 'bold', // Make the text bold   
    fontSize: 10, // Decrease the font size   
  },

  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },

  booking : {
    backgroundColor: '#922b21',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    marginTop: 55,
  },

  number: {
position: 'absolute',
top: 10,
left: 15,
fontSize: 25,
color: "white",
fontWeight: 'bold',

  },


  session: {
    position: 'absolute',
    top: 40,
    left: 15,
    fontSize: 13,
    color: "white",
    fontWeight: 'bold',
    
      }
});
