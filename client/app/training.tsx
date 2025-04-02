import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { Colors } from '@/constants/Colors'
import TrainerCard from '@/components/TrainerCard'
import { v4 as uuidv4 } from 'uuid'
import useCalendarStore from '@/store/CalendarStore'
import React, { useState } from 'react'
import TrainerCard2 from '@/components/TrainerCardSwipe'
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/Colors'
import HeroBanner from '@/components/HeroBanner'
import BookingModal from '@/components/BookingSlotModal'
import BookingTimeModal from '@/components/BookingTimeModal'
import { setCurrentOrder } from '@/store/currentOrder'
import { useAppDispatch } from '@/store'
import { router } from 'expo-router'

const { width } = Dimensions.get('window') // Get screen width

export default function PersonalTrainingPage() {
    const cards = [
        {
            id: '1',
            title: '1',
            price: 55,
            time: '5:30 PM - 6:30 PM',
            sessions: 1,
        },
        {
            id: '2',
            title: '5 ',
            price: 250,
            time: '5:30 PM - 6:30 PM',
            sessions: 5,
        },
        {
            id: '3',
            title: '10',
            price: 475,
            time: '5:30 PM - 6:30 PM',
            sessions: 10,
        },
        {
            id: '4',
            title: '20',
            price: 900,
            time: '5:30 PM - 6:30 PM',
            sessions: 20,
        },
    ]
    const { addEvent } = useCalendarStore()

    const dispatch = useAppDispatch()

    const [isModalVisible, setModalVisible] = useState(false)
    const [isModalVisible2, setModalVisible2] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState('12:00 PM - 1:00 PM')
    const [selectedSessions, setSelectedSessions] = useState(0)

    const handleConfirm = (date: Date) => {
        setSelectedDate(date)
        setModalVisible(false)

        setTimeout(() => {
            setModalVisible2(true)
        }, 500)
    }

    const handleConfirm2 = (time: string, sessions: number) => {
        setSelectedTime(time)
        setModalVisible2(false)

        if (!selectedDate) return

        const events = []
        let currentDate = new Date(selectedDate)

        const customOrder = {
            id: '2',
            product: {
                id: '4',
                name: 'Personal Training',
                price: 90.0,
                image: 'https://via.placeholder.com/150',
            },
            activity: {
                date: selectedDate
                    ? selectedDate.toISOString().split('T')[0]
                    : '',
                time: time,
                type: 'training',

                Instructor: 'James Smith',
                location: 'Le Gym',
                description: 'Training with James Smith',
            },
            quantity: 1,
            total: 90.0 + 3.5,
            taxes: 3.5,
            discount: 0.0,
        }

        dispatch(setCurrentOrder(customOrder))

        router.push('/order-review' as any)

        // for (let i = 0; i < sessions; i++) {
        //     events.push({
        //         id: uuidv4(),
        //         title: 'Personal Training',
        //         date: currentDate.toISOString().split('T')[0],
        //         selected: true,
        //         selectedColor: '#EC7063', // Example color
        //         user_id: 'default_user', // Replace with actual user ID if available
        //         activity: {
        //             title: 'Personal Training',
        //             instructor: 'Jane Smith',
        //             location: 'Concordia Gym',
        //             days: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        //             time: selectedTime,
        //             description: 'Learn to diet Properly.',
        //             price: 90,
        //             type: 'Personal' as 'Personal',
        //         }
        //     });

        //     currentDate.setDate(currentDate.getDate() + 7);
        // }

        // events.forEach(event => addEvent(event));
    }

    return (
        <ScrollView style={styles.container}>
            <HeroBanner
                title="Personal Training Spring 2025"
                description="Helping you achieve your fitness goals."
                date="From Feb 10 to June 30"
                image={require('../assets/images/training.jpg')}
            />
            <Text style={styles.title}>Personal Training Packages</Text>
            <View style={styles.cardContainer}>
                {cards.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => {
                            console.log(
                                'Selected sessions on press:',
                                item.sessions
                            )
                            setModalVisible(true)
                            setSelectedSessions(item.sessions)
                        }}
                    >
                        <View style={styles.price}>
                            <Text style={styles.priceText}>${item.price}</Text>
                        </View>
                        <Text style={styles.number}>{item.title}</Text>
                        <Text style={styles.session}>
                            {' '}
                            {item.id === '1' ? 'Session' : 'Sessions'}
                        </Text>
                        <View style={styles.booking}>
                            <Text style={styles.cardText}>Book Now</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <BookingModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onConfirm={handleConfirm}
                />

                <BookingTimeModal
                    modalVisible={isModalVisible2}
                    onClose={() => setModalVisible2(false)}
                    onConfirm={selectedDate =>
                        handleConfirm2(selectedDate, selectedSessions)
                    }
                    date={selectedDate || new Date()}
                />
            </View>

            {/* Trainer Card Section */}
            <Text style={styles.title}>Meet Our Trainers</Text>
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
    )
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
        width: width / 2 - 40, // Each card takes half of the screen width minus margins
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
    title: {
        fontSize: 17,
        margin: 10,
        fontWeight: 'bold',
        marginLeft: 25,
    },

    price: {
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

    booking: {
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
        color: 'white',
        fontWeight: 'bold',
    },
    session: {
        position: 'absolute',
        top: 40,
        left: 15,
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
    },
})
