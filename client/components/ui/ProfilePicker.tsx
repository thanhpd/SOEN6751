// import { Image } from 'expo-image'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Pressable } from 'react-native-gesture-handler'
import { cn } from '@/lib/utils'

type ProfilePickerProps = {
    className?: string
}

const ProfilePicker = ({ className }: ProfilePickerProps) => {
    const [image, setImage] = useState<string | null>(null)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <View className={cn('flex items-center justify-center', className)}>
            <Pressable
                className="w-[84px] h-[84px] rounded-full mb-2 border-2 border-black flex"
                onPress={pickImage}
            >
                <View className="w-24 h-24 rounded-full border border-gray-300">
                    {image && (
                        <Image
                            source={{
                                uri: image,
                            }}
                            className="w-24 h-24 rounded-full"
                        />
                    )}
                </View>
            </Pressable>
        </View>
    )
}

export default ProfilePicker
