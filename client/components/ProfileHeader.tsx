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
        <View className="p-4 bg-white">
            <View className="items-center">
                <Image
                    source={{ uri: avatar }}
                    className="w-20 h-20 rounded-full"
                />
                <Text
                    className="text-lg font-bold text-center mt-2"
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#98243C',
                    }}
                >
                    {name}
                </Text>
                <Text
                    className="text-gray-600 text-center mt-0.5"
                    style={{ fontFamily: 'Roboto', color: '#ABABAB' }}
                >
                    {email}
                </Text>
                <Pressable
                    onPress={onEditPress}
                    className="mt-3 px-5 py-1.5 rounded-full"
                    style={{ backgroundColor: '#98243C' }}
                >
                    <Text
                        className="text-white font-medium"
                        style={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                    >
                        Edit Profile
                    </Text>
                </Pressable>
                <View className="mt-4 items-center">
                    <Text
                        className="text-6xl font-bold"
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: '#FFC107',
                            textShadowColor: '#FF6600',
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 2,
                            textAlign: 'center',
                        }}
                    >
                        {streak}
                    </Text>
                    <Text
                        className="text-gray-600 mt-0.5"
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
