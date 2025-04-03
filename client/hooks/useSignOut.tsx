import { useAppDispatch } from '@/store'
import * as SecureStore from 'expo-secure-store'
import { Toast } from 'toastify-react-native'
import { setCurrentUserId } from '@/store/currentUserId'
import { setTmpUser } from '@/store/tmpUser'

export function useSignOut() {
    const dispatch = useAppDispatch()

    const signOut = () => {
        SecureStore.deleteItemAsync('userId')
        dispatch(setCurrentUserId(null))
        dispatch(setTmpUser(null))
        Toast.success('Logged out successfully')
    }

    return signOut
}
