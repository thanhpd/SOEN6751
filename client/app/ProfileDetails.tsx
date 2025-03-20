import React from 'react'
import { View, Text } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import zod from 'zod'
import { ControlledInput } from '@/components/primitives/input'
import { Button } from '@/components/primitives/button'
import { ScrollView } from 'react-native-gesture-handler'
import ProfilePicker from '@/components/ui/ProfilePicker'

const UserDetailsSchema = zod
    .object({
        firstName: zod.string().min(1),
        lastName: zod.string().min(1),
        email: zod.string().email(),
        avatar: zod.string().url(),
        newPassword: zod.string().min(2),
        confirmPassword: zod.string().min(2),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

type TUserDetailsSchema = zod.infer<typeof UserDetailsSchema>

type Props = {
    onSubmit: (data: TUserDetailsSchema) => void
}

const ProfileDetails = () => {
    const { handleSubmit, control } = useForm<TUserDetailsSchema>({
        mode: 'onChange',
        resolver: zodResolver(UserDetailsSchema),
        defaultValues: {
            firstName: 'Mahim',
            lastName: 'Rahman',
            email: 'mahim@gmail.com',
            avatar: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: TUserDetailsSchema) => {
        console.log(data)
    }

    return (
        <ScrollView contentContainerClassName="pb-10 pt-5">
            <View className="flex flex-col items-center justify-center mb-5">
                <ProfilePicker className="mb-3" />
                <Text className="text-[#98243C] text-base font-bold">
                    Mahim
                </Text>
                <Text className="text-[#ABABAB]">mahim@gmail.com</Text>
            </View>
            <View className="w-[85%] mx-auto rounded-t-6 bg-white shadow-lg shadow-black p-5 flex flex-col gap-1">
                <ControlledInput
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    autoCorrect={false}
                    readOnly
                />
                <ControlledInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    autoCorrect={false}
                    readOnly
                />
                <ControlledInput
                    control={control}
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    readOnly
                />
                <ControlledInput
                    control={control}
                    name="newPassword"
                    label="Update Password"
                    placeholder="Enter your password"
                    autoCorrect={false}
                    secureTextEntry
                />
                <ControlledInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    autoCorrect={false}
                    secureTextEntry
                />
                <View className="pt-5">
                    <Button
                        className="bg-red rounded-[28px] w-full"
                        onPress={() => {
                            handleSubmit(onSubmit)()
                        }}
                    >
                        <Text className="text-white font-bold">
                            Update Profile
                        </Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileDetails
