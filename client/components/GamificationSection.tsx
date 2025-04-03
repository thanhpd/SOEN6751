import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import WeeklyActivity from '@/components/WeeklyActivity'

interface GamificationSectionProps {
    streak: number
}

const GamificationSection: React.FC<GamificationSectionProps> = ({
    streak,
}) => {
    return (
        <View>
            <View className="items-center p-2 bg-white">
                <Text
                    className="text-6xl font-bold"
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#FFC107',
                        textShadowColor: '#FF6600',
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    {streak}
                </Text>
                <Text
                    className="text-gray-600 mt-0.5"
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#0F2552',
                        textAlign: 'center',
                    }}
                >
                    Workout Streak
                </Text>
            </View>
            <WeeklyActivity />
            <View className="mt-2 p-4 bg-white">
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
        </View>
    )
}

export default GamificationSection
