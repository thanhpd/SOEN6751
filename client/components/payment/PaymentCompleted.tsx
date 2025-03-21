import PaymentBackground from '@/components/payment/PaymentBackground'
import { Button } from '@/components/primitives/button'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const PaymentCompleted = () => {
    return (
        <ScrollView contentContainerClassName="relative flex-col items-center">
            <View className="relative flex-col items-center w-[350px] h-[722px]">
                <PaymentBackground />
                <View className="absolute top-[100px] left-0 right-0 bottom-0 flex flex-col justify-items-center pt-[20px] w-full h-full">
                    <View className="flex flex-col items-center">
                        <Text className="text-2xl font-medium">Thank you!</Text>
                        <Text className="text-xl">
                            Your transaction was successful
                        </Text>
                        <View className="flex-row justify-between items-center mt-[40px] w-full px-[22px]">
                            <Text className="text-lg">Date</Text>
                            <Text className="text-lg font-semibold">date</Text>
                        </View>
                        <View className="flex-row justify-between items-center mt-[10px] w-full px-[22px]">
                            <Text className="text-lg">Time</Text>
                            <Text className="text-lg font-semibold">time</Text>
                        </View>
                        <View className="flex-row justify-between items-center mt-[10px] w-full px-[22px]">
                            <Text className="text-lg">To</Text>
                            <Text className="text-lg font-semibold">
                                Kasikorn Bank
                            </Text>
                        </View>
                        <View className="flex my-6 h-[2px] bg-[#C7C7C7] w-11/12 mx-[11px]" />
                        <View className="flex-row justify-between items-center w-full px-[22px]">
                            <Text className="text-2xl font-semibold">
                                Total
                            </Text>
                            <Text className="text-2xl font-semibold">
                                $1000
                            </Text>
                        </View>
                        <View className="px-[22px] h-[75px] flex w-full mt-[25px]">
                            <View className="bg-white rounded-[15px] w-full h-full flex-row justify-between items-center">
                                <Text>Payment method</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex flex-col items-center">
                        <View className="flex my-6 h-[2px] border border-dashed border-[#C7C7C7] w-10/12 mx-[22px]" />
                        <View className="w-[200px] ">
                            <Button variant="outline" className="h-[60px]">
                                <Text className="text-xl font-medium text-red leading-[1.2]">
                                    View calendar
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default PaymentCompleted
