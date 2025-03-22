import PaymentLayout from '@/components/payment/PaymentLayout'
import { useAppDispatch } from '@/store'
import { upsertDBPaymentMethod } from '@/store/paymentMethodDB'
import React from 'react'
import uuid from 'react-native-uuid'
import { Toast } from 'toastify-react-native'

const PaymentManager = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <PaymentLayout
                mode="management"
                onMethodSubmit={card => {
                    const newCard = {
                        ...card,
                        id: card.id === '-1' ? uuid.v4() : card.id,
                    }
                    dispatch(upsertDBPaymentMethod(newCard))
                    Toast.success(
                        card.id === '-1'
                            ? 'Card added successfully'
                            : 'Card updated successfully'
                    )
                }}
            />
        </>
    )
}

export default PaymentManager
