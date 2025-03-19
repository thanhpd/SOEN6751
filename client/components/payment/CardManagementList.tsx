import PaymentCard from '@/components/payment/PaymentCard'
import { TPaymentCard } from '@/components/payment/types'
import { Button } from '@/components/primitives/button'
import React, { useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const seedCards: TPaymentCard[] = [
    {
        id: '1',
        last4Digits: '3455',
        cardHolder: 'John Bonds',
        cardExpiration: '12/28',
        cardBrand: 'mastercard',
    },
    {
        id: '2',
        last4Digits: '7688',
        cardHolder: 'Jane Smith',
        cardExpiration: '11/29',
        cardBrand: 'visa',
    },
    {
        id: '3',
        last4Digits: '1234',
        cardHolder: 'Sarah Johnson',
        cardExpiration: '10/27',
        cardBrand: 'visa',
    },
    {
        id: '4',
        last4Digits: '5678',
        cardHolder: 'Michael Brown',
        cardExpiration: '09/26',
        cardBrand: 'mastercard',
    },
    {
        id: '5',
        last4Digits: '9012',
        cardHolder: 'Emily Davis',
        cardExpiration: '08/25',
        cardBrand: 'mastercard',
    },
]

const CardManagementList = () => {
    const [cards, setCards] = useState<TPaymentCard[]>([...seedCards])
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

    const handleDeleteCard = (id: string) => {
        setCards(cards => cards.filter(card => card.id !== id))
    }

    return (
        <View className="flex flex-col gap-[30px]">
            {cards.map(card => (
                <React.Fragment key={card.id}>
                    <View key={card.id} className="flex-col gap-2 mx-auto">
                        <PaymentCard card={card} />
                        <Button
                            className="rounded-2xl bg-red"
                            size="sm"
                            onPress={() => setSelectedCardId(card.id)}
                        >
                            <Text className="text-white font-medium">
                                Delete Card
                            </Text>
                        </Button>
                    </View>
                    <Modal
                        animationType="fade"
                        visible={selectedCardId === card.id}
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
                                            handleDeleteCard(card.id)
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
