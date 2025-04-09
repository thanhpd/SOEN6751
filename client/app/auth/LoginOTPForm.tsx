import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/primitives/button'
import { Portal } from '@rn-primitives/portal'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { ControlledInputOTP } from '@/components/ui/InputOTP'
import ProfilePictureIcon from '@/components/icons/ProfilePictureIcon'
import InfoIcon from '@/components/icons/InfoIcon'
import { useAppDispatch } from '@/store'
import * as SecureStore from 'expo-secure-store'
import { Toast } from 'toastify-react-native'
import { setCurrentUserId } from '@/store/currentUserId'
import { Account, Membership } from '@/constants/types'
import { setTmpUser } from '@/store/tmpUser'
import ProfilePicker from '@/components/ui/ProfilePicker'
import { ControlledInput } from '@/components/primitives/input'

const LoginOTPSchema = zod.object({
    otpCode: zod.string().length(6),
})

type TLoginOTPSchema = zod.infer<typeof LoginOTPSchema>

type Props = {
    user: Omit<Account, 'password'> &
        Membership & {
            stayLoggedIn?: boolean
        }
}

const LoginOTPForm = ({ user }: Props) => {
    const dispatch = useAppDispatch()
    console.log({ tmpUser: user })

    const { handleSubmit, control } = useForm<TLoginOTPSchema>({
        mode: 'onChange',
        resolver: zodResolver(LoginOTPSchema),
        defaultValues: {
            otpCode: '',
        },
    })

    const onSubmit = async (data: TLoginOTPSchema) => {
        // TODO: Implement login logic

        console.log(user)

        if (user.stayLoggedIn) {
            console.log('storing userId in SecureStore', user.id)
            await SecureStore.setItemAsync('userId', user.id)
        }
        dispatch(setCurrentUserId(user.id))
        Toast.success('Login successful')
        dispatch(setTmpUser(null))
    }

    useEffect(() => {
        const backAction = () => {
            dispatch(setTmpUser(null))
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )

        return () => backHandler.remove()
    }, [])

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
                            <View className="flex flex-row items-center gap-3 mb-[6px]">
                                <TouchableOpacity
                                    className="h-full"
                                    onPress={() => {
                                        dispatch(setTmpUser(null))
                                    }}
                                >
                                    <ArrowLeftIcon />
                                </TouchableOpacity>
                                <Text className="font-bold text-red text-base">
                                    Verify Your Login
                                </Text>
                            </View>
                            <View className="flex flex-col items-center">
                                <View className="mb-4">
                                    {user.avatar ? (
                                        <ProfilePicker
                                            value={user.avatar}
                                            disabled
                                        />
                                    ) : (
                                        <ProfilePictureIcon />
                                    )}
                                </View>
                                <Text className="font-bold text-base leading-[1.3] text-[#090D20]">
                                    {user.firstName} {user.lastName}
                                </Text>
                                <Text className="font-default-400 text-[#9EA1AE] text-xs leading-[1.6]">
                                    {user.email}
                                </Text>
                            </View>
                            <View className="p-4 bg-[rgba(152,36,60,0.29)] rounded-[24px] flex flex-row items-center gap-3">
                                <InfoIcon />
                                <Text className="text-red text-xs font-default-400 leading-[1.6] flex-1">
                                    We have sent you 6 digits verification code
                                    to your email. Please kindly check
                                </Text>
                            </View>
                            <View className="flex flex-col gap-4">
                                <ControlledInput
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
            </View>
            <View className="absolute top-0 bottom-0 left-0 right-0 bg-black/40" />
        </Portal>
    )
}

export default LoginOTPForm
