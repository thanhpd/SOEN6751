import React, { PropsWithChildren } from 'react'
import { useAppSelector } from '@/store'
import * as SecureStore from 'expo-secure-store'
import { restoreToken } from '@/app/auth/authSlice'
import { Redirect } from 'expo-router'

const AuthWrapper = ({ children }: PropsWithChildren) => {
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const userToken = useAppSelector(state => state.auth.userToken)
    // console.log({ isAuthLoading, userToken })

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userToken = await SecureStore.getItemAsync('userToken')
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            // console.log('Restoring token:', userToken)
            restoreToken(userToken)
        }

        bootstrapAsync()
    }, [])

    if (isAuthLoading) return null

    return userToken ? (
        <Redirect href="/(tabs)" />
    ) : (
        <Redirect href="/auth/AuthLayout" />
    )
}

export default AuthWrapper
