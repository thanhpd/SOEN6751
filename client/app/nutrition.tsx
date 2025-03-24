import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native'
import HeroBanner from '@/components/HeroBanner'
import { Colors } from '@/constants/Colors'
import BookingModal from '@/components/BookingSlotModal'
import BookingTimeModal from '@/components/BookingTimeModal'
import useCalendarStore from '@/store/CalendarStore'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const { width } = Dimensions.get('window')

export default function OnlinePage() {
    const { addEvent } = useCalendarStore()

    const [isModalVisible, setModalVisible] = useState(false)
    const [isModalVisible2, setModalVisible2] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState('12:00 PM - 1:00 PM')

    const handleConfirm = (date: Date) => {
        setSelectedDate(date)
        setModalVisible(false)

        // Introduce a delay before opening the second modal
        setTimeout(() => {
            setModalVisible2(true)
        }, 500) // Delay in milliseconds (1000ms = 1 second)
    }

    const handleConfirm2 = (time: string) => {
        setSelectedTime(time)

        setModalVisible2(false)
        addEvent({
            id: uuidv4(),
            date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',

            activity: {
                title: 'Nutrition Consultancy',
                instructor: 'Jenny Cheung',
                location: 'Online',
                days: 'Tuesday',
                time: selectedTime,
                description: 'Learn to diet Properly.',
                price: '$90',
                type: 'Nutrition',
            },
        })
    }

    return (
        <View style={styles.container}>
            <HeroBanner
                title="Nutrition Consultancy Spring 2025"
                description="Keep track of your macros."
                date="From April 10 to June 30"
                image={require('../assets/images/nutrition.jpg')}
            />

            <Text style={styles.title}>Dietitian Jessy Cheung</Text>

            <View style={styles.card}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.quote}>
                        "Assess where you are in your nutrition journey and
                        discover how we can work together to build sustainable
                        habits that help you reach your goals."
                    </Text>
                    <Text style={styles.cardText}>
                        Tues. and Thurs. - 4-7 p.m
                    </Text>
                    <Text style={styles.cardText}>Saturdays - 9-11 a.m</Text>
                    <Text style={styles.cardText}>Each Session $90</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.cardText2}>Register Now</Text>
                    </TouchableOpacity>

                    <BookingModal
                        isVisible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                        onConfirm={handleConfirm}
                    />

                    <BookingTimeModal
                        modalVisible={isModalVisible2}
                        onClose={() => setModalVisible2(false)}
                        onConfirm={handleConfirm2}
                        date={selectedDate || new Date()}
                    />
                </View>

                <View style={styles.imageSection}>
                    <Image
                        style={styles.tipimage}
                        source={require('../assets/images/jessy.png')}
                    ></Image>
                </View>
            </View>

            <Text style={styles.title}>Diet Tips</Text>

            <View style={styles.tipsContainer}>
                <View style={styles.tips}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/tip.png')}
                    ></Image>
                    <Text style={styles.tipText}>
                        Switch up your morning routine with this simple combo
                        you can prepare the night before Greek or plain yogurt,
                        fruit and muesli. A combo that's easy to pack, delivers
                        on texture and is nutritious..
                    </Text>
                </View>

                <View style={styles.tips}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/tip2.png')}
                    ></Image>
                    <Text style={styles.tipText}>
                        Research suggests that eating patterns similar to
                        the Mediterranean diet (rich in fruits, vegetables, nuts
                        and whole-grains and low in red meat and processed
                        food) can support a positive mood.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    card: {
        flexDirection: 'row',
        marginLeft: 20,

        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
        marginBottom: 20,
    },
    cardText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },

    cardText2: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },
    image: {
        width: 150,
        height: 150,
    },

    tipimage: {
        width: 120,
        height: 150,
    },

    cardTextContainer: {
        flexDirection: 'column',

        alignItems: 'flex-start',
        flex: 1,
    },

    button: {
        borderRadius: 20,
        backgroundColor: Colors.light.concordiaColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 100,

        marginTop: 20,

        marginLeft: 40,
    },

    imageSection: {
        flexDirection: 'column',
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        marginBottom: 10,
    },

    quote: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 10,
    },

    tips: {
        flexDirection: 'column',
        alignItems: 'flex-start',

        marginRight: 10,
        flex: 1,
    },

    tipsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 30,

        gap: 10,
    },

    tipText: {
        fontSize: 10,
    },
})
