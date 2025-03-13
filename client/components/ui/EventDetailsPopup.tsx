import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '@/constants/Colors'
import {FontAwesome,Entypo,AntDesign} from '@expo/vector-icons/'

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
    handleCancelBooking: () => void
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({
    visible,
    activity,
    handleClose,
    handleCancelBooking,
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
                        <Text className="text-lg font-bold text-center w-full">Event Details</Text>
                    </View>

                    {/* Event Details */}
                    <Text className="text-xl font-bold mb-1">
                        {activity.title}
                    </Text>
                    <Text className="mb-1">{activity.instructor}</Text>
                    <View className="flex-row items-center">
                    <Entypo name="location" size={15} color="black" />
                        <Text className="ml-2 font-bold">
                            {activity.location}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                    <FontAwesome name="calendar" size={15} color="black" />
                        <Text className="ml-2 font-bold">{activity.days}</Text>
                    </View>
                    <View className="flex-row items-center">
                    <AntDesign name="clockcircleo" size={15} color="black" />
                        <Text className="ml-2 font-bold">{activity.time}</Text>
                    </View>

                    <View className="flex-row justify-between mt-2">
                                                {/* Close Button */}
                                                <TouchableOpacity
                                                    onPress={handleClose}
                                                    className="bg-white  px-10 py-3 rounded-lg border border-gray-300"
                                                >
                                                    <Text className="text-center text-gray-600">
                                                        Close
                                                    </Text>
                                                </TouchableOpacity>
                                                {/* Book Button */}
                                                <TouchableOpacity
                                                    onPress={handleCancelBooking}
                                                    className="bg-blue-600 p-3 rounded-lg "
                                                    style={{
                                                        backgroundColor:
                                                            Colors.concordia.background,
                                                    }}
                                                >
                                                    <Text className="text-center text-white">
                                                        Cancel Booking
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                </View>
            </View>
        </Modal>
    )
}

export default EventDetailsPopup
