import * as React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'

const BookingOptions = () => {
    const router = useRouter()
    return (
        <View className="flex-row flex-wrap justify-between">
            <Button
                mode="contained"
                className="w-[28%] py-2 mb-2 bg-pink-500"
                labelStyle={{ color: 'black', textAlign: 'center', flexWrap: 'wrap', width: '100%' }}
                onPress={() => router.push('/InPersonActivity' as any)}
            >
                In-Person Activities
            </Button>
            <Button
                mode="contained"
                className="w-[28%] py-2 mb-2 bg-yellow-500"
                labelStyle={{ color: 'black', textAlign: 'center', flexWrap: 'wrap', width: '100%' }}
                onPress={() => router.push('/OnlineActivity' as any)}
            >
                Online Activities
            </Button>
            <Button
                mode="contained"
                className="w-[28%] py-2 bg-gray-500"
                labelStyle={{ color: 'black', textAlign: 'center', flexWrap: 'wrap', width: '100%' }}
                onPress={() => router.push('/PersonalTraining' as any)}
            >
                Personal Training
            </Button>
            <Button
                mode="contained"
                className="w-[28%] py-2 bg-purple-500"
                labelStyle={{ color: 'black', textAlign: 'center', flexWrap: 'wrap', width: '100%' }}
                onPress={() => router.push('/NutritionConsultancy' as any)}
            >
                Nutrition Consultancy
            </Button>
        </View>
    )
}

export default BookingOptions
