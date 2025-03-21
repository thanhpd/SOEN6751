import React from 'react'
import { View, Text } from 'react-native'

export const RealTimeGraph: React.FC = () => {
    return (
        <View className="mt-6 p-4 bg-gray-50 rounded-lg">
            <View className="items-center">
                <Text className="text-4xl font-bold text-blue-600">127</Text>
                <Text className="text-gray-600 mt-2">Current Occupancy</Text>
            </View>

            <View className="mt-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-600">Capacity Status:</Text>
                    <View className="bg-yellow-200 px-3 py-1 rounded">
                        <Text className="text-yellow-800">Moderate</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">Last Updated:</Text>
                    <Text className="text-gray-800">Just now</Text>
                </View>
            </View>
        </View>
    )
}
