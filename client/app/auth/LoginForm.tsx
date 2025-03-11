import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '@/components/primitives/input'
import { ControlledCheckbox } from '@/components/primitives/checkbox'
import { Button } from '@/components/primitives/button'

const LoginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(2),
    stayLoggedIn: zod.boolean().optional(),
})

type TLoginSchema = zod.infer<typeof LoginSchema>

const LoginForm = () => {
    const { handleSubmit, control } = useForm<TLoginSchema>({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            stayLoggedIn: false,
        },
    })

    const onSubmit = (data: TLoginSchema) => {
        console.log(data)
    }

    return (
        <View className="flex flex-col relative h-full justify-between">
            <View>
                <Text className="font-bold text-red text-base leading-[1.3] mb-[6px]">
                    Login to Your Account
                </Text>
                <Text className="text-xs leading-[1.6] text-[#9EA1AE] font-default-400">
                    Make sure that you already have an account
                </Text>
                <View className="flex flex-col gap-4 mt-8">
                    <ControlledInput
                        control={control}
                        name="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                    <ControlledInput
                        control={control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        autoCorrect={false}
                        secureTextEntry
                    />
                </View>
                <View className="flex flex-row justify-between items-center mt-[14px]">
                    <View className="flex-row gap-3 items-center">
                        <ControlledCheckbox
                            name="stayLoggedIn"
                            control={control}
                        >
                            <Text className="text-[#090D20] text-xs leading-[1.6]">
                                Stay logged in
                            </Text>
                        </ControlledCheckbox>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text className="text-red text-xs font-medium leading-[1.3]">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <Button
                    className="bg-red rounded-[28px] w-full"
                    onPress={() => {
                        handleSubmit(onSubmit)()
                    }}
                >
                    <Text className="text-white font-bold">Log In</Text>
                </Button>
            </View>
        </View>
    )
}

export default LoginForm
