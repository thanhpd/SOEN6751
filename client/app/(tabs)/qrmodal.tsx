import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useAuth } from '@/hooks/useAuth'
import { Colors } from '@/constants/Colors'
import ProfilePictureIcon from '@/components/icons/ProfilePictureIcon'
import * as Brightness from 'expo-brightness'
import { useFocusEffect } from '@react-navigation/native'

const QRCodeScreen: React.FC = () => {
    const { currentUser, incrementGamification } = useAuth()

    useFocusEffect(
        useCallback(() => {
            const setBrightness = async () => {
                try {
                    await Brightness.setBrightnessAsync(1.0) // Set brightness to maximum
                } catch (error) {
                    console.error('Failed to set brightness:', error)
                }
            }

            setBrightness()

            // Simulate a gamification increment when QR is scanned
            incrementGamification()

            return async () => {
                try {
                    await Brightness.restoreSystemBrightnessAsync() // Reset to system brightness
                } catch (error) {
                    console.error('Failed to reset brightness:', error)
                }
            }
        }, [incrementGamification])
    )

    if (!currentUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>User not found.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan Your QR Code</Text>

            <View style={styles.Qrcontainer}>
                {/* Profile Picture Circle */}
                <View style={styles.profileCircle}>
                    {currentUser?.avatar && (
                        <Image
                            source={{ uri: currentUser?.avatar }} // If avatar is available, use it
                            style={styles.profileImage}
                        />
                    )}
                    {!currentUser?.avatar && (
                        <ProfilePictureIcon width={96} height={96} />
                    )}
                </View>

                <View style={{ marginTop: 40, alignItems: 'center' }}>
                    <Text style={styles.detail}>
                        {currentUser?.firstName} {currentUser?.lastName}
                    </Text>
                    <Text style={styles.detail2}>{currentUser?.email}</Text>
                    <Text style={styles.detail2}>{currentUser?.studentId}</Text>
                </View>

                <View style={styles.qrBox}>
                    <QRCode
                        value={`${currentUser?.firstName},${currentUser?.lastName},${currentUser?.email},${currentUser?.studentId}`}
                        size={230}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    Qrcontainer: {
        backgroundColor: Colors.light.concordiaColor,
        width: '85%',
        height: '70%',
        alignItems: 'center',
        borderRadius: 20,
        position: 'relative', // Required for absolute children
    },
    profileCircle: {
        position: 'absolute',
        top: -50,
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 55,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.light.concordiaColor,
        zIndex: 10,
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 9999,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 70,
        color: 'black',
    },
    detail: {
        fontSize: 20,
        marginBottom: 5,
        marginTop: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    detail2: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'white',
    },
    qrBox: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
})

export default QRCodeScreen
