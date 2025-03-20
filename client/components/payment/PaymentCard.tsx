import CardBackground from '@/components/payment/CardBackground'
import LogoMastercard from '@/components/payment/images/LogoMastercard'
import LogoVisa from '@/components/payment/images/LogoVisa'
import { TCardSchema } from '@/components/payment/schema'
import { TPaymentCard } from '@/components/payment/types'
import React from 'react'
import { Text, View } from 'react-native'

type TPaymentCardProps = {
    card: TCardSchema
}

const PaymentCard = ({ card }: TPaymentCardProps) => {
    const CardBrand =
        card.cardBrand === 'mastercard' ? LogoMastercard : LogoVisa

    return (
        <View className="relative" style={{ width: 350, height: 205 }}>
            <CardBackground />
            <View
                className="absolute top-0 right-0 w-full h-full flex flex-col justify-between"
                style={{ padding: 16, paddingTop: 8 }}
            >
                <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-medium">Credit Card</Text>
                    <CardBrand
                        width={50}
                        height={50}
                        className="absolute top-4 right-4"
                    />
                </View>
                <View>
                    <View className="flex-row items-center pb-2">
                        <Text
                            className="text-base font-medium"
                            style={{ width: '50%' }}
                        >
                            **** {card.cardNumber.slice(-4)}
                        </Text>
                        <Text className="text-base font-medium">
                            {card.cardExpiration}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text
                            className="text-lg font-medium"
                            style={{ textTransform: 'uppercase' }}
                        >
                            {card.cardHolder}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PaymentCard
