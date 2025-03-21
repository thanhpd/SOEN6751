import CartReview from '@/components/payment/CartReview'
import { TOrder, TProduct } from '@/components/payment/types'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCurrentOrder } from '@/store/currentOrder'
import React from 'react'

const product: TProduct = {
    id: '1',
    name: 'Quarterly Membership',
    price: 12.0,
    image: 'https://via.placeholder.com/150',
}

const sampleOrder: TOrder = {
    id: '1',
    product,
    quantity: 1,
    total: 12.0 + 1.2,
    taxes: 1.2,
    discount: 0.0,
}

const OrderReview = () => {
    const dispatch = useAppDispatch()
    const order = useAppSelector(state => state.currentOrder)

    // TODO: Update/remove this to use the actual order
    React.useEffect(() => {
        if (!order) {
            dispatch(setCurrentOrder(sampleOrder))
        }
    }, [order])

    if (!order) return null

    return <CartReview />
}

export default OrderReview
