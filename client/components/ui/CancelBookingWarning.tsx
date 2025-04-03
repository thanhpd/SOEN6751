import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '@/constants/Colors'
import useCalendarStore from '@/store/CalendarStore'

interface CancelBookingWarningsProps {
    visible: boolean
    onClose: () => void
    onCancel: () => void
}

const CancelBookingWarning: React.FC<CancelBookingWarningsProps> = ({
    visible,
    onClose: handleClose,
    onCancel: handleConfirm,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white p-4 rounded-lg">
                    <View className="flex-row items-center">
                        <Text
                            className="text-xl font-bold mb-1"
                            style={{
                                color: Colors.concordia.text, // Assuming Colors.concordia.text is the desired text color
                            }}
                        >
                            Are you sure you want to cancel your booking?
                        </Text>
                    </View>

                    <View className="flex-row justify-between mt-2">
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={handleClose}
                            className="bg-white px-10 py-3 rounded-lg border border-gray-300 w-[120px]"
                        >
                            <Text className="text-center text-gray-600">
                                No
                            </Text>
                        </TouchableOpacity>
                        {/* Book Button */}
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className="bg-blue-600 p-3 rounded-lg w-[120px]"
                            style={{
                                backgroundColor: Colors.concordia.background,
                            }}
                        >
                            <Text className="text-center text-white">Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CancelBookingWarning
