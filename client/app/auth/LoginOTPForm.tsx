import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/primitives/button'
import { Portal } from '@rn-primitives/portal'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { ControlledInputOTP, InputOTP } from '@/components/ui/InputOTP'
import ProfilePictureIcon from '@/components/icons/ProfilePictureIcon'
import InfoIcon from '@/components/icons/InfoIcon'

const LoginOTPSchema = zod.object({
    otpCode: zod.string().length(6),
})

type TLoginSchema = zod.infer<typeof LoginOTPSchema>

const LoginOTPForm = () => {
    const { handleSubmit, control } = useForm<TLoginSchema>({
        mode: 'onChange',
        resolver: zodResolver(LoginOTPSchema),
        defaultValues: {
            otpCode: '',
        },
    })

    const onSubmit = (data: TLoginSchema) => {
        console.log(data)
    }

    return (
        <Portal name="reset-password-form">
            <SafeAreaView className="z-10 w-[87%] h-3/4 mx-auto">
                <View className=" bg-white rounded-t-[30px] py-10 px-6 z-10 h-full">
                    <View className="h-full flex flex-col justify-between relative">
                        <View className="flex flex-col gap-6">
                            <View className="flex flex-row items-center gap-3 mb-[6px]">
                                <TouchableOpacity className="h-full">
                                    <ArrowLeftIcon />
                                </TouchableOpacity>
                                <Text className="font-bold text-red text-base">
                                    Verify Your Login
                                </Text>
                            </View>
                            <View className="flex flex-col items-center">
                                <View className="mb-4">
                                    <ProfilePictureIcon />
                                </View>
                                <Text className="font-bold text-base leading-[1.3] text-[#090D20]">
                                    Mahim
                                </Text>
                                <Text className="font-default-400 text-[#9EA1AE] text-xs leading-[1.6]">
                                    mahim@gmail.com
                                </Text>
                            </View>
                            <View className="p-4 bg-[rgba(152,36,60,0.29)] rounded-[24px] flex flex-row items-center gap-3">
                                <InfoIcon />
                                <Text className="text-red text-xs font-default-400 leading-[1.6] flex-1">
                                    We have send you 6 digits verification code
                                    to your email. Please kindly check
                                </Text>
                            </View>
                            <View className="flex flex-col gap-4 mt-8">
                                <ControlledInputOTP
                                    name="otpCode"
                                    control={control}
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
                                    Verify
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

export default LoginOTPForm
