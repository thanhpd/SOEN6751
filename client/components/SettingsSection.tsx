import React from 'react'
//import Toast from 'react-native-simple-toast'

import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import ToggleButton from '@/components/ui/ToggleButton'
import { useSignOut } from '@/hooks/useSignOut'
import { useAuth } from '@/hooks/useAuth'
import ToastManager, { Toast } from 'toastify-react-native'
import { push } from 'expo-router/build/global-state/routing'

const SettingsSection: React.FC = () => {
    const router = useRouter() // Use Expo Router for navigation
    const signOut = useSignOut()
    const { currentUser, toggleGamification, toggleNotification } = useAuth()

    const handleToggleNotification = (value: boolean) => {
        toggleNotification(value)

        ToastManager.success(
            value
                ? 'Your push notifications are turned ON'
                : 'Your push notifications are turned OFF',
        )
      
    }

    const handleToggleGamification = (value: boolean) => {
        toggleGamification(value)

        Toast.info(
            value
                ? 'Workout streak now VISIBLE!'
                : 'Workout streak now HIDDEN!',
        )
    
    }

    return (
        <View className="mt-2 bg-white">
            <View className="p-4">
                <Text className="text-lg font-semibold">Settings</Text>
            </View>

            <View className="px-4 pb-4">
                <View className="flex-row items-center justify-between mb-1">
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/notification-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            Push Notifications
                        </Text>
                    </View>
                    <ToggleButton
                        initialState={currentUser?.notificationToggle}
                        onToggle={handleToggleNotification}
                    />
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40,
                        }}
                    />
                </View>

                <View className="flex-row items-center justify-between mb-1">
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/gamification-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            LeStreak
                        </Text>
                    </View>
                    <ToggleButton
                        initialState={currentUser?.gamificationToggle}
                        onToggle={handleToggleGamification}
                    />
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40,
                        }}
                    />
                </View>

                <View
                    className="flex-row items-center justify-between mb-1"
                    onTouchEnd={() => {
                        router.push('/payment-manager')
                    }}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/payment-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            Payment
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </View>

                <View className="p-1 mt-2">
                    <Text className="text-lg font-semibold">More</Text>
                </View>

                {/* FAQ Option */}
                <TouchableOpacity
                    onPress={() => {
                        console.log('FAQ pressed')
                        router.push('/faq') // Navigate to FaqScreen
                    }}
                    className="flex-row items-center justify-between mb-1"
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/faq-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">FAQ</Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </TouchableOpacity>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40,
                        }}
                    />
                </View>

                <TouchableOpacity
                    className="flex-row items-center justify-between mb-1"
                    onPress={() => router.push('/terms')}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/terms-conditions-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            Terms & Conditions
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </TouchableOpacity>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40,
                        }}
                    />
                </View>

                <TouchableOpacity
                    className="flex-row items-center justify-between mb-1"
                    onPress={() => router.push('/contact')}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/contact-us-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            Contact Us
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </TouchableOpacity>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40,
                        }}
                    />
                </View>

                <TouchableOpacity
                    className="flex-row items-center justify-between"
                    onPress={signOut}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/log-out-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            Log Out
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingsSection
