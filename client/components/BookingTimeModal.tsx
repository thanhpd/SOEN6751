import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Modal from 'react-native-modal'

interface BookingTimeModalProps {
    modalVisible: boolean
    onClose: () => void
    onConfirm: (selectedDate: string) => void
    date: Date
}

const BookingTimeModal: React.FC<BookingTimeModalProps> = ({
    modalVisible,
    onClose,
    onConfirm,
    date,
}) => {
    // Set initial time to the default time slot
    const [selectedTime, setSelectedTime] = useState('12:00 PM - 1:00 PM')

    // Get available time slots based on the day of the week
    const getTimeSlots = () => {
        if (!date) return [] // Return empty array if no date is provided
        let dayOfWeek = date.getDay() // Get the day of the week directly
        return dayOfWeek === 5
            ? ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM'] // Saturday slots
            : [
                  '9:00 AM - 10:00 AM',
                  '10:00 AM - 11:00 AM',
                  '11:00 AM - 12:00 PM',
              ] // Tuesday & Thursday slots
    }

    // Set the default selected time when time slots are available
    useEffect(() => {
        const timeSlots = getTimeSlots()
        if (timeSlots.length > 0 && !selectedTime) {
            setSelectedTime(timeSlots[0]) // Set the first slot as default if no time is selected
        }
    }, [date, selectedTime]) // Re-run this effect if `date` or `selectedTime` changes

    const handleConfirm = () => {
        if (!selectedTime) {
            // If still no time is selected, default to '12:00 PM - 1:00 PM'
            setSelectedTime('12:00 PM - 1:00 PM')
        }
        onConfirm(selectedTime) // Send selected time (or default time)
        onClose() // Close modal after confirmation
    }

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select a Time</Text>

                    {getTimeSlots().map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeSlot,
                                selectedTime === time ||
                                (!selectedTime && time === '12:00 PM - 1:00 PM')
                                    ? styles.selectedSlot
                                    : '',
                            ]}
                            onPress={() => {
                                setSelectedTime(time)
                                console.log('Selected time:', time) // Log the selected time
                            }}
                        >
                            <Text style={styles.timeText}>{time}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleConfirm}
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
    )
}

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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    timeSlot: {
        padding: 15,
        backgroundColor: '#ddd',
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
        borderRadius: 5,
    },
    selectedSlot: { backgroundColor: 'blue' },
    timeText: { fontSize: 16, color: 'black' },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: { color: 'white', fontWeight: 'bold' },
})

export default BookingTimeModal
