import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

const { width } = Dimensions.get('window')

export default function OnlinePage() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardText}>Online Training</Text>
                {/* Use the Image component to display the PNG */}
                <Image
                    source={require('../assets/images/undraw_personal-trainer_bqkg.svg')}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
    },
    cardText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
    },
})
