import React, { PropsWithChildren } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { memberships } from '@/data/seed/membership'
import { setDBMemberships } from '@/store/membershipDB'
import { setCurrentUserId } from '@/store/currentUserId'
import { setDBAccounts } from '@/store/accountDB'
import { accounts } from '@/data/seed/account'

const AuthWrapper = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const membershipDB = useAppSelector(state => state.membershipDB)
    const accountDB = useAppSelector(state => state.accountDB)
    const currentUserId = useAppSelector(state => state.currentUserId)

    React.useEffect(() => {
        setTimeout(() => {
            if (membershipDB.ids.length === 0) {
                dispatch(setDBMemberships(memberships))
            }
            if (accountDB.ids.length === 0) {
                dispatch(setDBAccounts(accounts))
            }
        }, 0)
    }, [])

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userId

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userId = await SecureStore.getItemAsync('userId')
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            if (userId) {
                dispatch(setCurrentUserId(userId))
            }
        }

        bootstrapAsync()
    }, [])

    React.useEffect(() => {
        if (currentUserId) {
            setTimeout(() => {
                router.replace('/(tabs)')
            }, 0)
        } else {
            setTimeout(() => {
                router.replace('/auth/AuthLayout')
            }, 0)
        }
    }, [currentUserId])

    return null
}

export default AuthWrapper
