import React, { useState } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons/'
import CancelBookingWarning from './CancelBookingWarning'
import { CalendarEvent } from '@/constants/types'

interface EventDetailsPopupProps {
    visible: boolean,
    events: CalendarEvent[],
    close: () => void
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({
    visible,
    events,
    close: handleClose,
}) => {
    const [showCancelWarning, setShowCancelWarning] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const activities = events.map(event => event.activity);

    const handleNext = () => {
        setCurrentIndex(prevIndex =>
            prevIndex < activities.length - 1 ? prevIndex + 1 : prevIndex
        )
    }
    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white p-4 rounded-lg">
                    <Text className="text-lg font-bold text-center mb-2">
                        Event Details
                    </Text>

                    <View className="flex-row items-center justify-between mb-2">
                        <TouchableOpacity onPress={handlePrevious} className='p-3'>
                            <AntDesign name="left" size={20} color="black" />
                        </TouchableOpacity>

                        <ScrollView className="w-4/5">
                            <Text className="text-xl font-bold mb-1">
                                {activities[currentIndex].title}
                            </Text>
                            <Text className="mb-1">
                                {activities[currentIndex].instructor}
                            </Text>
                            <View className="flex-row items-center">
                                <Entypo name="location" size={15} color="black" />
                                <Text className="ml-2 font-bold">
                                    {activities[currentIndex].location}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <FontAwesome name="calendar" size={15} color="black" />
                                <Text className="ml-2 font-bold">
                                    {activities[currentIndex].days}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <AntDesign name="clockcircleo" size={15} color="black" />
                                <Text className="ml-2 font-bold">
                                    {activities[currentIndex].time}
                                </Text>
                            </View>
                        </ScrollView>

                        <TouchableOpacity onPress={handleNext} className='p-3'>
                            <AntDesign name="right" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between mt-4">
                        <TouchableOpacity
                            onPress={handleClose}
                            className="bg-white px-10 py-3 rounded-lg border border-gray-300"
                        >
                            <Text className="text-center text-gray-600">Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowCancelWarning(true)}
                            className="bg-blue-600 p-3 rounded-lg"
                            style={{
                                backgroundColor: Colors.concordia.background,
                            }}
                        >
                            <Text className="text-center text-white">
                                Cancel Booking
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showCancelWarning && (
                <CancelBookingWarning
                    visible={showCancelWarning}
                    handleClose={() => setShowCancelWarning(false)}
                    handleConfirm={() => {
                        setShowCancelWarning(false)
                        handleClose()
                    }}
                />
            )}
        </Modal>
    )
}

export default EventDetailsPopup
