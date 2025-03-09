import React from 'react'
import { View, Image } from 'react-native'
import { Activity } from '../../constants/types'
import { Card, Text } from 'react-native-paper'
import { Colors } from '@/constants/Colors'

export const ActivityItem = ({ activity }: { activity: Activity }) => {
    return (
        <Card>
            <Card.Content>
                <View className="flex-1 flex-row items-center">
                    <Image
                        source={require('../../assets/images/hero.png')}
                        className="w-24 h-24 rounded-lg"
                        style={{ backgroundColor: Colors.concordia.background }}
                    />

                    <View className="flex-1 pl-2 justify-between">
                        <View className="flex-1">
                            <Text className="text-black text-lg font-bold" style={{ color: Colors.concordia.text, fontWeight: 'bold' }}>
                                {activity.title}
                            </Text>
                            <Text className="text-black">
                                {activity.instructor}
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-end">
                            <Image
                                source={require('../../assets/images/location_icon.png')}
                            />
                            <Text className="text-black flex-1 p-2">
                                {activity.location}
                            </Text>
                            <Text className=" text-white text-center rounded-full px-3 py-1"style={{ backgroundColor: Colors.concordia['red-button'] }}>
                                {activity.price}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}
