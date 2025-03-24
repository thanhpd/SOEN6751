import { Account } from '@/constants/types'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const accountDBAdapter = createEntityAdapter<Account>()

export const accountDBSlice = createSlice({
    name: 'accountDB',
    initialState: accountDBAdapter.getInitialState(),
    reducers: {
        setDBAccounts: accountDBAdapter.setAll,
        addDBAccount: accountDBAdapter.addOne,
        updateDBAccount: accountDBAdapter.updateOne,
    },
})

export const { setDBAccounts, addDBAccount, updateDBAccount } =
    accountDBSlice.actions

export default accountDBSlice.reducer
