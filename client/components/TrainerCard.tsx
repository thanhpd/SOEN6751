import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '@/constants/Colors'
const { width } = Dimensions.get('window') // Get screen width

interface TrainerCardProps {
    profilePic: string // URL or local path to the profile picture
    name: string
    certification: string
    education: string
}

const TrainerCard: React.FC<TrainerCardProps> = ({
    profilePic,
    name,
    certification,
    education,
}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.certification}>
                    Certification: {certification}
                </Text>
                <Text style={styles.education}>Education: {education}</Text>
            </View>
        </View>
    )
}

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
    certification: {
        fontSize: 14,
        color: '#555',
    },
    education: {
        fontSize: 14,
        color: '#555',
    },
})

export default TrainerCard
