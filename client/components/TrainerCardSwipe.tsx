import React, { useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { FontAwesome5 } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

interface Trainer {
    profilePic: string
    name: string
    certification: string
    education: string
}

const trainers: Trainer[] = [
    {
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        certification: 'ACE Certified',
        education: 'B.Sc. in Sports Science',
    },
    {
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Jane Smith',
        certification: 'NASM Certified',
        education: 'M.Sc. in Kinesiology',
    },
    {
        profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Mike Johnson',
        certification: 'ISSA Certified',
        education: 'B.Sc. in Exercise Physiology',
    },
]

const TrainerCard2: React.FC = () => {
    const swiperRef = useRef<Swiper<Trainer>>(null)
    const [cardIndex, setCardIndex] = useState(0)

    return (
        <View style={styles.container}>
            <Swiper
                ref={swiperRef}
                cards={trainers}
                renderCard={trainer => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: trainer.profilePic }}
                            style={styles.profilePic}
                        />
                        <Text style={styles.name}>{trainer.name}</Text>

                        <View style={styles.infoContainer}>
                            <FontAwesome5
                                name="certificate"
                                size={16}
                                color="#555"
                            />
                            <Text style={styles.infoText}>
                                {trainer.certification}
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <FontAwesome5
                                name="graduation-cap"
                                size={16}
                                color="#555"
                            />
                            <Text style={styles.infoText}>
                                {trainer.education}
                            </Text>
                        </View>
                    </View>
                )}
                onSwiped={index => {
                    console.log('Swiped:', trainers[index].name)
                    setCardIndex(index + 1)
                }}
                onSwipedAll={() => {
                    console.log('No more cards! Restarting...')
                    setTimeout(() => {
                        swiperRef.current?.jumpToCardIndex(0)
                        setCardIndex(0)
                    }, 500)
                }}
                backgroundColor="transparent"
                cardIndex={cardIndex}
                stackSize={3} // Number of stacked cards
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width * 0.8,
        height: height * 0.3,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 8,
    },
})

export default TrainerCard2
