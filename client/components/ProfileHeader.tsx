import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'

interface ProfileHeaderProps {
    name: string
    email: string
    avatar: string
    streak: number
    onEditPress?: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    email,
    avatar,
    streak,
    onEditPress,
}) => {
    return (
        <View className="p-6 bg-white">
            <View className="items-center">
                <Image
                    source={{ uri: avatar }}
                    className="w-24 h-24 rounded-full"
                />
                <View className="mt-4">
                    <Text
                        className="text-xl font-bold text-center"
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: '#98243C',
                        }}
                    >
                        {name}
                    </Text>
                </View>
                <View className="mt-1">
                    <Text
                        className="text-gray-600 text-center"
                        style={{ fontFamily: 'Roboto', color: '#ABABAB' }}
                    >
                        {email}
                    </Text>
                </View>
                <Pressable
                    onPress={onEditPress}
                    className="mt-4 px-6 py-2 rounded-full"
                    style={{ backgroundColor: '#98243C' }}
                >
                    <Text
                        className="text-white font-medium"
                        style={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                    >
                        Edit Profile
                    </Text>
                </Pressable>
                <View className="mt-6 items-center">
                    <Text
                        className="text-7xl font-bold"
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: '#FFC107',
                            textShadowColor: '#FF6600',
                            textShadowOffset: { width: 3, height: 3 },
                            textShadowRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        {streak}
                    </Text>
                    <Text
                        className="text-gray-600 mt-1"
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: '#0F2552',
                            textAlign: 'center',
                        }}
                    >
                        Workout Streak
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader
