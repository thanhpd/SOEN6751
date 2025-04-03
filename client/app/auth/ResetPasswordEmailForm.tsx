import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/primitives/button'
import { Portal } from '@rn-primitives/portal'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { ControlledInput } from '@/components/primitives/input'
import { useForgetPassword } from '@/hooks/useForgetPassword'
import { BaseAccount } from '@/constants/types'

const ResetPasswordEmailSchema = zod.object({
    email: zod.string().email(),
})

export type TResetPasswordEmailSchema = zod.infer<
    typeof ResetPasswordEmailSchema
>

type Props = {
    onGoBack: () => void
    onSuccess: (data: BaseAccount) => void
}

const ResetPasswordEmailForm = ({ onGoBack, onSuccess }: Props) => {
    const { checkEmailToForget } = useForgetPassword()
    const { handleSubmit, control, setError } =
        useForm<TResetPasswordEmailSchema>({
            mode: 'onChange',
            resolver: zodResolver(ResetPasswordEmailSchema),
            defaultValues: {
                email: '',
            },
        })

    const onSubmit = (data: TResetPasswordEmailSchema) => {
        const response = checkEmailToForget(data.email)
        if (response.success) {
            onSuccess(response.user as BaseAccount)
        } else {
            setError('email', { message: response.message })
        }
    }

    useEffect(() => {
        const backAction = () => {
            onGoBack?.()
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )

        return () => backHandler.remove()
    }, [onGoBack])

    return (
        <Portal name="reset-password-form">
            <View
                className="z-10 w-[87%] h-3/4 mx-auto"
                style={{
                    marginBottom: 20,
                }}
            >
                <View className=" bg-white rounded-[30px] py-10 px-6 z-10 h-full">
                    <View className="h-full flex flex-col justify-between relative">
                        <View className="flex flex-col gap-6">
                            <View>
                                <View className="flex flex-row items-center gap-3">
                                    <TouchableOpacity
                                        className="h-full"
                                        onPress={() => {
                                            onGoBack()
                                        }}
                                    >
                                        <ArrowLeftIcon />
                                    </TouchableOpacity>
                                    <Text className="font-bold text-red text-base">
                                        Verify your email to get password reset
                                        link
                                    </Text>
                                </View>
                                <Text className="text-xs leading-[1.6] text-[#9EA1AE] font-default-400 mb-[6px]">
                                    Make sure that you have access to your email
                                    account.
                                </Text>
                            </View>
                            <View className="flex flex-col gap-4 mt-8">
                                <ControlledInput
                                    control={control}
                                    name="email"
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Button
                                className="bg-red rounded-[28px] w-full"
                                onPress={() => {
                                    handleSubmit(onSubmit)()
                                }}
                            >
                                <Text className="text-white font-bold">
                                    Send OTP
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

export default ResetPasswordEmailForm
