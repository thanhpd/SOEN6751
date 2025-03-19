import { QtySelector } from '@/components/payment/QtySelector'
import { TOrder, TProduct } from '@/components/payment/types'
import { Button } from '@/components/primitives/button'
import React, { useState } from 'react'
import { View, Text } from 'react-native'

const product: TProduct = {
    id: '1',
    name: 'Quarterly Membership',
    price: 12.0,
    image: 'https://via.placeholder.com/150',
}

const OrderReview = () => {
    const [order, setOrder] = useState<TOrder>({
        id: '1',
        product,
        quantity: 1,
        total: 12.0 + 1.2,
        discount: 0.0,
        taxes: 1.2,
    })

    const increaseQuantity = () => {
        setOrder(ord => {
            const newQty = ord.quantity + 1
            const subtotal = newQty * product.price
            const newTaxes = subtotal * 0.1
            const newTotal = subtotal + newTaxes
            return {
                ...ord,
                quantity: newQty,
                total: newTotal,
                taxes: newTaxes,
            }
        })
    }

    const decreaseQuantity = () => {
        setOrder(ord => {
            const newQty = ord.quantity - 1 > 0 ? ord.quantity - 1 : 1
            const subtotal = newQty * product.price
            const newTaxes = subtotal * 0.1
            const newTotal = subtotal + newTaxes
            return {
                ...ord,
                quantity: newQty,
                total: newTotal,
                taxes: newTaxes,
            }
        })
    }

    return (
        <View className="w-[87%] mx-auto flex flex-col">
            <View className="w-full rounded-2xl bg-red flex items-center justify-center my-[60px] p-[19px]">
                <Text className="text-white text-2xl font-bold mb-[22px]">
                    Quarterly Membership
                </Text>
                <View className="flex flex-row items-center justify-between gap-[47px]">
                    <QtySelector
                        qty={order.quantity}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                    />
                    <Text className="text-white text-xl font-medium">
                        ${Number(product.price).toFixed(2)}
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
                >
                    <Text className="text-white text-xl font-medium">
                        Complete Payment
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default OrderReview
