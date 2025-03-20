import React, { PropsWithChildren } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import * as SecureStore from 'expo-secure-store'
import { restoreToken } from '@/app/auth/authSlice'
import { useRouter } from 'expo-router'

const AuthWrapper = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const userToken = useAppSelector(state => state.auth.userToken)

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
            dispatch(restoreToken(userToken))
        }

        bootstrapAsync()
    }, [])

    React.useEffect(() => {
        if (!isAuthLoading) {
            if (userToken) {
                router.replace('/(tabs)')
            } else {
                router.replace('/auth/AuthLayout')
            }
        }
    }, [userToken])

    return null
}

export default AuthWrapper
