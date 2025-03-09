import React from 'react'
import { View, Image, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { Colors } from '@/constants/Colors'

export default function HeroBanner() {
    return (
        <View className="p-2">
            <Card >
            <View className="flex-row rounded-lg" style={{ backgroundColor: Colors.concordia.background }}>
            <View className="flex-1 p-4">
                <Text className="text-white text-2xl font-bold">In - Person Activities
                Winter 2025</Text>
                <Text className="text-white text-s">Get inspired and moving at the same time.</Text>
                <View style={{ height: 8 }} />
                <Text className="text-white text-l">From Jan. 13 to April 6</Text>
            </View>
            <Image
                source={require('../assets/images/hero.png')}
                className="rounded-tr-2xl rounded-br-2xl"
            />
            </View>
        </Card>
        </View>
        
    )
}
