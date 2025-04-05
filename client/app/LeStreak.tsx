import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

interface LeStreakModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeStreakModal: React.FC<LeStreakModalProps> = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        
            <Card style={styles.card}>
            <Card.Title 
              title={<Text style={{ fontWeight: 'bold', color: Colors.light.concordiaColor }}>LeStreak</Text>} 
              subtitle="Your OPTIONAL streak feature!" 
            />
            <Card.Content>
              <Text style={styles.cardText}>
              LeStreak score shows your cumulative gym visits. You can switch ON or OFF this feature in your profile settings.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setModalVisible(false)} style={styles.buttonClose}>
              <Text style={{color : 'white'}}>
              Close
              </Text>
              </Button>
            </Card.Actions>
            </Card>
        </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.light.concordiaColor,
    borderRadius: 10,
    padding: 20,
  },
  card: {
    margin: 0,
    borderRadius: 10,
    backgroundColor : 'white',
    width: '80%',
    padding: 20,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  buttonClose: {
    alignSelf: 'center',
    backgroundColor : Colors.light.concordiaColor,
    color : 'black'
  },
});

export default LeStreakModal;
