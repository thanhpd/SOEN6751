import ProfilePictureIcon from '@/components/icons/ProfilePictureIcon'
import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'

interface ProfileHeaderProps {
    name: string
    email: string
    avatar: string
    onEditPress?: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    email,
    avatar,
    onEditPress,
}) => {
    return (
        <View className="p-4 bg-white">
            <View className="items-center">
                {avatar && <Image
                    source={{ uri: avatar }}
                    className="w-20 h-20 rounded-full border border-neutral-500"
                />}
                {!avatar && <ProfilePictureIcon width={96} height={96} />}
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
            </View>
        </View>
    )
}

export default ProfileHeader
