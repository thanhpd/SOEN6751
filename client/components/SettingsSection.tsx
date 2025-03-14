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
                <View className="flex-row items-center justify-between mb-2">
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

                <View className="flex-row items-center justify-between">
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
            </View>
        </View>
    )
}

export default SettingsSection
