import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FullWindowOverlay } from 'react-native-screens'
import { Portal } from '@rn-primitives/portal'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'

const ResetPasswordSchema = zod
    .object({
        newPassword: zod.string().min(2),
        confirmPassword: zod.string().min(2),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

type TResetPasswordSchema = zod.infer<typeof ResetPasswordSchema>

const ResetPasswordForm = () => {
    const { handleSubmit, control } = useForm<TResetPasswordSchema>({
        mode: 'onChange',
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: TResetPasswordSchema) => {
        console.log(data)
    }

    return (
        <Portal name="reset-password-form">
            <SafeAreaView className="z-10 w-[87%] h-3/4 mx-auto">
                <View className=" bg-white rounded-t-[30px] py-10 px-6 z-10 h-full">
                    <View className="h-full flex flex-col justify-between">
                        <View>
                            <View className="flex flex-row items-center gap-3 mb-[6px]">
                                <TouchableOpacity className="items-center h-full">
                                    <ArrowLeftIcon />
                                </TouchableOpacity>
                                <Text className="font-bold text-red text-base">
                                    Set a new password for your account
                                </Text>
                            </View>
                            <View className="flex flex-col gap-4 mt-8">
                                <ControlledInput
                                    control={control}
                                    name="newPassword"
                                    label="New Password"
                                    placeholder="Enter your password"
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                                <ControlledInput
                                    control={control}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Enter your password"
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <View>
                            <Button
                                className="bg-red rounded-[28px] w-full"
                                onPress={() => {
                                    handleSubmit(onSubmit)()
                                }}
                            >
                                <Text className="text-white font-bold">
                                    Reset Password
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <View className="absolute top-0 bottom-0 left-0 right-0 bg-black/40" />
        </Portal>
    )
}

export default ResetPasswordForm
