import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '@/constants/Colors'

interface EventDetailsPopupProps {
    visible: boolean
    activity: {
        title: string
        instructor: string
        location: string
        days: string
        time: string
    }
    month: string
    handleClose: () => void
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({
    visible,
    month,
    activity,
    handleClose,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white p-4 rounded-lg">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                onPress={handleClose}
                                className="mr-2"
                            >
                                <Text className="text-2xl font-bold">←</Text>
                            </TouchableOpacity>
                            <Text className="text-lg">{month}</Text>
                        </View>
                        <Text className="text-lg font-bold">Event Details</Text>
                    </View>

                    {/* Event Details */}
                    <Text className="text-xl font-bold mb-1">
                        {activity.title}
                    </Text>
                    <Text className="mb-1">{activity.instructor}</Text>
                    <View className="flex-row items-center">
                        <Image
                            source={require('../../assets/images/location_icon.png')}
                            className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">
                            {activity.location}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Image
                            source={require('../../assets/images/Wednesday.png')}
                            className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.days}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Image
                            source={require('../../assets/images/Clock.png')}
                            className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.time}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EventDetailsPopup
