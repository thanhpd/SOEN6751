import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import ToggleButton from '@/components/ui/ToggleButton'

const SettingsSection: React.FC = () => {
    return (
        <View className="mt-2 bg-white">
            <View className="p-4">
                <Text className="text-lg font-semibold">Badges</Text>
                <View className="flex-row items-center ml-1">
                    <Image
                        source={require('../assets/images/Brown Retro Badge Fitness Center Logo 1.svg')}
                        style={{ width: 107, height: 107 }}
                    />
                    <Image
                        source={require('../assets/images/Simple Illustration Sports Gym Fitness Badge Logo 1.svg')}
                        style={{ width: 124, height: 124 }}
                    />
                </View>
            </View>
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
                            Notifications
                        </Text>
                    </View>
                    <ToggleButton />
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40
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
                            Gamification
                        </Text>
                    </View>
                    <ToggleButton />
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40
                        }}
                    />
                </View>

                <View
                    className="flex-row items-center justify-between mb-1"
                    onTouchEnd={() => console.log("payment pressed")}
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

                <View
                    className="flex-row items-center justify-between mb-1"
                    onTouchEnd={() => console.log("faq pressed")}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="w-10 h-10 items-center justify-center">
                            <Image
                                source={require('../assets/images/faq-icon.svg')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <Text className="text-base font-medium ml-2">
                            FAQ
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/images/chevron.forward.svg')}
                        style={{ width: 7, height: 12, marginRight: 10 }}
                    />
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40
                        }}
                    />
                </View>

                <View
                    className="flex-row items-center justify-between mb-1"
                    onTouchEnd={() => console.log("t&c pressed")}
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
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40
                        }}
                    />
                </View>

                <View
                    className="flex-row items-center justify-between mb-1"
                    onTouchEnd={() => console.log("contact us pressed")}
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
                </View>

                {/* Horizontal line divider within the same View */}
                <View className="flex-row items-center justify-between mb-2">
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: '#EDEFF1',
                            marginLeft: 40
                        }}
                    />
                </View>

                <View
                    className="flex-row items-center justify-between"
                    onTouchEnd={() => console.log("log out pressed")}
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
                </View>
            </View>
        </View>
    )
}

export default SettingsSection
