import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // Get screen width

interface TrainerCardProps {
    profilePic: string // URL or local path to the profile picture
    name: string
    certification: string
    education: string
}

const TrainerCard: React.FC<TrainerCardProps> = ({ profilePic, name, certification, education }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.container}>
          <Text style={styles.containerText}>See More</Text>    
          </View>
        
        {/* Certification */}
        <View style={styles.infoRow}>
          <FontAwesome5 name="certificate" size={14} color="#555" style={styles.icon} />
          <Text style={styles.infoText}>{certification}</Text>
        </View>

        {/* Education */}
        <View style={styles.infoRow}>
          <FontAwesome5 name="graduation-cap" size={14} color="#555" style={styles.icon} />
          <Text style={styles.infoText}>{education}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // To display the image and text side by side
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: width - 40, // Take most of the screen width
    alignItems: 'center',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 20, // Make it a circle
    marginRight: 15,
  },
  details: {
    flex: 1, // Allow the details to take up remaining space
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.concordiaColor,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },

  container: {
    position: 'absolute' ,
    top: 0, // Align to the top of the card
    right: 0, // Align to the right of the card
    padding:1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.light.fadedconcordiaColor,
    height: 20,
    width: 70,  
  },

  containerText:{
    fontWeight: 'bold',
    fontSize: 11,
    color: Colors.light.concordiaColor,
  }
});

export default TrainerCard
