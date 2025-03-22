import { Account, Membership } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState:
    | (Omit<Account, 'password'> &
          Membership & {
              stayLoggedIn?: boolean
          })
    | null = null

export const tmpUserSlice = createSlice({
    name: 'tmpUser',
    initialState: initialState,
    reducers: {
        setTmpUser: (state, action) => action.payload,
    },
})

export const { setTmpUser } = tmpUserSlice.actions

export default tmpUserSlice.reducer
