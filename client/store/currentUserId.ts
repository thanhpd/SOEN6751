import { createSlice } from '@reduxjs/toolkit'

export const currentUserIdSlice = createSlice({
    name: 'currentUserId',
    initialState: null,
    reducers: {
        setCurrentUserId: (state, action) => action.payload,
    },
})

export const { setCurrentUserId } = currentUserIdSlice.actions

export default currentUserIdSlice.reducer
