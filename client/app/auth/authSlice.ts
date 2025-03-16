import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    isLoading: boolean
    isSignout: boolean
    userToken: string | null | undefined
    currentLoggingInUser: {
        email: string
        name: string
        avatarUrl: string
        stayLoggedIn: boolean
    } | null
    currentUser: Record<string, any> | null
}

const initialState: SliceState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    currentLoggingInUser: null,
    currentUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        restoreToken: (
            state,
            action: PayloadAction<string | null | undefined>
        ) => {
            state.userToken = action.payload
            state.isLoading = false
            state.isSignout = false
        },
        signIn: (state, action: PayloadAction<string | null | undefined>) => {
            state.isSignout = false
            state.isLoading = false
            state.userToken = action.payload
        },
        signOut: state => {
            state.isSignout = true
            state.isLoading = false
            state.userToken = null
            state.currentLoggingInUser = null
        },
        setCurrentLoggingInUser: (
            state,
            action: PayloadAction<Record<string, any> | null>
        ) => {
            // @ts-ignore
            state.currentLoggingInUser = action.payload
        },
        setCurrentUser: (state, action: PayloadAction<Record<string, any>>) => {
            state.currentUser = action.payload
        },
    },
})

export const {
    restoreToken,
    signIn,
    signOut,
    setCurrentLoggingInUser,
    setCurrentUser,
} = authSlice.actions

export default authSlice.reducer
