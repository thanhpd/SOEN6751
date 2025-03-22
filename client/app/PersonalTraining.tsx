import { FlatList, View, TouchableOpacity, Text, StyleSheet, Dimensions,ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BookingModal from '@/components/BookingSlotModal';
import BookingTimeModal from '@/components/BookingTimeModal';
import useCalendarStore from '@/store/CalendarStore';
import HeroBanner from '@/components/HeroBanner'

const { width } = Dimensions.get('window');

export default function PersonalTraining() {
    const cards = [
        { id: '1', title: '1 session - 55$', time: '5:30 PM - 6:30 PM', sessions: 1 },
        { id: '2', title: '5 sessions - 250$', time: '5:30 PM - 6:30 PM', sessions: 5 },
        { id: '3', title: '10 sessions - 475$', time: '5:30 PM - 6:30 PM', sessions: 10 },
        { id: '4', title: '20 session - 900$', time: '5:30 PM - 6:30 PM', sessions: 20 },
    ];

    const { addEvent } = useCalendarStore();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedSessions, setSelectedSessions] = useState(0);

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        setModalVisible(false);

        setTimeout(() => {
            setModalVisible2(true);
        }, 500);
    };

    const handleConfirm2 = (time: string, sessions: number) => {
        setSelectedTime(time);
        setModalVisible2(false);

        if (!selectedDate) return;

        const events = [];
        let currentDate = new Date(selectedDate);

        for (let i = 0; i < sessions; i++) {
            events.push({
                id: uuidv4(),
                title: 'Personal Training',
                date: currentDate.toISOString().split('T')[0],
                selected: true,
                selectedColor: Colors.light.concordiaColor,
                user_id: 'default_user', // Replace with actual user_id if available
                activity: {
                    title: 'Personal Training',
                    instructor: 'Jane Smith',
                    location: 'Concordia Gym',
                    days: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
                    time: selectedTime,
                    description: 'Learn to diet Properly.',
                    price: 90,
                    type: 'Personal' as 'Personal',
                }
            });

            currentDate.setDate(currentDate.getDate() + 7);
        }

        events.forEach(event => addEvent(event));
    };

    return (
        <ScrollView style={styles.container}>
            
            <Text style={styles.title}>Personal Training Packages</Text>

            {/* Card Section */}
            <View style={styles.cardContainer}>
                {cards.map(item => (
                    <TouchableOpacity key={item.id} style={styles.card}>
                        <Text style={styles.cardText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}

        {/* <View>
             <TouchableOpacity
                            onPress={() => {
                                console.log('Selected sessions on press:', cards[0].sessions);
                                setModalVisible(true);
                                setSelectedSessions(cards[0].sessions);
                            }}
                        >
                            <Text style={styles.cardText}>{cards[0].title}</Text>
                        </TouchableOpacity>
            </View> */}
         <FlatList
            data={cards}
            keyExtractor={(item) => item.id} // Ensure unique key for each item
            renderItem={({ item }) => {
                console.log('Rendering item:', item); // Log full item to see structure
                console.log('Selected sessions:', item.sessions); // Log sessions specifically

                return (
                    <View>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => {
                                console.log('Selected sessions on press:', item.sessions);
                                setModalVisible(true);
                                setSelectedSessions(item.sessions);
                            }}
                        >
                            <Text style={styles.cardText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    card: {
        backgroundColor: Colors.light.concordiaColor,
        padding: 20,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: width / 2 - 40,
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
    title: {
        fontSize: 20,
        margin: 10,
    },
});
