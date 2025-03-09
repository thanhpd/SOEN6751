import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const BookingOptionsHeader = () => {
    return (
        <View className="p-5">
            <Text variant="headlineSmall">Lock in Your</Text>
            <Text variant="headlineMedium">Next Fitness Move</Text>
            <Text variant="titleSmall">
                Choose from in-person & online activities, personal training, or
                nutrition sessions.
            </Text>
        </View>
    )
}

export default BookingOptionsHeader
