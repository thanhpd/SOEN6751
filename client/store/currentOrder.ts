import { TOrder } from '@/components/payment/types'
import { createSlice } from '@reduxjs/toolkit'

const initState: TOrder | null = null

export const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState: initState as TOrder | null,
    reducers: {
        increaseQty: (state, action) => {
            if (!state) return

            const newQty = state.quantity + 1
            const newTaxes = Number(state.product.price) * newQty * 0.1
            const newTotal = newQty * Number(state.product.price) + newTaxes
            state.quantity = newQty
            state.taxes = newTaxes
            state.total = newTotal
        },
        decreaseQty: (state, action) => {
            if (!state || state.quantity <= 1) return
            const newQty = state.quantity - 1
            const newTaxes = Number(state.product.price) * newQty * 0.1
            const newTotal = newQty * Number(state.product.price) + newTaxes
            state.quantity = newQty
            state.taxes = newTaxes
            state.total = newTotal
        },
        setCurrentOrder: (state, action) => {
            const order = action.payload as TOrder
            return {
                ...order,
                taxes: Number(order.product.price) * order.quantity * 0.1,
                total:
                    order.quantity * Number(order.product.price) +
                    Number(order.product.price) * order.quantity * 0.1,
                discount: 0,
            }
        },
    },
})

export const { setCurrentOrder, increaseQty, decreaseQty } =
    currentOrderSlice.actions

export default currentOrderSlice.reducer
