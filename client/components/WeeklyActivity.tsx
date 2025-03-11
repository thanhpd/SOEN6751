import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'

const WeeklyActivity: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
        <View className="px-6 py-4 bg-white mt-2">
            <View className="flex-row justify-between">
                {days.map((day, index) => (
                    <View key={index} className="items-center">
                        <Text
                            className="text-sm text-black-600 capitalize"
                            style={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                        >
                            {day}
                        </Text>
                        <View
                            className="w-8 h-8 rounded-full mt-2 items-center justify-center"
                            style={{
                                backgroundColor:
                                    day === 'Mon' ? '#EDEFF1' : '#FFCE51',
                            }}
                        >
                            {day !== 'Mon' && (
                                <Image
                                    source={require('../assets/images/fire-vector.svg')}
                                    style={{ width: 16, height: 23 }}
                                />
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default WeeklyActivity
