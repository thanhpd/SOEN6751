import React from 'react'
import { View, Text, Image } from 'react-native'

interface TimeLocationPriceProps {
    time: string
    location: string
    price: string
    days: string
}

export const TimeLocationPrice: React.FC<TimeLocationPriceProps> = ({
    time,
    location,
    price,
    days,
}) => {
    return (
        <View className="space-y-4">
            <View className="flex-row items-center space-x-3">
                <Image
                    source={require('../assets/clock-icon.png')}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                <Text className="text-gray-700">{time}</Text>
            </View>

            <View className="flex-row items-center space-x-3">
                <Image
                    source={require('../assets/clock-icon.png')}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                <Text className="text-gray-700">{time}</Text>
            </View>

            <View className="flex-row items-center space-x-3">
                <Image
                    source={require('../assets/clock-icon.png')}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                <Text className="text-gray-700">{time}</Text>
            </View>

            <View className="flex-row items-center space-x-3">
                <Image
                    source={require('../assets/clock-icon.png')}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                <Text className="text-gray-700">{time}</Text>
            </View>
        </View>
    )
}
