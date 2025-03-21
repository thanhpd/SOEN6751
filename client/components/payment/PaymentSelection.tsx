import CardCarousel from '@/components/payment/CardCarousel'
import { CardSchema, TCardSchema } from '@/components/payment/schema'
import SubmitButton from '@/components/payment/SubmitButton'
import { ControlledInput } from '@/components/primitives/input'
import { useAppSelector } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

type PaymentSelectionProps = {
    onMethodSubmit?: (data: TCardSchema) => void
    mode?: 'order' | 'management'
}

const PaymentSelection = ({
    onMethodSubmit,
    mode = 'order',
}: PaymentSelectionProps) => {
    const paymentMethodDB = useAppSelector(state => state.paymentMethodDB)
    const userId = useAppSelector(state => state.currentUserId)

    const paymentMethods = useMemo(() => {
        return paymentMethodDB.ids
            .map(id => paymentMethodDB.entities[id])
            .filter(card => card.userId === userId)
            .concat({
                id: '-1',
                userId: userId ?? '',
                billingCity: '',
                billingFullName: '',
                billingPostalCode: '',
                billingProvince: '',
                billingStreetAddress: '',
                cardBrand:
                    Math.floor(Math.random() * 10) > 4 ? 'mastercard' : 'visa',
                cardExpiration: '',
                cardHolder: '',
                cvv: '',
                cardNumber: '',
            })
    }, [paymentMethodDB, userId])

    const { control, handleSubmit, reset, watch } = useForm<TCardSchema>({
        mode: 'onChange',
        resolver: zodResolver(CardSchema),
        defaultValues: paymentMethods.length
            ? paymentMethods[0]
            : {
                  id: '-1',
                  userId: userId ?? '',
                  billingCity: '',
                  billingFullName: '',
                  billingPostalCode: '',
                  billingProvince: '',
                  billingStreetAddress: '',
                  cardBrand:
                      Math.floor(Math.random() * 10) > 4
                          ? 'mastercard'
                          : 'visa',
                  cardExpiration: '',
                  cardHolder: '',
                  cvv: '',
                  cardNumber: '',
              },
    })

    const currentCardId = watch('id')
    const isCurrentCardSaved = currentCardId !== '-1'

    const onSubmit = (data: TCardSchema) => {
        onMethodSubmit?.(data)
    }

    return (
        <View className="flex flex-col gap-4 pb-[40px]">
            <CardCarousel
                data={paymentMethods}
                onCardSelect={card => {
                    console.log({ selectedCard: card })
                    reset(card)
                }}
            />
            <View className="w-[85%] mx-auto">
                <View className="flex flex-col gap-2">
                    <ControlledInput
                        control={control}
                        name="cardNumber"
                        label="Card Number"
                        placeholder="Card number"
                        autoCorrect={false}
                        keyboardType="numeric"
                        disabled={isCurrentCardSaved}
                        maskMode={isCurrentCardSaved ? 'card' : undefined}
                    />
                    <ControlledInput
                        control={control}
                        name="cardHolder"
                        label="Name"
                        placeholder="Card holder name"
                        autoCorrect={false}
                        disabled={isCurrentCardSaved}
                    />
                    <View className="flex flex-row gap-3">
                        <View className="flex-grow-1 flex-[60%] w-[60%]">
                            <ControlledInput
                                control={control}
                                name="cardExpiration"
                                label="Expiration Date"
                                placeholder="MM/YY"
                                autoCorrect={false}
                                disabled={isCurrentCardSaved}
                            />
                        </View>
                        <View className="flex-grow-1 flex-[40%] w-[40%]">
                            <ControlledInput
                                control={control}
                                name="cvv"
                                label="CVV"
                                placeholder="CVV"
                                autoCorrect={false}
                                keyboardType="numeric"
                                disabled={isCurrentCardSaved}
                                maskMode={
                                    isCurrentCardSaved ? 'cvv' : undefined
                                }
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
                    <SubmitButton
                        mode={mode}
                        onSubmit={() => handleSubmit(onSubmit)()}
                        control={control}
                    />
                </View>
            </View>
        </View>
    )
}

export default PaymentSelection
