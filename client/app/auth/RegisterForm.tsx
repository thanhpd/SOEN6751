import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '@/components/primitives/input'
import { ControlledCheckbox } from '@/components/primitives/checkbox'
import { Button } from '@/components/primitives/button'

const RegisterSchema = zod
    .object({
        email: zod.string().email(),
        password: zod.string().min(2),
        confirmPassword: zod.string().min(2),
        acceptedTerms: zod.boolean(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
    .refine(data => data.acceptedTerms, {
        message: 'You must accept the terms and conditions',
        path: ['acceptedTerms'],
    })

type TRegisterSchema = zod.infer<typeof RegisterSchema>

const RegisterForm = () => {
    const { handleSubmit, control } = useForm<TRegisterSchema>({
        mode: 'onChange',
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            acceptedTerms: false,
        },
    })

    const onSubmit = (data: TRegisterSchema) => {
        console.log(data)
    }

    return (
        <View className="flex flex-col relative justify-between h-full">
            <View>
                <Text className="font-bold text-red text-base leading-[1.3] mb-[6px]">
                    Create Your Account
                </Text>
                <Text className="text-xs leading-[1.6] text-[#9EA1AE] font-default-400">
                    Make sure your account keep secure
                </Text>
                <View className="flex flex-col mt-8 gap-4">
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
                    <ControlledInput
                        control={control}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        autoCorrect={false}
                        secureTextEntry
                    />
                    <ControlledCheckbox name="acceptedTerms" control={control}>
                        <Text className="text-[#262D33] text-xs leading-[1.6]">
                            I agree with the{' '}
                            <Text
                                className="text-red text-xs font-default-400 leading-[1.6]"
                                onPress={() => {
                                    console.log('Terms and Conditions')
                                }}
                            >
                                terms and conditions
                            </Text>{' '}
                            by creating {'\n'}an account
                        </Text>
                    </ControlledCheckbox>
                </View>
            </View>

            <View>
                <Button
                    className="bg-red rounded-[28px] w-full"
                    onPress={() => {
                        handleSubmit(onSubmit)()
                    }}
                >
                    <Text className="text-white font-bold">Create Account</Text>
                </Button>
            </View>
        </View>
    )
}

export default RegisterForm
