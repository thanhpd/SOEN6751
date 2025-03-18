import React from 'react'
import { View, Text, Image } from 'react-native'
import { CustomButton } from '@/components/CustomButton'
import { DotsIndicator } from '@/components/DotsIndicator'

export default function EmergencyResponse() {
    return (
        <View
            className="flex-1 p-6 items-center justify-center"
            style={{ backgroundColor: '#E4AEAE' }}
        >
            <Text
                style={{
                    fontFamily: 'Mirza',
                    fontSize: 40,
                    fontWeight: 400,
                    marginTop: 57,
                    textAlign: 'center',
                }}
            >
                Emergency Response
            </Text>

            <Image
                source={{
                    uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ad8d1f39b71e173ff0e3de65c4012d022561b12c',
                }}
                style={{ width: 232, height: 232, marginBottom: 24 }}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel="Emergency Response Icon"
            />

            <Text
                style={{
                    fontFamily: 'Mirza',
                    fontSize: 17,
                    textAlign: 'center',
                    marginBottom: 100,
                    paddingHorizontal: 16,
                }}
            >
                In case of an emergency, simply press the emergency button and
                rest assured that help is on the way!
            </Text>

            <DotsIndicator totalDots={4} activeDot={3} />

            <CustomButton
                onPress={() => {
                    console.log('Emergency button pressed')
                }}
                title="GOT IT!"
            />
        </View>
    )
}
