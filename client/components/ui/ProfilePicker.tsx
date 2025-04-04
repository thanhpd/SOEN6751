// import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Pressable } from 'react-native-gesture-handler'
import { cn } from '@/lib/utils'
import ProfilePictureIcon from '@/components/icons/ProfilePictureIcon'
import EditIcon from '@/components/icons/EditIcon'

type ProfilePickerProps = {
    className?: string
    onImageChange?: (image: string) => void
    value?: string
    disabled?: boolean
}

const ProfilePicker = ({
    className,
    onImageChange,
    value,
    disabled,
}: ProfilePickerProps) => {
    const [image, setImage] = useState<string | null>(value || null)

    useEffect(() => {
        setImage(value || null)
    }, [value])

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
            onImageChange?.(result.assets[0].uri)
        }
    }

    return (
        <View className={cn('flex items-center justify-center', className)}>
            <Pressable
                className="w-[84px] h-[84px] rounded-full mb-2 border-2 border-black flex relative"
                onPress={pickImage}
                disabled={disabled}
            >
                {!disabled && (
                    <View className="absolute bottom-2 left-2 w-[84px] flex items-center justify-center flex-row z-50">
                        <EditIcon className="w-[21px] h-[19px]" />
                    </View>
                )}
                {image && (
                    <View className="w-24 h-24 rounded-full border border-gray-300">
                        <Image
                            source={{
                                uri: image,
                            }}
                            className="w-24 h-24 rounded-full"
                        />
                    </View>
                )}
                {!image && <ProfilePictureIcon width={96} height={96} />}
            </Pressable>
        </View>
    )
}

export default ProfilePicker
