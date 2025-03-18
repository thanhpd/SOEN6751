import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '@/components/primitives/input'
import { Button } from '@/components/primitives/button'
import { Portal } from '@rn-primitives/portal'
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

export type TResetPasswordSchema = zod.infer<typeof ResetPasswordSchema>

type Props = {
    onGoBack: () => void
    onSuccess: (form: TResetPasswordSchema) => void
}

const ResetPasswordForm = ({ onGoBack, onSuccess }: Props) => {
    const { handleSubmit, control } = useForm<TResetPasswordSchema>({
        mode: 'onChange',
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: TResetPasswordSchema) => {
        onSuccess(data)
    }

    return (
        <Portal name="reset-password-form">
            <View
                className="z-10 w-[87%] h-3/4 mx-auto"
                style={{
                    marginBottom: 20,
                }}
            >
                <View className=" bg-white rounded-[30px] py-10 px-6 z-10 h-full">
                    <View className="h-full flex flex-col justify-between">
                        <View>
                            <View className="flex flex-row items-center gap-3 mb-[6px]">
                                <TouchableOpacity
                                    className="items-center h-full"
                                    onPress={onGoBack}
                                >
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
            </View>
            <View className="absolute top-0 bottom-0 left-0 right-0 bg-black/40" />
        </Portal>
    )
}

export default ResetPasswordForm
