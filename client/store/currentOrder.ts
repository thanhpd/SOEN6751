import { TOrder } from '@/components/payment/types'
import { createSlice } from '@reduxjs/toolkit'

const initState: TOrder | null = null

export const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState: initState as TOrder | null,
    reducers: {
        increaseQty: (state, action) => {
            if (!state) return
            state.quantity += 1
            state.total += state.product.price
            state.taxes += state.product.price * 0.1
        },
        decreaseQty: (state, action) => {
            if (!state || state.quantity <= 1) return
            state.quantity -= 1
            state.total -= state.product.price
            state.taxes -= state.product.price * 0.1
        },
        setCurrentOrder: (state, action) => action.payload,
    },
})

export const { setCurrentOrder, increaseQty, decreaseQty } =
    currentOrderSlice.actions

export default currentOrderSlice.reducer
