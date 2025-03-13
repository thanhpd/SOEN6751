import * as React from 'react'
import { Card, Button } from 'react-native-paper'
import { View } from 'react-native'
import { Colors } from '@/constants/Colors'
import { router, useRouter } from 'expo-router'
const BookingOptions = () => {
    const router = useRouter();
    return (
        <View className="flex-row flex-wrap justify-between">
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
                onPress={() => router.push('/InPersonActivity' as any)}
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
                onPress={() => router.push('/OnlineActivity' as any)}
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
                onPress={() => router.push('/PersonalTraining' as any)}
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
                onPress={() => router.push('/NutritionConsultancy' as any)}
            >
                Nutrition Consultancy
            </Button>
        </View>
    )
}

export default BookingOptions
