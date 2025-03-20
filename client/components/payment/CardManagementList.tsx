import PaymentCard from '@/components/payment/PaymentCard'
import { TCardSchema } from '@/components/payment/schema'
import { Button } from '@/components/primitives/button'
import React, { useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

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

const CardManagementList = () => {
    const [cards, setCards] = useState<TCardSchema[]>([...exampleCards])
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

    const handleDeleteCard = (cardNumber: string) => {
        setCards(cards => cards.filter(card => card.cardNumber !== cardNumber))
    }

    return (
        <View className="flex flex-col gap-[30px] pb-10">
            {cards.map(card => (
                <React.Fragment key={card.cardNumber}>
                    <View
                        key={card.cardNumber}
                        className="flex-col gap-2 mx-auto"
                    >
                        <PaymentCard card={card} />
                        <Button
                            className="rounded-2xl bg-red"
                            size="sm"
                            onPress={() => setSelectedCardId(card.cardNumber)}
                        >
                            <Text className="text-white font-medium">
                                Delete Card
                            </Text>
                        </Button>
                    </View>
                    <Modal
                        animationType="fade"
                        visible={selectedCardId === card.cardNumber}
                        transparent={true}
                    >
                        <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="bg-white rounded-[30px] p-[30px] w-11/12 flex flex-col gap-[30px]">
                                <View>
                                    <Text className="text-lg font-bold text-center">
                                        Delete Card
                                    </Text>
                                </View>
                                <Text className="text-2xl font-bold text-red text-center">
                                    Are you sure you want to delete your card?
                                </Text>
                                <View className="flex flex-row gap-9 justify-center items-center">
                                    <Pressable
                                        className="bg-white rounded-[30px] h-[34px] border-2 border-[#6E7781] w-[130px] items-center justify-center"
                                        onPress={() => setSelectedCardId(null)}
                                    >
                                        <Text>No</Text>
                                    </Pressable>
                                    <Pressable
                                        className="bg-red rounded-[30px] h-[34px] w-[130px] items-center justify-center"
                                        onPress={() => {
                                            handleDeleteCard(card.cardNumber)
                                            setSelectedCardId(null)
                                        }}
                                    >
                                        <Text className="text-white">Yes</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </React.Fragment>
            ))}
        </View>
    )
}

export default CardManagementList
