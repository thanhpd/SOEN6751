import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/poster.png')} // Change to your image path
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})

export default SplashScreen
