import React from 'react'
import { View, Image } from 'react-native'
import { Activity } from '../../constants/types'
import { Card, Text } from 'react-native-paper'
import { Colors } from '@/constants/Colors'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export const InPersonActivityItem = ({ activity }: { activity: Activity }) => {
    // Create a mapping for image sources
    const imageMapping = {
        'cardio.png': require('../../assets/images/cardio.png'),
        'zumba.png': require('../../assets/images/zumba.png'),
        'aero.png': require('../../assets/images/aero.png'),
        'exercise_classes.png': require('../../assets/images/exercise_classes.png'),
    }
    const activityImage = activity.image
        ? imageMapping[
              activity.image.split('/').pop() as keyof typeof imageMapping
          ]
        : null
    return (
        <Card>
            <Card.Content>
                <View className="flex-1 flex-row items-center">
                    <Image
                        source={activityImage}
                        className="w-24 h-24 rounded-lg"
                    />

                    <View className="flex-1 pl-2 justify-between">
                        <View className="flex-1">
                            <Text
                                className="text-black text-lg font-bold"
                                style={{
                                    color: Colors.concordia.text,
                                    fontWeight: 'bold',
                                }}
                            >
                                {activity.title}
                            </Text>
                            <Text className="text-black">
                                {activity.instructor}
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-end">
                            <Entypo name="location" size={20} color="black" />
                            <Text className="text-black flex-1 p-2">
                                {activity.location}
                            </Text>
                            <Text
                                className=" text-white text-center rounded-full px-3 py-1"
                                style={{
                                    backgroundColor:
                                        Colors.concordia['red-button'],
                                }}
                            >
                                <FontAwesome
                                    className="p-1"
                                    name="dollar"
                                    size={12}
                                    color="black"
                                />
                                {activity.price}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}
