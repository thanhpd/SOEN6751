import { TCardSchema } from '@/components/payment/schema'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const paymentMethodDBAdapter = createEntityAdapter<TCardSchema>()

export const paymentMethodDBSlice = createSlice({
    name: 'paymentMethodDB',
    initialState: paymentMethodDBAdapter.getInitialState(),
    reducers: {
        setDBPaymentMethods: paymentMethodDBAdapter.setAll,
        addDBPaymentMethod: paymentMethodDBAdapter.addOne,
        deleteDBPaymentMethod: paymentMethodDBAdapter.removeOne,
        updateDBPaymentMethod: paymentMethodDBAdapter.updateOne,
        upsertDBPaymentMethod: paymentMethodDBAdapter.upsertOne,
    },
})

export const {
    setDBPaymentMethods,
    addDBPaymentMethod,
    deleteDBPaymentMethod,
    updateDBPaymentMethod,
    upsertDBPaymentMethod,
} = paymentMethodDBSlice.actions

export default paymentMethodDBSlice.reducer
