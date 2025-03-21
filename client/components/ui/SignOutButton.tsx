import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSignOut } from '@/hooks/useSignOut'

const SignOutButton = () => {
    const signOut = useSignOut()

    return (
        <TouchableOpacity onPress={signOut}>
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
