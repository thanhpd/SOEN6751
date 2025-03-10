import * as React from 'react'
import { Card, Button } from 'react-native-paper'
import { View } from 'react-native'
import { Colors } from '@/constants/Colors'
import { router, useRouter } from 'expo-router'
const BookingOptions = () => {
    return (
        <View className="flex-row flex-wrap justify-between p-1.5">
            <Button
                mode="contained"
                style={{
                    backgroundColor: Colors.boxPink.backgroundColor,
                    marginBottom: 8,
                }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] py-2"
                onPress={() => router.push('/activities')}
            >
                In-Person Activities
            </Button>
            <Button
                mode="contained"
                style={{
                    backgroundColor: Colors.boxYellow.backgroundColor,
                    marginBottom: 8,
                }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] py-2"
            >
                Online Activities
            </Button>
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxGray.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] py-2"
            >
                Personal Training
            </Button>
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxPurple.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] py-2"
            >
                Nutrition Consultancy
            </Button>
        </View>
    )
}

export default BookingOptions
