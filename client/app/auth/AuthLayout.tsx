import LoginForm from '@/app/auth/LoginForm'
import LoginOTPForm from '@/app/auth/LoginOTPForm'
import RegisterForm from '@/app/auth/RegisterForm'
import ResetPasswordForm from '@/app/auth/ResetPasswordForm'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/primitives/tabs'
import { cn } from '@/lib'
import { PortalHost } from '@rn-primitives/portal'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const tabs = [
    {
        title: 'Login',
        value: 'login',
    },
    {
        title: 'Register',
        value: 'register',
    },
]

const AuthLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as 'login' | 'register')
    }

    return (
        <View className="flex flex-1 flex-col relative bg-red">
            <SafeAreaView className="flex flex-col flex-1 justify-center items-center">
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-[87%] flex flex-col gap-[26px] h-full"
                >
                    <View className="w-full bg-white rounded-[24px] py-7 px-11 flex-shrink-0">
                        <Text className="text-center leading-[1.6] text-sm font-bold">
                            Hello There
                        </Text>
                        <Text className="text-center leading-[1.3] text-2xl text-red mt-1 font-medium">
                            Welcome to LeGym
                        </Text>
                        <TabsList className="flex-row w-full mt-[14px] bg-[#D9D9D9] rounded-[28px] native:h-[54px]">
                            {tabs.map(tab => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        'flex-1 native:h-[48px] bg-[#D9D9D9] rounded-[28px]',
                                        activeTab === tab.value && 'bg-red'
                                    )}
                                >
                                    <Text
                                        className={clsx(
                                            'leading-[1.3] text-[14px] font-bold',
                                            activeTab === tab.value
                                                ? 'text-[#D9D9D9]'
                                                : 'text-[#6E7781]'
                                        )}
                                    >
                                        {tab.title}
                                    </Text>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </View>
                    <View className="flex-1 bg-white rounded-t-[30px]">
                        <TabsContent
                            value="login"
                            className="flex-1 relative z-10"
                        >
                            <View className="bg-white rounded-t-[30px] py-10 px-6">
                                <LoginForm />
                                {/* <ResetPasswordForm /> */}
                                {/* <LoginOTPForm /> */}
                            </View>
                        </TabsContent>
                        <TabsContent value="register" className="flex-1">
                            <View className="bg-white rounded-t-[30px] py-10 px-6">
                                <RegisterForm />
                            </View>
                        </TabsContent>
                    </View>
                </Tabs>
            </SafeAreaView>
            <PortalHost />
        </View>
    )
}

export default AuthLayout
