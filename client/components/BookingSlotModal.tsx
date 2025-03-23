import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { Colors } from '@/constants/Colors';


interface BookingModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (selectedDate: Date) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isVisible, onClose, onConfirm }) => {
    const [date, setDate] = useState(new Date());

    const [selected, setSelected] = useState('');



    const today = new Date().toISOString().split('T')[0];




    const getDisabledDates = () => {
        let disabledDates: { [key: string]: { disabled: boolean; disableTouchEvent: boolean } } = {};
        const startDate = new Date('2025-04-01'); // Start from April 1st
        const endDate = new Date('2025-06-30');   // End on June 30th

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            let dayString = d.toISOString().split('T')[0];
            let dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

            // Disable if it's before today OR not Tuesday (2), Thursday (4), or Saturday (6)
            if (dayString < today || ![1, 3, 5].includes(dayOfWeek)) {
                disabledDates[dayString] = { disabled: true, disableTouchEvent: true };
            }
        }
        return disabledDates;
    };





    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.container}>
                <Text style={styles.title}>Select Date & Time</Text>
                {/* <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => setDate(selectedDate || date)}
                /> */}

                <Calendar
                    onDayPress={(day: { dateString: string; day: number; month: number; year: number }) => {
                        if (!getDisabledDates()[day.dateString]) {
                            setSelected(day.dateString);
                            // console.log(selected);
                        } else {
                            Alert.alert('Unavailable', 'This date cannot be booked.');
                        }
                    }}
                    markedDates={{
                        ...getDisabledDates(),
                        [selected]: { selected: true, selectedColor: Colors.light.concordiaColor },
                    }}
                    minDate="2025-04-01" // Prevent navigating before April
                    maxDate="2025-06-30" // Prevent navigating after June
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonConfirm, !selected && styles.disabledButton]}
                        onPress={() => {
                            if (selected) {
                                 // Update the date
                                // console.log(date);
                                onConfirm(new Date(selected));  // Call onConfirm with the selected date

                                
                            }
                        }}
                        disabled={!selected}  // Disable button if 'selected' is false
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
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
        width: 320,
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
        backgroundColor: Colors.light.concordiaColor,
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

export default BookingModal;
