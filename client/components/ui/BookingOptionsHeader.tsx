import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const BookingOptionsHeader = () => {
    return (
        <View className="p-2">
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>
                Next Fitness Move
            </Text>
        </View>
    )
}

export default BookingOptionsHeader
