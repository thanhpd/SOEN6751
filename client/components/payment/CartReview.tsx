import { QtySelector } from '@/components/payment/QtySelector'
import { Button } from '@/components/primitives/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { decreaseQty, increaseQty } from '@/store/currentOrder'
import { router } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const CartReview = () => {
    const dispatch = useAppDispatch()
    const order = useAppSelector(state => state.currentOrder)

    const increaseQuantity = () => {
        if (!order) return
        dispatch(increaseQty(order))
    }

    const decreaseQuantity = () => {
        if (!order) return
        dispatch(decreaseQty(order))
    }

    if (!order) return null

    return (
        <View className="w-[87%] mx-auto flex flex-col">
            <View className="w-full rounded-2xl bg-red flex items-center justify-center mb-[60px] mt-[30px] p-[19px]">
                <Text className="text-white text-2xl font-bold mb-[22px]">
                    {order?.product.name}
                </Text>
                <View className="flex flex-row items-center justify-between gap-[47px]">
                    <QtySelector
                        qty={order?.quantity || 1}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                    />
                    <Text className="text-white text-xl font-medium">
                        ${Number(order?.product.price).toFixed(2)}
                    </Text>
                </View>
            </View>
            <View className="flex-col flex pb-[18px] border-b border-b-[#C7C7C7]">
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">Order Subtotal</Text>
                    <Text className="text-lg">
                        $
                        {Number(order.product.price * order.quantity).toFixed(
                            2
                        )}
                    </Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">Discount</Text>
                    <Text className="text-lg">
                        ${Number(order.discount).toFixed(2)}
                    </Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">Taxes</Text>
                    <Text className="text-lg">
                        ${Number(order.taxes).toFixed(2)}
                    </Text>
                </View>
            </View>
            <View className="mt-[18px] flex flex-row justify-between">
                <Text className="text-2xl font-semibold">Total</Text>
                <Text className="text-2xl font-semibold">
                    ${Number(order.total).toFixed(2)}
                </Text>
            </View>
            <View className="mt-8">
                <Button
                    size="lg"
                    className="w-full rounded-2xl bg-red flex items-center justify-center"
                    onPress={() => router.push('/order-payment')}
                >
                    <Text className="text-white text-xl font-medium">
                        Complete Payment
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default CartReview
