import CardCarousel from '@/components/payment/CardCarousel'
import { CardSchema, TCardSchema } from '@/components/payment/schema'
import SubmitButton from '@/components/payment/SubmitButton'
import { ControlledInput } from '@/components/primitives/input'
import { Label } from '@/components/primitives/label'
import { ControlledPicker } from '@/components/ui/Picker'
import { useAppSelector } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View, Switch } from 'react-native'

// Define the Canadian provinces
export const PROVINCES = [
    { label: 'Select Province', value: '' },
    { label: 'Alberta', value: 'AB' },
    { label: 'British Columbia', value: 'BC' },
    { label: 'Manitoba', value: 'MB' },
    { label: 'New Brunswick', value: 'NB' },
    { label: 'Newfoundland and Labrador', value: 'NL' },
    { label: 'Northwest Territories', value: 'NT' },
    { label: 'Nova Scotia', value: 'NS' },
    { label: 'Nunavut', value: 'NU' },
    { label: 'Ontario', value: 'ON' },
    { label: 'Prince Edward Island', value: 'PE' },
    { label: 'Quebec', value: 'QC' },
    { label: 'Saskatchewan', value: 'SK' },
    { label: 'Yukon', value: 'YT' },
]

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

    const { control, handleSubmit, reset, watch, setValue } =
        useForm<TCardSchema>({
            mode: 'onChange',
            resolver: zodResolver(CardSchema),
            defaultValues: paymentMethods.length
                ? paymentMethods[0]
                : {
                      id: '-1',
                      saveCard: false,
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

    const [currentCardId, saveCard] = watch(['id', 'saveCard'])
    const isCurrentCardSaved = currentCardId !== '-1'
    const isNewCard = currentCardId === '-1'

    const onSubmit = (data: TCardSchema) => {
        onMethodSubmit?.(data)
    }

    const [selectedLanguage, setSelectedLanguage] = useState()

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
                <View className="flex flex-row mb-2">
                    <Text className="text-red-600 font-default-400 text-sm font-bold">
                        {'*'}
                    </Text>
                    <Text>{' indicates a required field'}</Text>
                </View>
                <View className="flex flex-col gap-2">
                    <ControlledInput
                        control={control}
                        name="cardNumber"
                        label="Card Number"
                        placeholder="Card number"
                        autoCorrect={false}
                        keyboardType="numeric"
                        readOnly={isCurrentCardSaved}
                        disabled={isCurrentCardSaved}
                        maskMode={isCurrentCardSaved ? 'card' : undefined}
                    />
                    <ControlledInput
                        control={control}
                        name="cardHolder"
                        label="Name"
                        placeholder="Card holder name"
                        autoCorrect={false}
                        readOnly={isCurrentCardSaved}
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
                                readOnly={isCurrentCardSaved}
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
                                readOnly={isCurrentCardSaved}
                                disabled={isCurrentCardSaved}
                                maskMode={
                                    isCurrentCardSaved ? 'cvv' : undefined
                                }
                            />
                        </View>
                    </View>
                </View>

                <Text className="text-lg font-bold mt-9">Billing Address</Text>
                <Text className="mb-2">
                    This is required for processing payments securely.
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
                    {/* <ControlledInput
                        control={control}
                        name="billingProvince"
                        label="Province"
                        placeholder="Province"
                        autoCorrect={false}
                    /> */}
                    <ControlledPicker
                        control={control}
                        options={PROVINCES}
                        name="billingProvince"
                        label="Province"
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
                    {mode === 'order' && isNewCard && (
                        <View className="flex flex-row items-center gap-2">
                            <Switch
                                value={watch('saveCard') || false}
                                onValueChange={value => {
                                    setValue('saveCard', value)
                                }}
                                nativeID="saved-card"
                                trackColor={{
                                    false: 'rgba(152, 36, 60, 0.29)',
                                    true: 'rgba(152, 36, 60, 0.6)',
                                }}
                                thumbColor={
                                    saveCard ? 'rgba(152, 36, 60, 1)' : '#fff'
                                }
                            />
                            <Label
                                nativeID="save-card"
                                onPress={() => setValue('saveCard', !saveCard)}
                                className="text-sm font-normal"
                            >
                                Save Card information
                            </Label>
                        </View>
                    )}
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
