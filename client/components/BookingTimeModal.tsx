import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';

interface BookingTimeModalProps {
    modalVisible: boolean;
    onClose: () => void;
    onConfirm: (selectedDate: string) => void;
    date : Date;
}

const BookingTimeModal: React.FC<BookingTimeModalProps> = ({ modalVisible, onClose, onConfirm, date }) => {
    

    
    const [selectedTime, setSelectedTime] = useState('');


    

    


    


    const getTimeSlots = () => {
        if (!date) return [];
        let dayOfWeek = date.getDay(); // Get the day of the week directly
        return dayOfWeek === 5
            ? ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM'] // Saturday slots
            : ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM']; // Tuesday & Thursday slots
    };


    return (
        

            
      <Modal isVisible={modalVisible}  onBackdropPress={onClose} style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Time</Text>

            {getTimeSlots().map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time ? styles.selectedSlot : null,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={styles.timeText}>{time}</Text>
              </TouchableOpacity>
            ))}

<TouchableOpacity
    style={styles.closeButton}
    onPress={() => {
        if (selectedTime) {
            onConfirm(selectedTime); // Send selected time
            onClose(); // Close modal after confirmation
        } else {
            Alert.alert('Please select a time before confirming.');
        }
    }}
>
    <Text style={styles.closeButtonText}>Confirm</Text>
    </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}

            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
       
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    buttonCancel: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    buttonConfirm: {
        flex: 1,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    
  selectedText: { textAlign: 'center', marginTop: 10, fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  timeSlot: { padding: 15, backgroundColor: '#ddd', marginVertical: 5, width: '80%', alignItems: 'center', borderRadius: 5 },
  selectedSlot: { backgroundColor: 'blue' },
  timeText: { fontSize: 16, color: 'black' },
  closeButton: { marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' },

  disabledButton: { backgroundColor: '#ccc' },

});

export default BookingTimeModal;
