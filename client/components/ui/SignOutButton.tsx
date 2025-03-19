import { signOut } from '@/app/auth/authSlice'
import { useAppDispatch } from '@/store'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const SignOutButton = () => {
    const dispatch = useAppDispatch()

    return (
        <TouchableOpacity onPress={() => dispatch(signOut())}>
            <Ionicons
                name="exit-outline"
                size={28}
                color="#333"
                style={{ marginRight: 15 }}
            />
        </TouchableOpacity>
    )
}

export default SignOutButton
