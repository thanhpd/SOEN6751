import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import TrainerCard from '@/components/TrainerCard';

const { width } = Dimensions.get('window'); // Get screen width

export default function PersonalTrainingPage() {
  const cards = [
    { id: '1', title: '1 session - 55$', path: 'in-person' },
    { id: '2', title: '5 sessions - 250$', path: 'online' },
    { id: '3', title: '10 sessions - 475$', path: 'training' },
    { id: '4', title: '20 session - 900$', path: 'nutrition' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style = {styles.title}>Personal Training Packages</Text>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        {cards.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trainer Card Section */}
      <Text style = {styles.title}>Meet Our Trainers</Text>
      <View style={styles.trainerContainer}>
        <TrainerCard
          profilePic="@/assets/images/linkedin1.jpg" // Replace with actual URL or local file
          name="Jane Smith"
          certification="Certified Strength and Conditioning Specialist (CSCS)"
          education="Master's in Kinesiology"
        />
        <TrainerCard
          profilePic="https://example.com/profile2.jpg" // Replace with actual URL or local file
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  trainerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title : {
    fontSize: 20,
    margin: 10,
  }   
});
