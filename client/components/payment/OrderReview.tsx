import { Button } from '@/components/primitives/button'
import React from 'react'
import { View, Text } from 'react-native'

const OrderReview = () => {
    return (
        <View className="w-[87%] mx-auto">
            <View>
                <Text>Quarterly Membership</Text>
                {/* TODO: Add the price */}
                <Text>12.00</Text>
            </View>
            <View className="flex-col flex pb-[18px] border-b border-b-[#C7C7C7]">
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">Order Subtotal</Text>
                    <Text className="text-lg">$12.00</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">Discount</Text>
                    <Text className="text-lg">$0.00</Text>
                </View>
            </View>
            <View className="mt-[18px] flex flex-row justify-between">
                <Text className="text-2xl font-semibold">Total</Text>
                <Text className="text-2xl font-semibold">$12.00</Text>
            </View>
            <View className="mt-8">
                <Button className="w-full rounded-2xl bg-red">
                    <Text className="text-white text-xl font-medium">
                        Complete Payment
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default OrderReview
