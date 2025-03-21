import { Membership } from '@/constants/types'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const membershipDBAdapter = createEntityAdapter<Membership>()

export const membershipDBSlice = createSlice({
    name: 'membershipDB',
    initialState: membershipDBAdapter.getInitialState(),
    reducers: {
        setDBMemberships: membershipDBAdapter.setAll,
        addDBMembership: membershipDBAdapter.addOne,
    },
})

export const { setDBMemberships, addDBMembership } = membershipDBSlice.actions

export default membershipDBSlice.reducer
