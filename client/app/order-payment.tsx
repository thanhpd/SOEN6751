import PaymentLayout from '@/components/payment/PaymentLayout'
import { useAppDispatch, useAppSelector } from '@/store'
import { upsertDBPaymentMethod } from '@/store/paymentMethodDB'
import React from 'react'
import { Toast } from 'toastify-react-native'
import uuid from 'react-native-uuid'
import { setCurrentOrder } from '@/store/currentOrder'
import { router } from 'expo-router'

const OrderPayment = () => {
    const dispatch = useAppDispatch()
    const order = useAppSelector(state => state.currentOrder)

    return (
        <>
            <PaymentLayout
                mode="order"
                onMethodSubmit={card => {
                    const newCard = {
                        ...card,
                        id: card.id === '-1' ? uuid.v4() : card.id,
                    }

                    dispatch(
                        setCurrentOrder({
                            ...order,
                            paymentMethod: newCard,
                        })
                    )
                    if (newCard.saveCard) {
                        dispatch(upsertDBPaymentMethod(newCard))
                    }

                    router.replace('/order-completed')

                    console.log(card)
                }}
            />
        </>
    )
}

export default OrderPayment
