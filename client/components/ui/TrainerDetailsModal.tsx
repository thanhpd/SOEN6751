import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

interface TrainerDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  trainer: {
    name: string;
    certification: string;
    education: string;
    trainingPhilosophy: string;
  };
}

const TrainerDetailsModal: React.FC<TrainerDetailsModalProps> = ({ visible, onClose, trainer }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{trainer.name}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Certification</Text>
            <Text style={styles.value}>{trainer.certification}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Education</Text>
            <Text style={styles.value}>{trainer.education}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Training Philosophy</Text>
            <Text style={styles.value}>{trainer.trainingPhilosophy}</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.concordiaColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.concordiaColor,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Colors.light.fadedconcordiaColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: Colors.light.concordiaColor,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TrainerDetailsModal;
