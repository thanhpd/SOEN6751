import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import TrainerCard from '@/components/TrainerCard';
import TrainerCard2 from '@/components/TrainerCardSwipe';

const { width } = Dimensions.get('window'); // Get screen width

export default function PersonalTrainingPage() {
  const cards = [
    { id: '1', title: '1 session',price:'49', path: 'in-person' },
    { id: '2', title: '5 sessions', price:'55',path: 'online' },
    { id: '3', title: '10 sessions ',price:'150', path: 'training' },
    { id: '4', title: '20 session ',price:'55', path: 'nutrition' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style = {styles.title}>Personal Training Packages</Text>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        {cards.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.price}>
              <Text style={styles.priceText}>${item.price}</Text>
               </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trainer Card Section */}
      <Text style = {styles.title}>Meet Our Trainers</Text>
      <View style={styles.trainerContainer}>
        <TrainerCard
          profilePic="https://randomuser.me/api/portraits/men/1.jpg" // Replace with actual URL or local file
          name="Jane Smith"
          certification="Certified Strength and Conditioning "
          education="Master's in Kinesiology"
        />
        <TrainerCard
          profilePic="https://randomuser.me/api/portraits/women/2.jpg" // Replace with actual URL or local file
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
    
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row', // Make the cards appear in a row
    flexWrap: 'wrap', // Allow wrapping to the next line if there is no space
    justifyContent: 'space-around', // Space out the items in the row
    marginBottom: 30, // Add some space between the cards and the trainer section
  },
  card: {
    backgroundColor: Colors.light.concordiaColor,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: (width / 2) - 40, // Each card takes half of the screen width minus margins
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  trainerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title : {
    fontSize: 20,
    margin: 10,
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
    height: 25,
    width: 25,

    backgroundColor:'#c0392b',
    color: 'black', 
    fontWeight: 'bold', // Make the text bold   
    fontSize: 10, // Decrease the font size   
  },

  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
});
