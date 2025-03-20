import CardCarousel from '@/components/payment/CardCarousel'
import { CardSchema, TCardSchema } from '@/components/payment/schema'
import { Button } from '@/components/primitives/button'
import { ControlledInput } from '@/components/primitives/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const exampleCardData: TCardSchema = {
    cardNumber: '1234567890123456',
    cardHolder: 'John Doe',
    cardExpiration: '12/25',
    cardBrand: 'mastercard',
    cvv: '123',
    billingFullName: 'John Doe',
    billingStreetAddress: '123 Main St',
    billingProvince: 'QC',
    billingCity: 'Montreal',
    billingPostalCode: 'H3Z2Y7',
}

const exampleCards: TCardSchema[] = [
    { ...exampleCardData, cardNumber: '1234567890123456' },
    { ...exampleCardData, cardNumber: '1234567890123457' },
    { ...exampleCardData, cardNumber: '1234567890123458' },
    { ...exampleCardData, cardNumber: '1234567890123459' },
    { ...exampleCardData, cardNumber: '1234567890123460' },
]

const PaymentSelection = () => {
    const { control, handleSubmit } = useForm<TCardSchema>({
        mode: 'onChange',
        resolver: zodResolver(CardSchema),
        defaultValues: exampleCardData,
    })

    const onSubmit = (data: TCardSchema) => {
        console.log(data)
    }

    return (
        <View className="flex flex-col gap-4 pb-[40px]">
            <CardCarousel data={exampleCards} />
            <View className="w-[85%] mx-auto">
                <View className="flex flex-col gap-2">
                    <ControlledInput
                        control={control}
                        name="cardNumber"
                        label="Card Number"
                        placeholder="Card number"
                        autoCorrect={false}
                    />
                    <ControlledInput
                        control={control}
                        name="cardHolder"
                        label="Name"
                        placeholder="Card holder name"
                        autoCorrect={false}
                    />
                    <View className="flex flex-row gap-3 items-center">
                        <View className="flex-grow-1 flex-[60%] w-[60%]">
                            <ControlledInput
                                control={control}
                                name="cardExpiration"
                                label="Expiration Date"
                                placeholder="MM/YY"
                                autoCorrect={false}
                            />
                        </View>
                        <View className="flex-grow-1 flex-[40%] w-[40%]">
                            <ControlledInput
                                control={control}
                                name="cvv"
                                label="CVV"
                                placeholder="CVV"
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                </View>

                <Text className="text-lg font-bold mt-9 mb-2">
                    Billing Address
                </Text>
                <View className="flex flex-col gap-2">
                    <ControlledInput
                        control={control}
                        name="billingFullName"
                        label="Name"
                        placeholder="Billing name"
                        autoCorrect={false}
                    />
                    <ControlledInput
                        control={control}
                        name="billingStreetAddress"
                        label="Street Address"
                        placeholder="Street address"
                        autoCorrect={false}
                    />
                    <ControlledInput
                        control={control}
                        name="billingProvince"
                        label="Province"
                        placeholder="Province"
                        autoCorrect={false}
                    />
                    <ControlledInput
                        control={control}
                        name="billingCity"
                        label="City"
                        placeholder="City"
                        autoCorrect={false}
                    />
                    <ControlledInput
                        control={control}
                        name="billingPostalCode"
                        label="Postal Code"
                        placeholder="Postal code"
                        autoCorrect={false}
                    />
                </View>
                <View className="mt-[40px]">
                    <Button
                        size="lg"
                        className="bg-red rounded-[28px] w-full"
                        onPress={() => handleSubmit(onSubmit)()}
                    >
                        <Text className="text-white text-base font-bold">
                            Update
                        </Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default PaymentSelection
