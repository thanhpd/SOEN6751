import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ButtonProps {
    title: string
    variant?: 'primary' | 'secondary'
    onPress?: () => void
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-6 py-3 rounded-lg ${
                variant === 'primary' ? 'bg-[#98243C]' : 'bg-gray-200'
            }`}
        >
            <Text
                className={`text-center text-base font-medium ${
                    variant === 'primary' ? 'text-white' : 'text-gray-700'
                }`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}
